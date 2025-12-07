const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');  // ✅ Built into Node.js 18

// CORS headers
function getCorsHeaders(requestOrigin) {
  const allowedOrigins = [
    'https://sushantkumar.dev',
    'https://www.sushantkumar.dev',
    'http://localhost:3000'  // For local testing
  ];
  
  // Check if request origin is in allowed list
  const origin = allowedOrigins.includes(requestOrigin) 
    ? requestOrigin 
    : allowedOrigins[0];
  
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

// Lambda handler - MUST be exported as async function
exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin;

  console.log('Event:', JSON.stringify(event, null, 2));
  
  // Environment variables
  const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;
  const SENDER_EMAIL = process.env.SENDER_EMAIL;
  const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
  const region = process.env.SES_REGION || process.env.AWS_REGION || 'us-east-1';
  
  // CORS headers
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'CORS OK' }),
    };
  }
  
  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
  
  try {
    // Parse body
    const body = JSON.parse(event.body || '{}');
    const { name, email, subject, message } = body;
    
    // Validate
    const errors = [];
    if (!name || name.length < 2 || name.length > 100) {
      errors.push('Name must be 2-100 characters');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Valid email required');
    }
    if (!subject || subject.length < 3 || subject.length > 200) {
      errors.push('Subject must be 3-200 characters');
    }
    if (!message || message.length < 10 || message.length > 5000) {
      errors.push('Message must be 10-5000 characters');
    }
    
    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Validation failed', details: errors }),
      };
    }
    
    // Sanitize
    const sanitize = (str) => str.replace(/[<>]/g, (c) => c === '<' ? '&lt;' : '&gt;');
    const safeName = sanitize(name.trim());
    const safeSubject = sanitize(subject.trim());
    const safeMessage = sanitize(message.trim());
    
    // SES client
    const sesClient = new SESClient({ region });
    
    // Email params
    const emailParams = {
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `[Portfolio Contact] ${safeSubject}`,
        },
        Body: {
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<head>
<style>
body{font-family:'Courier New',monospace;background:#1a1d23;color:#e4e6eb;padding:20px}
.container{max-width:600px;margin:0 auto;background:#262a33;border:1px solid #2d3139;border-radius:8px;padding:30px}
.header{color:#00d9ff;font-size:24px;margin-bottom:20px;border-bottom:2px solid #00d9ff;padding-bottom:10px}
.field{margin-bottom:15px}
.label{color:#00ff85;font-weight:bold;margin-bottom:5px}
.value{color:#e4e6eb;padding:10px;background:#1a1d23;border-left:3px solid #00d9ff;margin-top:5px}
.footer{margin-top:30px;padding-top:20px;border-top:1px solid #2d3139;color:#9ca3af;font-size:12px}
</style>
</head>
<body>
<div class="container">
<div class="header">📬 New Contact Form Submission</div>
<div class="field"><div class="label">› From:</div><div class="value">${safeName}</div></div>
<div class="field"><div class="label">› Email:</div><div class="value">${email}</div></div>
<div class="field"><div class="label">› Subject:</div><div class="value">${safeSubject}</div></div>
<div class="field"><div class="label">› Message:</div><div class="value">${safeMessage.replace(/\n/g, '<br>')}</div></div>
<div class="footer">Sent from Neo-Terminal Portfolio</div>
</div>
</body>
</html>
            `,
          },
          Text: {
            Data: `
NEW CONTACT FORM SUBMISSION

From: ${safeName}
Email: ${email}
Subject: ${safeSubject}

Message:
${safeMessage}

---
Sent from Neo-Terminal Portfolio
            `,
          },
        },
      },
    };
    
    // Send email
    console.log('Sending email...');
    const command = new SendEmailCommand(emailParams);
    const result = await sesClient.send(command);
    console.log('Email sent:', result.MessageId);
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Message sent successfully! I'll get back to you soon.",
        messageId: result.MessageId,
      }),
    };
    
  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to send message',
        details: error.message,
      }),
    };
  }
};