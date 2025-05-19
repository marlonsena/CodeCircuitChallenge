# Deploying to GitHub Pages

Follow these steps to deploy your application to GitHub Pages:

## 1. Create a GitHub Repository

If you haven't already, create a new repository on GitHub named `CodeCircuitChallenge`.

## 2. Initialize Git and Push Your Code

```bash
# Initialize git repository if you haven't already
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit"

# Add the remote repository URL
git remote add origin https://github.com/YOUR_USERNAME/CodeCircuitChallenge.git

# Push to GitHub
git push -u origin main
```

## 3. Configure GitHub Pages

1. Go to your repository on GitHub.com
2. Click on "Settings" tab
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "GitHub Actions"
5. GitHub will automatically detect your workflow file

## 4. Wait for the Deployment

The GitHub Actions workflow will automatically build and deploy your site whenever you push to the main branch. You can monitor the progress in the "Actions" tab of your repository.

## 5. Access Your Deployed Site

Once the workflow completes successfully, your site will be available at:
`https://YOUR_USERNAME.github.io/CodeCircuitChallenge/`

## 6. Custom Domain (Optional)

If you want to use a custom domain:
1. Add your domain to the CNAME file
2. In your repository settings, under GitHub Pages, add your custom domain
3. Configure your domain provider's DNS settings as instructed by GitHub

## Troubleshooting

If you encounter any issues:
- Check the GitHub Actions logs for errors
- Make sure your vite.config.ts has the correct base path
- Verify that the .github/workflows/deploy.yml file is correctly set up
