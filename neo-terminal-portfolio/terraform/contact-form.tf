# ==============================================================================
# AWS Lambda Contact Form Infrastructure
# ==============================================================================
# This Terraform configuration creates all AWS resources needed for the
# contact form: Lambda function, API Gateway, IAM roles, and CloudWatch logs.
# ==============================================================================

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# ==============================================================================
# Variables
# ==============================================================================

variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "recipient_email" {
  description = "Email address where contact form submissions will be sent"
  type        = string
}

variable "sender_email" {
  description = "Email address that appears as the sender (must be verified in SES)"
  type        = string
}

variable "allowed_origin" {
  description = "Allowed origin for CORS (your portfolio domain)"
  type        = string
}

variable "project_name" {
  description = "Project name used for naming resources"
  type        = string
  default     = "neo-terminal-portfolio"
}

# ==============================================================================
# Provider Configuration
# ==============================================================================

provider "aws" {
  region = var.aws_region
}

# ==============================================================================
# Lambda Function
# ==============================================================================

# Archive the Lambda function code
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda/contact-form"
  output_path = "${path.module}/lambda-function.zip"
}

# Lambda function
resource "aws_lambda_function" "contact_form" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "${var.project_name}-contact-form"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime         = "nodejs18.x"
  timeout         = 30
  memory_size     = 256

  environment {
    variables = {
        RECIPIENT_EMAIL = var.recipient_email
        SENDER_EMAIL    = var.sender_email
        ALLOWED_ORIGIN  = var.allowed_origin
        SES_REGION      = var.aws_region
    }
  }

  tags = {
    Name    = "${var.project_name}-contact-form"
    Project = var.project_name
  }
}

# ==============================================================================
# IAM Role and Policies
# ==============================================================================

# IAM role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-contact-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name    = "${var.project_name}-contact-lambda-role"
    Project = var.project_name
  }
}

# IAM policy for Lambda
resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:*:*"
      }
    ]
  })
}

# ==============================================================================
# CloudWatch Logs
# ==============================================================================

resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.project_name}-contact-form"
  retention_in_days = 14

  tags = {
    Name    = "${var.project_name}-contact-logs"
    Project = var.project_name
  }
}

# ==============================================================================
# API Gateway
# ==============================================================================

# REST API
resource "aws_api_gateway_rest_api" "contact_api" {
  name        = "${var.project_name}-contact-api"
  description = "API for contact form submissions"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name    = "${var.project_name}-contact-api"
    Project = var.project_name
  }
}

# API Gateway Resource (/contact)
resource "aws_api_gateway_resource" "contact" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  parent_id   = aws_api_gateway_rest_api.contact_api.root_resource_id
  path_part   = "contact"
}

# POST Method
resource "aws_api_gateway_method" "contact_post" {
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  resource_id   = aws_api_gateway_resource.contact.id
  http_method   = "POST"
  authorization = "NONE"
}

# OPTIONS Method (for CORS preflight)
resource "aws_api_gateway_method" "contact_options" {
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  resource_id   = aws_api_gateway_resource.contact.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Lambda Integration for POST
resource "aws_api_gateway_integration" "contact_post" {
  rest_api_id             = aws_api_gateway_rest_api.contact_api.id
  resource_id             = aws_api_gateway_resource.contact.id
  http_method             = aws_api_gateway_method.contact_post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.contact_form.invoke_arn
}

# Mock Integration for OPTIONS (CORS preflight)
resource "aws_api_gateway_integration" "contact_options" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_options.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Method Response for POST
resource "aws_api_gateway_method_response" "contact_post_200" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_post.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

# Method Response for OPTIONS
resource "aws_api_gateway_method_response" "contact_options_200" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

# Integration Response for POST
resource "aws_api_gateway_integration_response" "contact_post_200" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_post.http_method
  status_code = aws_api_gateway_method_response.contact_post_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'${var.allowed_origin}'"
  }

  depends_on = [
    aws_api_gateway_integration.contact_post
  ]
}

# Integration Response for OPTIONS
resource "aws_api_gateway_integration_response" "contact_options_200" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_options.http_method
  status_code = aws_api_gateway_method_response.contact_options_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'${var.allowed_origin}'"
  }

  depends_on = [
    aws_api_gateway_integration.contact_options
  ]
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "contact" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.contact.id,
      aws_api_gateway_method.contact_post.id,
      aws_api_gateway_method.contact_options.id,
      aws_api_gateway_integration.contact_post.id,
      aws_api_gateway_integration.contact_options.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_integration.contact_post,
    aws_api_gateway_integration.contact_options,
  ]
}

# API Gateway Stage
resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.contact.id
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  stage_name    = "prod"

  tags = {
    Name    = "${var.project_name}-prod-stage"
    Project = var.project_name
  }
}

# ==============================================================================
# Lambda Permission for API Gateway
# ==============================================================================

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.contact_api.execution_arn}/*/*"
}

# ==============================================================================
# Outputs
# ==============================================================================

output "api_endpoint" {
  description = "The API Gateway endpoint URL"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/contact"
}

output "lambda_function_name" {
  description = "The name of the Lambda function"
  value       = aws_lambda_function.contact_form.function_name
}

output "lambda_function_arn" {
  description = "The ARN of the Lambda function"
  value       = aws_lambda_function.contact_form.arn
}
