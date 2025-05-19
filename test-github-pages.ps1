# Test GitHub Pages locally
# This script will serve your built files locally to simulate GitHub Pages environment

# Check if http-server is installed
$httpServerExists = $null
try {
    $httpServerExists = Get-Command npx -ErrorAction SilentlyContinue
} catch {
    # Do nothing
}

# First build the project with base path
Write-Host "Building project for GitHub Pages..." -ForegroundColor Cyan
npm run build

# Create .nojekyll file in the dist/public folder
Write-Host "Creating .nojekyll file..." -ForegroundColor Cyan
New-Item -ItemType File -Path "./dist/public/.nojekyll" -Force | Out-Null

# Copy 404.html to the build directory
Write-Host "Copying 404.html..." -ForegroundColor Cyan
if (Test-Path -Path "./client/404.html") {
    Copy-Item -Path "./client/404.html" -Destination "./dist/public/404.html" -Force
} else {
    $notFoundContent = @"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Page Not Found - Code Circuit Challenge</title>
    <script>
      // Extract repository name from URL for flexibility
      const getRepoName = () => {
        const pathParts = window.location.pathname.split('/');
        // Check for GitHub Pages pattern
        if (pathParts.length >= 2) {
          return pathParts[1]; // This should be the repo name on GitHub Pages
        }
        return 'CodeCircuitChallenge'; // Default fallback
      };
      
      // Handle SPA routing - redirect to root with hash
      const repoName = getRepoName();
      const path = window.location.pathname.replace(`/${repoName}/`, '/');
      window.location.href = window.location.origin + `/${repoName}/#` + (path || '/');
    </script>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center;
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f9fafb;
        color: #1f2937;
      }
      .container {
        max-width: 600px;
        padding: 2rem;
      }
      h1 {
        margin-bottom: 1rem;
      }
      p {
        margin-bottom: 2rem;
      }
      a {
        color: #3b82f6;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for might have been removed or is temporarily unavailable.</p>
      <p>Redirecting you to the home page...</p>
      <p><a href="/CodeCircuitChallenge/">Click here if you are not redirected automatically</a></p>
    </div>
  </body>
</html>
"@
    $notFoundContent | Out-File -FilePath "./dist/public/404.html" -Encoding utf8
}

# Start a local server to test
if ($httpServerExists) {
    Write-Host "Starting local server at http://localhost:8080/CodeCircuitChallenge/" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    npx http-server ./dist/public -p 8080 -o /CodeCircuitChallenge/
} else {
    Write-Host "To test locally, install http-server with: npm install -g http-server" -ForegroundColor Yellow
    Write-Host "Then run: npx http-server ./dist/public -p 8080 -o /CodeCircuitChallenge/" -ForegroundColor Yellow
    
    # Ask if user wants to install http-server
    $installServer = Read-Host "Would you like to install http-server now? (y/n)"
    if ($installServer -eq "y" -or $installServer -eq "Y") {
        npm install -g http-server
        Write-Host "Starting local server at http://localhost:8080/CodeCircuitChallenge/" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        npx http-server ./dist/public -p 8080 -o /CodeCircuitChallenge/
    }
}
