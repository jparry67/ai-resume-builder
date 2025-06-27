# AI Resume Builder

A full-stack application with a Flask backend API and Angular frontend for building AI-powered resumes. The Angular app is served directly from the Flask backend.

## Prerequisites

- **Windows PowerShell**: The development and deployment scripts (`dev.ps1` and `deploy.ps1`) are designed for Windows PowerShell and may not work in other shells or operating systems.
- **Node.js**: Required for Angular development
- **Python**: Required for Flask backend
- **AWS CLI**: Required for deployment (configured with appropriate credentials)

## Project Structure

```
ai-resume-builder/
├── backend/
│   ├── static/          # Angular build files (generated)
│   ├── app.py           # Flask API server
│   ├── requirements.txt
│   └── serverless.yml
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   └── ...
├── dev.ps1              # Development script with file watching
├── deploy.ps1           # Build and deploy script
└── README.md
```

## Quick Start

### Development

**Unified Development:**
```bash
npm run dev
```
This will:
1. Build the Angular app for development
2. Copy files to Flask static directory
3. Start Flask server
4. Watch for file changes and auto-rebuild

The application will be available at `http://localhost:5000`

### Production Deployment

**Build and Deploy Everything:**
```bash
npm run deploy
```

This will:
1. Build the Angular app for production
2. Copy the build files to the Flask static directory
3. Set up Python virtual environment
4. Install dependencies
5. Deploy everything to AWS Lambda

**The app is deployed to:**
[https:/resume-builder.jparry.dev](https://resume-builder.jparry.dev)

## API Endpoints

### GET /api/hello
Simple hello world endpoint.

**Response:**
```json
{
  "message": "hello world"
}
```

### GET /
Serves the Angular application (SPA routing).

## Technology Stack

- **Backend**: Flask 2.3.3 (Python)
- **Frontend**: Angular 20 (TypeScript)
- **Deployment**: AWS Lambda + API Gateway
