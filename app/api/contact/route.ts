import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Email configuration
const EMAIL_CONFIG = {
  // Gmail SMTP configuration
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
}

// Create transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: EMAIL_CONFIG.service,
    auth: EMAIL_CONFIG.auth
  })
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { name, email, subject, message }: ContactFormData = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message must be at least 10 characters long' 
        },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email configuration missing')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured' 
        },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = createTransporter()

    // Verify transporter configuration
    await transporter.verify()

    // Email to you (the site owner)
    const mailOptions = {
      from: `"Texas Roadhouse Menu Contact" <${process.env.EMAIL_USER}>`,
      to: 'epicusshorts@gmail.com',
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Date:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              
              <div style="margin-top: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #dc2626;">
                  ${sanitizedData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>Source:</strong> Texas Roadhouse Menu Contact Form<br>
                  <strong>Website:</strong> <a href="https://texasroadhouse-menus.us">https://texasroadhouse-menus.us</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}
Date: ${new Date().toLocaleString()}

Message:
${sanitizedData.message}

---
Source: Texas Roadhouse Menu Contact Form
Website: https://texasroadhouse-menus.us
      `
    }

    // Send email
    console.log('📧 Sending contact form email...')
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', info.messageId)

    // Optional: Send confirmation email to the sender
    const confirmationEmail = {
      from: `"Texas Roadhouse Menu" <${process.env.EMAIL_USER}>`,
      to: sanitizedData.email,
      subject: '🤠 Thank you for contacting Texas Roadhouse Menu!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - Texas Roadhouse Menu</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f0; font-family: 'Georgia', serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff;">
            
            <!-- Header with Roadhouse Theme -->
            <div style="background: linear-gradient(135deg, #8b4513 0%, #cd853f 50%, #d2691e 100%); padding: 0; border-radius: 12px 12px 0 0; position: relative; overflow: hidden;">
              <!-- Decorative Pattern -->
              <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
              <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.2;"></div>
              
              <div style="position: relative; padding: 20px 20px 15px 20px; text-align: center;">
                <!-- Company Logo -->
                <div style="margin-bottom: 10px;">
                  <div style="display: inline-block; padding: 8px; background: rgba(255,255,255,0.15); border-radius: 10px; margin: 0 auto;">
                    <img src="https://texasroadhouse-menus.us/Our%20Own%20Logo.png" alt="Texas Roadhouse Menu Logo" style="height: 35px; width: auto; display: block; filter: brightness(0) invert(1);" />
                  </div>
                </div>
                
                <h1 style="color: #fff; margin: 0 0 5px 0; font-size: 22px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
                  Howdy, ${sanitizedData.name}! 🤠
                </h1>
                <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 15px; font-style: italic;">
                  Thanks for reaching out to us, partner!
                </p>
              </div>
            </div>

            <!-- Main Content -->
            <div style="padding: 20px 20px; background: #fff;">
              
              <!-- Welcome Message -->
              <div style="text-align: center; margin-bottom: 15px;">
                <h2 style="color: #8b4513; margin: 0 0 8px 0; font-size: 18px; font-weight: bold;">
                  We've Got Your Message! 📧
                </h2>
                <p style="color: #666; font-size: 14px; line-height: 1.4; margin: 0;">
                  Your message about "<strong style="color: #d2691e;">${sanitizedData.subject}</strong>" has been received and we'll rustle up a response real soon!
                </p>
              </div>

              <!-- Message Preview Card -->
              <div style="background: linear-gradient(145deg, #faf8f3, #f0ede4); border: 2px solid #e6d7c3; border-radius: 8px; padding: 15px; margin: 15px 0; position: relative;">
                <div style="position: absolute; top: -6px; left: 14px; background: #d2691e; color: white; padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  Your Message
                </div>
                <div style="margin-top: 6px;">
                  <p style="color: #5d4037; font-size: 13px; line-height: 1.5; margin: 0; font-style: italic; border-left: 3px solid #d2691e; padding-left: 10px;">
                    "${sanitizedData.message.substring(0, 180)}${sanitizedData.message.length > 180 ? '...' : ''}"
                  </p>
                </div>
              </div>

              <!-- Response Time Info -->
              <div style="background: #e8f5e8; border-left: 3px solid #4caf50; padding: 12px; border-radius: 0 5px 5px 0; margin: 12px 0;">
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 18px; margin-right: 8px;">⏰</span>
                  <div>
                    <h3 style="color: #2e7d32; margin: 0 0 2px 0; font-size: 14px; font-weight: bold;">Quick Response Promise</h3>
                    <p style="color: #388e3c; margin: 0; font-size: 12px;">We typically respond within 24-48 hours. Our team is on it!</p>
                  </div>
                </div>
              </div>

              <!-- What to Expect -->
              <div style="margin: 15px 0;">
                <h3 style="color: #8b4513; margin: 0 0 10px 0; font-size: 15px; font-weight: bold; text-align: center;">
                  🎯 What Happens Next?
                </h3>
                <div style="display: grid; gap: 8px;">
                  <div style="display: flex; align-items: center; padding: 10px; background: #fff8f0; border-radius: 5px; border-left: 3px solid #ff9800;">
                    <span style="font-size: 14px; margin-right: 8px; min-width: 20px;">✅</span>
                    <p style="margin: 0; color: #5d4037; font-size: 12px; line-height: 1.3;">Our team reviews your message personally</p>
                  </div>
                  <div style="display: flex; align-items: center; padding: 10px; background: #f3e5f5; border-radius: 5px; border-left: 3px solid #9c27b0;">
                    <span style="font-size: 14px; margin-right: 8px; min-width: 20px;">📝</span>
                    <p style="margin: 0; color: #5d4037; font-size: 12px; line-height: 1.3;">We prepare a detailed response to your inquiry</p>
                  </div>
                  <div style="display: flex; align-items: center; padding: 10px; background: #e3f2fd; border-radius: 5px; border-left: 3px solid #2196f3;">
                    <span style="font-size: 14px; margin-right: 8px; min-width: 20px;">📧</span>
                    <p style="margin: 0; color: #5d4037; font-size: 12px; line-height: 1.3;">You'll receive our response directly in your inbox</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="text-align: center; margin: 15px 0;">
                <div style="margin-bottom: 8px;">
                  <a href="https://texasroadhouse-menus.us" style="display: inline-block; background: linear-gradient(135deg, #d2691e, #cd853f); color: white; padding: 10px 20px; text-decoration: none; border-radius: 18px; font-weight: bold; font-size: 13px; box-shadow: 0 2px 8px rgba(210, 105, 30, 0.3); text-transform: uppercase; letter-spacing: 0.5px;">
                    🏠 Visit Our Menu
                  </a>
                </div>
                <div>
                  <a href="https://texasroadhouse-menus.us/posts" style="display: inline-block; background: transparent; color: #8b4513; padding: 8px 16px; text-decoration: none; border: 2px solid #8b4513; border-radius: 18px; font-weight: bold; font-size: 12px;">
                    📰 Latest Updates
                  </a>
                </div>
              </div>

              <!-- Important Notice -->
              <div style="background: #fff3e0; border: 1px solid #ffcc02; border-radius: 6px; padding: 12px; margin: 15px 0;">
                <div style="display: flex; align-items: flex-start;">
                  <span style="font-size: 16px; margin-right: 8px; margin-top: 1px;">⚠️</span>
                  <div>
                    <h3 style="color: #e65100; margin: 0 0 4px 0; font-size: 13px; font-weight: bold;">Important Notice</h3>
                    <p style="color: #bf360c; margin: 0; font-size: 11px; line-height: 1.4;">
                      We are not affiliated with the official Texas Roadhouse restaurant chain. For restaurant reservations, locations, or official inquiries, please visit 
                      <a href="https://www.texasroadhouse.com" style="color: #d84315; text-decoration: underline;">texasroadhouse.com</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="background: #5d4037; padding: 15px; text-align: center; border-radius: 0 0 12px 12px;">
              <div style="margin-bottom: 10px;">
                <h3 style="color: #fff; margin: 0 0 4px 0; font-size: 15px; font-weight: bold;">Texas Roadhouse Menu</h3>
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 12px;">Your trusted source for menu information and prices</p>
              </div>
              
              <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; margin-top: 10px;">
                <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 10px; line-height: 1.3;">
                  📧 This is an automated confirmation email. Please do not reply to this message.<br>
                  💌 Sent from Texas Roadhouse Menu Contact System<br>
                  🕒 ${new Date().toLocaleString()}
                </p>
              </div>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
🤠 Howdy, ${sanitizedData.name}!

Thank you for reaching out to Texas Roadhouse Menu! We've received your message and we're excited to help you out, partner!

📧 YOUR MESSAGE DETAILS:
Subject: ${sanitizedData.subject}
Message: "${sanitizedData.message}"
Received: ${new Date().toLocaleString()}

⏰ WHAT HAPPENS NEXT:
✅ Our team reviews your message personally
📝 We prepare a detailed response to your inquiry  
📧 You'll receive our response directly in your inbox

🕒 RESPONSE TIME: We typically respond within 24-48 hours. Our team is on it!

🏠 VISIT OUR WEBSITE: https://texasroadhouse-menus.us
📰 LATEST UPDATES: https://texasroadhouse-menus.us/posts

⚠️ IMPORTANT NOTICE:
We are not affiliated with the official Texas Roadhouse restaurant chain. 
For restaurant reservations, locations, or official inquiries, please visit: https://www.texasroadhouse.com

---
Thanks for choosing Texas Roadhouse Menu as your trusted source for menu information and prices!

This is an automated confirmation email. Please do not reply to this message.
Sent from Texas Roadhouse Menu Contact System
${new Date().toLocaleString()}
      `
    }

    // Send confirmation email
    try {
      await transporter.sendMail(confirmationEmail)
      console.log('✅ Confirmation email sent to:', sanitizedData.email)
    } catch (confirmError) {
      console.warn('⚠️ Could not send confirmation email:', confirmError)
      // Don't fail the main request if confirmation email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    })

  } catch (error) {
    console.error('❌ Contact form error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
