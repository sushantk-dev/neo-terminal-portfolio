# 1. AWS Region (where you verified SES email)
aws_region = "us-east-1"  # ← Change if using different region

# 2. YOUR email where you want to receive messages
recipient_email = "sushantdevx@gmail.com"  # ← YOUR EMAIL HERE

# 3. Email that appears as sender (must be verified in SES)
sender_email = "noreply@sushantkumar.dev"  # ← YOUR SENDER EMAIL

# 4. Your EXACT portfolio domain with https://
allowed_origin = "https://www.sushantkumar.dev"  # ← YOUR DOMAIN

# 5. Project name (optional, can leave as is)
project_name = "neo-terminal-portfolio"