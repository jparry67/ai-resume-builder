# Development Script for AI Resume Builder
# This script builds the Angular app in development mode and serves it from Flask

function Build-AngularApp {
    Write-Host "Building Angular app for development..." -ForegroundColor Green

    Push-Location "frontend"
    # Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    # npm install
    # if ($LASTEXITCODE -ne 0) {
    #     Write-Host "Frontend dependency installation failed!" -ForegroundColor Red
    #     Pop-Location
    #     return $false
    # }
    ng build --configuration=development --base-href=/
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Angular build failed!" -ForegroundColor Red
        Pop-Location
        return $false
    }
    Pop-Location

    Push-Location "backend"
     Write-Host "Ensuring 'static' directory is clean..." -ForegroundColor Yellow
    if (Test-Path "static") {
        Remove-Item -Path "static" -Recurse -Force -ErrorAction SilentlyContinue
    }
    New-Item -ItemType Directory -Path "static" -Force | Out-Null

    Write-Host "Copying Angular build files to Flask static directory..." -ForegroundColor Yellow
    $sourceDir = "../frontend/dist/ai-resume-builder-frontend/browser"
    $sourcePath = "$sourceDir/*"
    $destinationPath = "static/"
    if (Test-Path $sourceDir -PathType Container) {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Recurse -Force
    } else {
        Write-Host "✗ Source Angular build directory not found: $sourceDir" -ForegroundColor Red
        Pop-Location
        return $false
    }

    Write-Host "Verifying build files..." -ForegroundColor Yellow
        $requiredFiles = @("index.html", "main.js", "main.js.map", "styles.css", "styles.css.map")
    $missingFiles = @()
    foreach ($file in $requiredFiles) {
        if (!(Test-Path "static/$file")) {
            $missingFiles += $file
        }
    }
    if ($missingFiles.Count -gt 0) {
        Write-Host "✗ Missing required files: $($missingFiles -join ', ')" -ForegroundColor Red
        Pop-Location
        return $false
    }
    Pop-Location
    Write-Host "✓ Angular app rebuilt successfully!" -ForegroundColor Green
    return $true
}

if (!(Build-AngularApp)) {
    Write-Host "Initial Angular build failed. Exiting script." -ForegroundColor Red
    exit 1
}

Write-Host "Starting Flask development server..." -ForegroundColor Green
Write-Host "Setting up virtual environment..." -ForegroundColor Yellow
Push-Location "backend"
if (!(Test-Path ".venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv .venv
}
& .venv\Scripts\Activate.ps1
Write-Host "Installing requirements..." -ForegroundColor Yellow
pip install -r requirements.txt

Pop-Location

$flaskJob = Start-Job -ScriptBlock {
    cd "$using:PWD\backend"
    & .venv\Scripts\Activate.ps1
    python app.py
}
Start-Sleep -Seconds 3
if ($flaskJob.State -eq 'Running') {
    Write-Host "✓ Flask server started successfully!" -ForegroundColor Green
    Write-Host "Your app will be available at: http://localhost:5000" -ForegroundColor Green
} else {
    Write-Host "✗ Flask server failed to start!" -ForegroundColor Red
    exit 1
}

Write-Host "Watching for file changes in frontend/src..." -ForegroundColor Yellow
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "frontend/src"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$isRebuilding = $false
$fileChangeHandler = {    
    if ($isRebuilding) {
        return
    }
    Write-Host "`nFile change detected, rebuilding Angular app..." -ForegroundColor Cyan
    $isRebuilding = $true
    if (Build-AngularApp) {
        Write-Host "✓ Rebuild complete! Refresh your browser to see changes." -ForegroundColor Green
    } else {
        Write-Host "✗ Rebuild failed! Check the console for errors." -ForegroundColor Red
    }
    Write-Host "Watching for more changes..." -ForegroundColor Yellow
    $isRebuilding = $false
}
Register-ObjectEvent $watcher "Changed" -Action $fileChangeHandler | Out-Null
Register-ObjectEvent $watcher "Created" -Action $fileChangeHandler | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $fileChangeHandler | Out-Null
Register-ObjectEvent $watcher "Renamed" -Action $fileChangeHandler | Out-Null

Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Write-Host "`nStopping development server..." -ForegroundColor Yellow
    if ($flaskJob -and ($flaskJob.State -eq 'Running' -or $flaskJob.State -eq 'Suspended')) {
        Stop-Job $flaskJob -ErrorAction SilentlyContinue
    }
    if ($flaskJob) {
        Remove-Job $flaskJob -Force -ErrorAction SilentlyContinue
    }
    if ($watcher) {
        $watcher.EnableRaisingEvents = $false
        $watcher.Dispose()
    }
    Unregister-Event -SourceIdentifier $watcher.Name -ErrorAction SilentlyContinue
    Write-Host "Development server stopped." -ForegroundColor Green
} 