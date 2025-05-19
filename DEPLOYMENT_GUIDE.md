# GitHub Pages Deployment Guide

This guide will help you deploy your Code Circuit Challenge application to GitHub Pages using GitHub Actions.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your project code ready to deploy

## Step 1: Prepare Your Repository

### Option 1: Using the Automated Script

Run the included PowerShell script to initialize your repository and push to GitHub:

```powershell
./setup-github.ps1
```

Follow the prompts to complete the setup.

### Option 2: Manual Setup

1. Create a new repository on GitHub named `CodeCircuitChallenge` (or your preferred name)
2. Initialize git in your project folder:

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/CodeCircuitChallenge.git
git push -u origin main
```

## Step 2: Configure GitHub Pages

1. Go to your repository on GitHub.com
2. Click on the "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - GitHub will automatically detect the workflow file we've created

## Step 3: Wait for Deployment

1. Go to the "Actions" tab in your repository
2. You should see the deployment workflow running
3. Once completed successfully, your site will be accessible

## Step 4: Access Your Deployed Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/CodeCircuitChallenge/
```

## Troubleshooting

### Issue: 404 Page Not Found for Routes

**Solution**: This application uses hash-based routing to work with GitHub Pages. All URLs should work properly with the hash (#) symbol.

### Issue: Assets Not Loading

**Problem**: CSS or JavaScript files not loading properly.
**Solution**: Check that the base path in `vite.config.ts` matches your repository name:

```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR_REPOSITORY_NAME/' : '/',
```

### Issue: Workflow Failing

1. Check the GitHub Actions logs for specific error messages
2. Verify that all required files (.nojekyll, etc.) are present
3. Make sure your repository has GitHub Pages enabled in Settings

### Issue: API Calls Not Working

Since this is a static deployment, all API calls need to be handled appropriately:
- Consider using mock data for demo purposes
- The React application is set up to handle client-side routing

## Making Updates

To update your deployed site:

1. Make your changes locally
2. Commit and push to GitHub:

```powershell
git add .
git commit -m "Your update message"
git push
```

The GitHub Actions workflow will automatically build and deploy your updated site.

## Custom Domain (Optional)

To use a custom domain:

1. Update the CNAME file with your domain
2. In your repository settings, under GitHub Pages, add your custom domain
3. Configure your domain provider's DNS settings as instructed by GitHub

## Contact & Support

If you encounter issues not covered in this guide, check GitHub's documentation on GitHub Pages or open an issue in the repository.
