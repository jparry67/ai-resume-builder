# Build and Deploy Script for AI Resume Builder
# This script builds the Angular app and deploys both frontend and backend together

Write-Host "Building Angular app..." -ForegroundColor Green

# Build Angular app for production with correct base href for custom domain
Push-Location "frontend"
ng build --configuration=production --base-href=/
if ($LASTEXITCODE -ne 0) {
    Write-Host "Angular build failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

# Navigate to backend directory to manage static files
Push-Location "backend"

# Ensure the static directory is clean or freshly created
Write-Host "Ensuring 'static' directory is clean..." -ForegroundColor Yellow
if (Test-Path "static") {
    Remove-Item -Path "static" -Recurse -Force -ErrorAction SilentlyContinue
}
# Now, create a fresh 'static' directory
New-Item -ItemType Directory -Path "static" -Force | Out-Null # -Force handles if it somehow already exists, Out-Null to suppress verbose output

# Copy Angular build files to Flask static directory
Write-Host "Copying Angular build files to Flask static directory..." -ForegroundColor Yellow
# Ensure the source path exists before copying
$sourceDir = "../frontend/dist/ai-resume-builder-frontend/browser"
$sourcePath = "$sourceDir/*"
$destinationPath = "static/"
if (Test-Path $sourceDir -PathType Container) { # Check if the source directory exists
    Copy-Item -Path $sourcePath -Destination $destinationPath -Recurse -Force
} else {
    Write-Host "✗ Source Angular build directory not found: $sourceDir" -ForegroundColor Red
    Pop-Location
    exit 1
}

# Verify the build
Write-Host "Verifying build files..." -ForegroundColor Yellow

# List of required files to check (production builds use hashed filenames)
$requiredFiles = @("index.html", "main-*.js", "styles-*.css")
$missingFiles = @()

foreach ($file in $requiredFiles) {
    if (!(Test-Path "static/$file")) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "✗ Missing required files: $($missingFiles -join ', ')" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location # Go back to the original directory after all backend operations

# Deploy to AWS Lambda
Write-Host "Deploying to AWS Lambda..." -ForegroundColor Green

# Navigate to backend directory for deployment
Push-Location "backend"

Write-Host "Setting up virtual environment..." -ForegroundColor Green

# Create virtual environment if it doesn't exist
if (!(Test-Path ".venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv .venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .venv\Scripts\Activate.ps1

# Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Install requirements
Write-Host "Installing requirements..." -ForegroundColor Yellow
pip install -r requirements.txt

# Clean previous builds
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path ".serverless") {
    Remove-Item -Recurse -Force ".serverless"
}

# Deploy
Write-Host "Deploying to AWS Lambda..." -ForegroundColor Green
serverless deploy

Pop-Location # Go back to the original directory

Write-Host "Build and deployment complete!" -ForegroundColor Green
Write-Host "Your app is now available at your Lambda API Gateway URL" -ForegroundColor Green 