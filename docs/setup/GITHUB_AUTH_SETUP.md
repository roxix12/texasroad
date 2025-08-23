# 🔐 GitHub Authentication Setup

## Issue: GitHub requires Personal Access Token (not password)

GitHub discontinued password authentication in 2021. You need a Personal Access Token (PAT).

## 🚀 Quick Solutions (Choose One)

### Option 1: Personal Access Token (5 minutes)

1. **Create Token**:
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - **Note**: "Texas Roadhouse Deployment"
   - **Expiration**: 90 days (or No expiration)
   - **Scopes**: Select **"repo"** (gives full repository access)
   - Click **"Generate token"**
   - **⚠️ COPY THE TOKEN** (you won't see it again!)

2. **Use Token as Password**:
   - When Git asks for password, paste the token instead
   - Username: `roxi12` (or your GitHub username)
   - Password: `ghp_xxxxxxxxxxxx` (your token)

### Option 2: GitHub Desktop (Easiest - No tokens needed)

1. **Download**: https://desktop.github.com/
2. **Install and login** with your GitHub account
3. **Add existing repository**:
   - File → Add Local Repository
   - Choose: `C:\Users\Burhan\Desktop\New folder (2)`
4. **Publish to GitHub**:
   - Click "Publish repository"
   - Make sure it's public
   - One-click upload!

### Option 3: SSH Keys (Advanced)

If you prefer SSH authentication, I can help you set up SSH keys.

---

## 🔄 After Authentication Setup

Once you have authentication working, I'll push your code with:
```bash
git push -u origin main
```

Your 99 files (complete Texas Roadhouse website) are ready to upload!

---

**Recommendation: Use GitHub Desktop for the easiest experience, or create a Personal Access Token if you prefer command line.**
