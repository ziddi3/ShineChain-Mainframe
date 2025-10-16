# 🔥 Firebase Auto-Deploy Setup Guide

## Overview

This guide will help you set up automatic Firebase Hosting deployment whenever you push to the `main` branch on GitHub.

**Architecture:**
```
GitHub (Source of Truth)
    ↓ (push to main)
GitHub Actions (Auto-trigger)
    ↓ (deploy command)
Firebase Hosting (Live Site)
    ↓ (pull latest)
VS Code (Local Mirror)
```

---

## Prerequisites

- ✅ GitHub repository (ShineChain-Mainframe)
- ✅ Firebase project set up
- ✅ Firebase CLI installed locally
- ✅ GitHub Actions workflow file (already created)

---

## Step 1: Generate Firebase CI Token

You need to generate a Firebase authentication token on your **local machine** (not in the sandbox).

### On Your Local Machine:

1. **Open Terminal/Command Prompt**

2. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

3. **Generate the CI Token**:
   ```bash
   firebase login:ci
   ```

4. **Follow the prompts**:
   - A browser window will open
   - Sign in with your Google account (the one linked to Firebase)
   - Grant permissions
   - The terminal will display a long token

5. **Copy the Token**:
   ```
   ✔ Success! Use this token to login on a CI server:

   1//0gABCDEFGHIJKLMNOPQRSTUVWXYZ...
   
   Example: firebase deploy --token "$FIREBASE_TOKEN"
   ```
   
   **⚠️ IMPORTANT**: Copy this entire token - you'll need it in the next step!

---

## Step 2: Add Token to GitHub Secrets

1. **Go to your GitHub repository**:
   ```
   https://github.com/ziddi3/ShineChain-Mainframe
   ```

2. **Navigate to Settings**:
   - Click on "Settings" tab (top right)

3. **Go to Secrets and Variables**:
   - In the left sidebar, click "Secrets and variables"
   - Click "Actions"

4. **Create New Secret**:
   - Click "New repository secret" button
   - **Name**: `FIREBASE_TOKEN`
   - **Secret**: Paste the token you copied from Step 1
   - Click "Add secret"

---

## Step 3: Initialize Firebase in Repository (If Not Done)

If you haven't already set up Firebase in your repository:

1. **Navigate to your project directory**:
   ```bash
   cd ShineChain-Mainframe
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Configuration**:
   - Select your Firebase project
   - **Public directory**: `.` (current directory)
   - **Configure as single-page app**: `No`
   - **Set up automatic builds**: `No`
   - **Overwrite index.html**: `No`

4. **Verify firebase.json exists**:
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ]
     }
   }
   ```

---

## Step 4: Test the Workflow

### Option A: Push a Change

1. **Make a small change** (e.g., update README):
   ```bash
   echo "Testing auto-deploy" >> README.md
   git add README.md
   git commit -m "Test Firebase auto-deploy"
   git push origin main
   ```

2. **Watch the Action**:
   - Go to your GitHub repository
   - Click "Actions" tab
   - You should see "Deploy to Firebase Hosting" running
   - Click on it to see live logs

### Option B: Manual Trigger

1. **Go to Actions tab** on GitHub
2. **Click "Deploy to Firebase Hosting"** workflow
3. **Click "Run workflow"** button
4. **Select branch**: main
5. **Click "Run workflow"**

---

## Step 5: Verify Deployment

After the GitHub Action completes:

1. **Check GitHub Actions**:
   - Should show green checkmark ✅
   - Logs should show "Successfully deployed to Firebase Hosting!"

2. **Visit your Firebase Console**:
   ```
   https://console.firebase.google.com/
   ```
   - Go to Hosting section
   - Should show recent deployment

3. **Visit your live site**:
   - Your Firebase Hosting URL
   - Should reflect the latest changes

---

## Workflow Details

### What Happens Automatically:

1. **Trigger**: You push code to `main` branch
2. **GitHub Actions**: Detects the push
3. **Checkout**: Downloads your repository code
4. **Setup**: Installs Node.js and Firebase CLI
5. **Deploy**: Runs `firebase deploy --only hosting`
6. **Complete**: Your site is live!

### Workflow File Location:
```
.github/workflows/firebase-deploy.yml
```

### Key Features:
- ✅ Automatic deployment on push to main
- ✅ Manual trigger option via GitHub UI
- ✅ Success/failure notifications
- ✅ Secure token storage in GitHub Secrets
- ✅ No local Firebase login needed

---

## Troubleshooting

### Issue: "FIREBASE_TOKEN secret not found"

**Solution**: Make sure you added the secret correctly in Step 2.

### Issue: "Permission denied"

**Solution**: 
1. Regenerate the token: `firebase login:ci`
2. Update the GitHub secret with the new token

### Issue: "Project not found"

**Solution**: 
1. Check your `firebase.json` has correct project ID
2. Or add `.firebaserc` file:
   ```json
   {
     "projects": {
       "default": "your-project-id"
     }
   }
   ```

### Issue: "Deployment failed"

**Solution**:
1. Check GitHub Actions logs for specific error
2. Verify firebase.json configuration
3. Ensure all files are committed to repository

---

## VS Code Integration

### Keeping VS Code in Sync:

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **VS Code will automatically detect changes**

3. **Your local environment mirrors GitHub**

### Recommended VS Code Extensions:

- **GitHub Pull Requests and Issues**: Manage PRs directly
- **GitLens**: Enhanced Git integration
- **Firebase**: Firebase tools integration

---

## Best Practices

### 1. Branch Protection
Consider protecting your `main` branch:
- Settings → Branches → Add rule
- Require pull request reviews
- Require status checks to pass

### 2. Testing Before Deploy
Create a staging branch:
```bash
git checkout -b staging
# Make changes
git push origin staging
# Test, then merge to main
```

### 3. Deployment Notifications
Add Slack/Discord notifications to workflow:
```yaml
- name: Notify Deployment
  if: success()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"🚀 Deployed to Firebase!"}' \
    YOUR_WEBHOOK_URL
```

### 4. Environment Variables
For different environments:
```yaml
env:
  FIREBASE_PROJECT: ${{ secrets.FIREBASE_PROJECT_ID }}
  NODE_ENV: production
```

---

## Workflow Customization

### Deploy Only Specific Files:
```yaml
- name: Deploy specific directory
  run: firebase deploy --only hosting:public
```

### Add Build Step:
```yaml
- name: Build project
  run: npm run build

- name: Deploy
  run: firebase deploy --only hosting
```

### Deploy to Multiple Sites:
```yaml
- name: Deploy to staging
  if: github.ref == 'refs/heads/staging'
  run: firebase deploy --only hosting:staging

- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: firebase deploy --only hosting:production
```

---

## Security Notes

### Token Security:
- ✅ Never commit tokens to repository
- ✅ Use GitHub Secrets for storage
- ✅ Rotate tokens periodically
- ✅ Limit token permissions if possible

### Access Control:
- Only repository collaborators can trigger workflows
- Secrets are encrypted and not visible in logs
- Token is only used during deployment

---

## Summary

Once set up, your workflow is:

```
1. Edit code in VS Code
2. Commit and push to GitHub
3. GitHub Actions automatically deploys to Firebase
4. Your site is live!
5. Pull changes in VS Code to stay synced
```

**No manual Firebase commands needed!** 🎉

---

## Quick Reference

### Generate Token:
```bash
firebase login:ci
```

### Manual Deploy (if needed):
```bash
firebase deploy --only hosting --token "YOUR_TOKEN"
```

### Check Workflow Status:
```
https://github.com/ziddi3/ShineChain-Mainframe/actions
```

### View Live Site:
```
Your Firebase Hosting URL
```

---

## Need Help?

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Firebase CLI Docs**: https://firebase.google.com/docs/cli
- **Firebase Hosting Docs**: https://firebase.google.com/docs/hosting

---

**Setup Complete!** 🚀

Your GitHub-to-Firebase auto-deploy pipeline is ready. Just add the `FIREBASE_TOKEN` secret and you're good to go!

---

*Created by SuperNinja AI Agent*  
*ShineChain Mainframe Auto-Deploy Setup*  
*October 16, 2025*