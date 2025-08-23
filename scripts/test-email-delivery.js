const nodemailer = require('nodemailer')

// Test email configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'epicusshorts@gmail.com',
    pass: 'erweohvkiehtvmfh'
  }
}

async function testEmailDelivery() {
  console.log('🧪 Testing Email Delivery to Multiple Addresses...\n')

  try {
    // Create transporter
    console.log('📧 Creating email transporter...')
    const transporter = nodemailer.createTransport(EMAIL_CONFIG)

    // Test connection
    console.log('🔗 Testing SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP connection successful!\n')

    // Test emails to different addresses
    const testEmails = [
      'epicusshorts@gmail.com',
      'cdwburhan@gmail.com', // Your mentioned test email
      // Add your test email here if different
    ]

    console.log('📤 Sending test emails to multiple addresses...\n')

    for (const email of testEmails) {
      console.log(`📧 Sending to: ${email}`)
      
      try {
        const testEmail = {
          from: `"Texas Roadhouse Menu Test" <${EMAIL_CONFIG.auth.user}>`,
          to: email,
          subject: '🧪 Email Delivery Test - Simple Version',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #d2691e;">✅ Email Delivery Test</h2>
              <p>This is a simple test email to verify delivery to: <strong>${email}</strong></p>
              <p>Time sent: ${new Date().toLocaleString()}</p>
              <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3>Delivery Check:</h3>
                <p>✅ If you receive this email, delivery is working!</p>
                <p>📧 Check your spam/junk folder if not in inbox</p>
                <p>📱 Check on mobile device as well</p>
              </div>
              <p style="color: #666; font-size: 12px;">
                Sent from: Texas Roadhouse Menu Contact System<br>
                Test ID: ${Math.random().toString(36).substring(7)}
              </p>
            </div>
          `,
          text: `
Email Delivery Test - ${email}

This is a simple test email to verify delivery.
Time sent: ${new Date().toLocaleString()}

✅ If you receive this email, delivery is working!
📧 Check your spam/junk folder if not in inbox  
📱 Check on mobile device as well

Test ID: ${Math.random().toString(36).substring(7)}
          `
        }

        const info = await transporter.sendMail(testEmail)
        console.log(`✅ Email sent to ${email} - Message ID: ${info.messageId}`)
        
        // Wait a bit between emails
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (emailError) {
        console.error(`❌ Failed to send to ${email}:`, emailError.message)
      }
    }

    console.log('\n🎉 EMAIL DELIVERY TEST COMPLETE!')
    console.log('\n📋 What to check:')
    console.log('1. ✅ Check inbox for test emails')
    console.log('2. 📧 Check spam/junk folders')
    console.log('3. 📱 Check on mobile Gmail app')
    console.log('4. ⏰ Wait 2-3 minutes for delivery')
    console.log('5. 🔍 Search for "Texas Roadhouse" in Gmail')

  } catch (error) {
    console.error('❌ Email delivery test failed:', error.message)
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Issue:')
      console.log('- Check Gmail app password is correct')
      console.log('- Verify 2FA is enabled')
      console.log('- Try regenerating app password')
    }
  }
}

// Run the test
testEmailDelivery()
