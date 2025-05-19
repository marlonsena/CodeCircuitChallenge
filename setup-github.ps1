# This is a PowerShell script to initialize and push your repository to GitHub

# Check if Git is installed
try {
    git --version
} catch {
    Write-Error "Git is not installed. Please install Git first: https://git-scm.com/downloads"
    exit 1
}

# Initialize git repository if not already initialized
if (-not (Test-Path -Path ".git")) {
    Write-Host "Initializing Git repository..."
    git init
} else {
    Write-Host "Git repository already initialized."
}

# Prompt for GitHub username
$githubUsername = Read-Host "Enter your GitHub username"

# Prompt for repository name (default: CodeCircuitChallenge)
$repoName = Read-Host "Enter repository name (press Enter to use 'CodeCircuitChallenge')"
if (-not $repoName) {
    $repoName = "CodeCircuitChallenge"
}

# Update the base URL in vite.config.ts for GitHub Pages
$viteConfigPath = "vite.config.ts"
$viteConfig = Get-Content $viteConfigPath -Raw
$updatedViteConfig = $viteConfig -replace "base: process.env.NODE_ENV === 'production' \? '/CodeCircuitChallenge/' : '/'", "base: process.env.NODE_ENV === 'production' ? '/$repoName/' : '/'"
Set-Content $viteConfigPath -Value $updatedViteConfig

# Stage all files
git add .

# Commit the changes
git commit -m "Initial commit for GitHub Pages deployment"

# Add the remote repository URL
git remote add origin "https://github.com/$githubUsername/$repoName.git"

# Push to GitHub
Write-Host "Pushing to GitHub repository: https://github.com/$githubUsername/$repoName"
Write-Host "If you haven't created this repository yet, please create it on GitHub first."
Write-Host "Press Enter to continue or Ctrl+C to cancel..."
Read-Host

git push -u origin main

Write-Host "Repository pushed to GitHub."
Write-Host "To complete the GitHub Pages setup:"
Write-Host "1. Go to your repository: https://github.com/$githubUsername/$repoName"
Write-Host "2. Click on 'Settings' tab"
Write-Host "3. Navigate to 'Pages' in the sidebar"
Write-Host "4. Under 'Build and deployment', select 'GitHub Actions' as the source"
Write-Host "Once the workflow runs, your site will be available at: https://$githubUsername.github.io/$repoName/"
