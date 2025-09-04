# Texas Roadhouse Menu - Environment Setup Script
# Run this script to create your .env.local file with the correct WordPress API URL

Write-Host "🚀 Texas Roadhouse Menu - Environment Setup" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "⚠️  .env.local file already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "❌ Setup cancelled." -ForegroundColor Red
        exit
    }
}

Write-Host "📝 Setting up environment variables..." -ForegroundColor Blue
Write-Host ""

# Ask for WordPress API URL
Write-Host "🔗 WordPress Configuration:" -ForegroundColor Cyan
Write-Host "What is your WordPress GraphQL API URL?"
Write-Host "Examples:" -ForegroundColor Gray
Write-Host "  - https://admin.texasroadhouse-menus.us/graphql" -ForegroundColor Gray
Write-Host "  - https://texasroadhousemenu.me/graphql" -ForegroundColor Gray
Write-Host "  - https://your-wordpress-site.com/graphql" -ForegroundColor Gray
$wpApiUrl = Read-Host "WordPress API URL"

if ([string]::IsNullOrWhiteSpace($wpApiUrl)) {
    Write-Host "❌ WordPress API URL is required!" -ForegroundColor Red
    exit
}

# Validate URL format
try {
    $uri = [System.Uri]$wpApiUrl
    if ($uri.Scheme -ne "https") {
        Write-Host "⚠️  Warning: Using HTTP instead of HTTPS may cause security issues." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Invalid URL format!" -ForegroundColor Red
    exit
}

# Create .env.local content
$envContent = @"
# ==============================================
# TEXAS ROADHOUSE MENU - ENVIRONMENT VARIABLES
# ==============================================
# Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# ==============================================
# CORE SITE CONFIGURATION
# ==============================================
# Your website URL
NEXT_PUBLIC_SITE_URL=https://texasroadhouse-menus.us

# WordPress GraphQL API endpoint
NEXT_PUBLIC_WORDPRESS_API_URL=$wpApiUrl

# Site name for SEO and metadata
NEXT_PUBLIC_SITE_NAME=Texas Roadhouse Menu

# ==============================================
# EMAIL CONFIGURATION (for contact form)
# ==============================================
# Gmail account for sending contact form emails
# Note: Use Gmail App Password, not your regular password
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# ==============================================
# GEMINI AI CONFIGURATION (for dynamic coupons)
# ==============================================
# Get your API key from: https://aistudio.google.com/
GEMINI_API_KEY=your-gemini-api-key-here

# ==============================================
# GOOGLE INDEXING API (for SEO automation)
# ==============================================
# Service account email from Google Cloud Console
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Private key from the service account JSON file
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT_HERE\n-----END PRIVATE KEY-----\n"

# ==============================================
# SITE URL (for server-side operations)
# ==============================================
SITE_URL=https://texasroadhouse-menus.us
"@

# Write the file
try {
    $envContent | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✅ .env.local file created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Configuration Summary:" -ForegroundColor Blue
    Write-Host "  WordPress API: $wpApiUrl" -ForegroundColor Gray
    Write-Host "  Frontend URL:  https://texasroadhouse-menus.us" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔧 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Update the EMAIL_USER and EMAIL_PASSWORD if you want the contact form to work"
    Write-Host "2. Add your GEMINI_API_KEY if you want dynamic coupons"
    Write-Host "3. Add Google API credentials if you want SEO automation"
    Write-Host "4. Run 'npm run dev' to start the development server"
    Write-Host ""
    Write-Host "🧪 Test your WordPress connection:" -ForegroundColor Cyan
    Write-Host "   node scripts/test-wp-connection.js"
} catch {
    Write-Host "❌ Error creating .env.local file: $_" -ForegroundColor Red
}
"@
