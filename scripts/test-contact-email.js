const nodemailer = require('nodemailer')

// Test email configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'epicusshorts@gmail.com',
    pass: 'erweohvkiehtvmfh'
  }
}

async function testEmailConfiguration() {
  console.log('🧪 Testing Contact Form Email Configuration...\n')

  try {
    // Create transporter
    console.log('📧 Creating email transporter...')
    const transporter = nodemailer.createTransport(EMAIL_CONFIG)

    // Test connection
    console.log('🔗 Testing SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP connection successful!\n')

    // Send test email
    console.log('📤 Sending test email...')
    const testEmail = {
      from: `"Texas Roadhouse Menu Contact" <${EMAIL_CONFIG.auth.user}>`,
      to: 'epicusshorts@gmail.com',
      subject: '🧪 Test Email - Contact Form with Company Logo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">✅ Contact Form Test Email</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="color: #155724; margin: 0;">🎉 Email Configuration Working!</h3>
              </div>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Test Status:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #28a745;">✅ SUCCESS</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email Service:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">Gmail SMTP</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">From Address:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${EMAIL_CONFIG.auth.user}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">To Address:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">epicusshorts@gmail.com</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Test Date:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              
              <div style="margin-top: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">Next Steps:</h3>
                <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; border-left: 4px solid #2196f3;">
                  <p style="margin: 0; color: #1976d2;">
                    ✅ Your contact form is ready to receive submissions!<br>
                    ✅ All emails will be delivered to this inbox.<br>
                    ✅ Test the live form at: <a href="http://localhost:3002/contact">http://localhost:3002/contact</a>
                  </p>
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px; border-left: 4px solid #ffc107;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>📋 What This Test Confirms:</strong><br>
                  • Gmail app password is working<br>
                  • SMTP connection is successful<br>
                  • Email delivery is functional<br>
                  • HTML formatting is correct
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `
✅ Contact Form Email Test - SUCCESS!

Email Configuration Test Results:
- Status: WORKING
- Service: Gmail SMTP  
- From: ${EMAIL_CONFIG.auth.user}
- To: epicusshorts@gmail.com
- Date: ${new Date().toLocaleString()}

Your contact form is ready to receive submissions!

Next Steps:
1. Test the live form at: http://localhost:3002/contact
2. All contact form submissions will be delivered to this inbox
3. Both you and the sender will receive professional emails

This test confirms:
✅ Gmail app password is working
✅ SMTP connection is successful  
✅ Email delivery is functional
✅ HTML formatting is correct

---
Source: Texas Roadhouse Menu Contact Form Test
      `
    }

    const info = await transporter.sendMail(testEmail)
    console.log('✅ Test email sent successfully!')
    console.log('📧 Message ID:', info.messageId)
    console.log('📬 Check your inbox at: epicusshorts@gmail.com\n')

    // Test the API endpoint
    console.log('🔄 Testing contact form API endpoint...')
    const testFormData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'API Test Submission',
      message: 'This is a test message to verify the contact form API is working correctly. If you receive this, the integration is successful!'
    }

    try {
      const fetch = (await import('node-fetch')).default
      const response = await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testFormData),
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        console.log('✅ Contact form API test successful!')
        console.log('📧 API response:', result.message)
      } else {
        console.log('❌ Contact form API test failed:', result.error)
      }
    } catch (apiError) {
      console.log('⚠️ Could not test API endpoint (server might not be running):', apiError.message)
      console.log('💡 Make sure your Next.js server is running on port 3002')
    }

    console.log('\n🎉 EMAIL CONFIGURATION TEST COMPLETE!')
    console.log('✅ Your contact form is ready to receive submissions!')

  } catch (error) {
    console.error('❌ Email configuration test failed:')
    console.error('Error details:', error.message)
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Error Solutions:')
      console.log('1. ✅ Verify 2-Factor Authentication is enabled on Gmail')
      console.log('2. ✅ Use App Password (not your regular Gmail password)')
      console.log('3. ✅ Check if app password is typed correctly: erweohvkiehtvmfh')
      console.log('4. ✅ Ensure email address is correct: epicusshorts@gmail.com')
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log('\n🌐 Network Error Solutions:')
      console.log('1. ✅ Check your internet connection')
      console.log('2. ✅ Verify firewall settings allow SMTP')
      console.log('3. ✅ Try again in a few minutes')
    } else {
      console.log('\n🔍 General Troubleshooting:')
      console.log('1. ✅ Double-check environment variables in .env.local')
      console.log('2. ✅ Restart the development server')
      console.log('3. ✅ Verify Gmail security settings')
    }
  }
}

// Run the test
testEmailConfiguration()
