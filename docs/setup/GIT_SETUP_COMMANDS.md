# Git & GitHub Setup Commands

## Prerequisites
1. **Install Git**: Download from https://git-scm.com/downloads
2. **Verify Installation**: Open Command Prompt/PowerShell and run:
   ```bash
   git --version
   ```

## Step-by-Step Git Setup

### 1. Initialize Git Repository
```bash
cd "C:\Users\Burhan\Desktop\New folder (2)"
git init
```

### 2. Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Add All Files
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "Initial commit: Texas Roadhouse Menu website with SEO, WordPress GraphQL, Google APIs, and Gemini coupons"
```

### 5. Connect to GitHub Repository
```bash
git remote add origin https://github.com/roxi12/Texasroadhouse.git
```

### 6. Set Main Branch and Push
```bash
git branch -M main
git push -u origin main
```

## Alternative: If Repository Already Exists
If the GitHub repository already has content:

```bash
# Download existing content first
git pull origin main --allow-unrelated-histories

# Then push your changes
git push origin main
```

## Verify Success
After pushing, visit: https://github.com/roxi12/Texasroadhouse
You should see all your project files uploaded.

## Future Updates
After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

This will automatically trigger a new deployment on Vercel (once connected).

---

⚠️ **Important Notes:**
- Make sure `.env.local` is NOT uploaded (it's in .gitignore)
- Your environment variables will be set separately in Vercel Dashboard
- Each git push will trigger a new deployment automatically
