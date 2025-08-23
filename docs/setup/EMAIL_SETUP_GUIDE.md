# 📧 Email Configuration Guide

## Contact Form Email Setup

Your contact form is configured to send submissions to `epicusshorts@gmail.com`. Follow these steps to set up email functionality.

## 🔧 Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### Step 2: Generate App Password
1. Go to **Google Account** → **Security**
2. Under **2-Step Verification**, click **App passwords**
3. Select **Mail** and **Other (custom name)**
4. Enter name: "Texas Roadhouse Menu Contact Form"
5. Click **Generate**
6. **Copy the 16-character password** (save it securely)

### Step 3: Add Environment Variables
Add these to your `.env.local` file:

```bash
# Email Configuration for Contact Form
EMAIL_USER=epicusshorts@gmail.com
EMAIL_PASSWORD=erweohvkiehtvmfh
```

## 🚨 Important Security Notes

### Environment Variables
- **Never commit** `.env.local` to git
- **Use App Passwords**, not your regular Gmail password
- **Keep credentials secure** and rotate them periodically

### Production Deployment
For production (Vercel, Netlify, etc.), add environment variables in your hosting platform:

**Vercel:**
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `EMAIL_USER`: `epicusshorts@gmail.com`
   - `EMAIL_PASSWORD`: `erweohvkiehtvmfh`

## 📋 Testing the Contact Form

### Local Testing
```bash
# Start development server
npm run dev

# Navigate to contact page
http://localhost:3002/contact

# Fill out and submit the form
```

### Email Templates
The contact form sends:

1. **To You (`epicusshorts@gmail.com`)**:
   - Professional formatted email with form data
   - Sender's contact information
   - Message content
   - Source tracking

2. **To Sender** (confirmation):
   - Thank you message
   - Copy of their submitted message
   - Expected response time

## 🔍 Troubleshooting

### Common Issues

#### "Email service not configured"
- Check `.env.local` file exists
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Restart development server after adding env vars

#### "Authentication failed"
- Ensure 2FA is enabled on Gmail
- Use App Password, not regular password
- Check for typos in email/password

#### "Invalid email format"
- Contact form validates email format
- Ensure proper email validation on frontend

### Error Logs
Check browser console and server logs for detailed error messages:

```bash
# Server logs will show:
✅ Email sent successfully: <message-id>
❌ Contact form error: <error-details>
```

## 📊 Email Features

### Contact Form Email Includes:
- ✅ **Sender Information**: Name, email, subject
- ✅ **Message Content**: Full message with formatting
- ✅ **Metadata**: Date, source, website URL
- ✅ **Professional Styling**: HTML formatted email
- ✅ **Security**: Input sanitization and validation

### Confirmation Email Includes:
- ✅ **Professional branding**
- ✅ **Message confirmation**
- ✅ **Response time expectations**
- ✅ **Website link**

## 🛡️ Security Features

### Input Validation
- Email format validation
- Required field checking
- Message length validation
- XSS prevention

### Email Security
- Input sanitization
- HTML injection prevention
- Rate limiting ready
- Error handling

## 📈 Next Steps

### Production Checklist
- [ ] Set environment variables in hosting platform
- [ ] Test contact form in production
- [ ] Monitor email delivery
- [ ] Set up email filtering rules (optional)

### Optional Enhancements
- [ ] Add CAPTCHA for spam prevention
- [ ] Implement rate limiting
- [ ] Add file attachment support
- [ ] Set up email analytics

---

Your contact form is now configured to deliver messages directly to `epicusshorts@gmail.com`! 📧
