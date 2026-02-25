@echo off
echo ===========================================
echo   Meeting Scheduler Startup
echo ===========================================
echo.

REM Check which version
if exist api\ (
    echo Detected: VERCEL SERVERLESS VERSION
    echo.
    echo Checking for Vercel CLI...
    where vercel >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Vercel CLI not installed!
        echo.
        echo Install it with:
        echo   npm install -g vercel
        echo.
        echo Then run this script again.
        pause
        exit /b 1
    )
    echo Vercel CLI found!
    echo.
    echo Starting with: vercel dev
    echo ===========================================
    echo.
    vercel dev
) else if exist server.js (
    echo Detected: TRADITIONAL SERVER VERSION
    echo.
    if not exist .env (
        echo WARNING: .env file not found!
        echo Copy .env.example to .env first
        echo.
        pause
    )
    if not exist node_modules\ (
        echo Installing dependencies...
        call npm install
    )
    echo Starting with: node server.js
    echo ===========================================
    echo.
    node server.js
) else (
    echo ERROR: Could not detect version!
    echo This script should be in your project folder.
    echo.
    pause
    exit /b 1
)
