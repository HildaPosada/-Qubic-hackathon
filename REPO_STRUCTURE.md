# 📁 Repository Structure

```
-Qubic-hackathon/
├── 📄 Core Documentation
│   ├── README.md                       # Main project documentation
│   ├── DEMO_GUIDE.md                   # Hackathon demo guide
│   ├── ARCHITECTURE.md                 # System architecture
│   ├── CHALLENGE_ALIGNMENT.md          # Hackathon challenge alignment
│   └── HUGGINGFACE_SETUP.md           # AI setup instructions
│
├── 🎨 Frontend (React + TypeScript)
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/            # React components
│   │   │   │   ├── Header.tsx         # Header with wallet connection
│   │   │   │   ├── Editor.tsx         # Code editor with Monaco
│   │   │   │   ├── AIAssistant.tsx    # AI chat interface
│   │   │   │   ├── SecurityPanel.tsx  # Security audit panel
│   │   │   │   ├── DeploymentPanel.tsx # Deploy to Qubic
│   │   │   │   └── StatsPanel.tsx     # Platform statistics
│   │   │   ├── App.tsx                # Main app component
│   │   │   └── main.tsx               # Entry point
│   │   ├── package.json               # Dependencies
│   │   ├── vite.config.ts            # Vite configuration
│   │   └── tailwind.config.js        # Tailwind CSS config
│   └── Dockerfile.frontend            # Frontend Docker image
│
├── 🔧 Backend (FastAPI + Python)
│   ├── backend/
│   │   ├── app/
│   │   │   ├── api/                   # API endpoints
│   │   │   │   ├── generate.py       # AI code generation
│   │   │   │   ├── audit.py          # Security auditing
│   │   │   │   ├── deploy.py         # Deployment endpoints
│   │   │   │   └── contracts.py      # Contract management
│   │   │   ├── services/
│   │   │   │   └── ai_service.py     # AI service (HuggingFace)
│   │   │   ├── models/
│   │   │   │   └── schemas.py        # Pydantic models
│   │   │   ├── utils/
│   │   │   │   └── config.py         # Configuration
│   │   │   └── main.py               # FastAPI app
│   │   └── requirements.txt           # Python dependencies
│   └── Dockerfile.backend             # Backend Docker image (used by Railway)
│
├── 🚂 Deployment Configuration
│   ├── railway.toml                   # Railway deployment config
│   ├── railway.json                   # Railway JSON config
│   ├── Procfile                       # Process file
│   ├── .python-version               # Python version
│   ├── .railwayignore                # Railway ignore file
│   └── requirements.txt               # Root requirements (for Railway)
│
├── 🐳 Docker Setup (Local Development)
│   ├── docker-compose.yml            # Docker Compose config
│   ├── run.sh                        # Quick start script
│   └── .env.example                  # Environment template
│
└── 📚 Project Documentation
    ├── PROJECT_IDEAS.md              # Original ideas
    ├── HACKATHON_RESEARCH.md         # Research notes
    ├── UI_IMPROVEMENTS.md            # UI enhancement notes
    └── CLUELY_DESIGN_TRANSFORMATION.md # Design notes
```

## 🎯 Important Files

### For Development:
- `run.sh` - Start the app locally with Docker
- `.env.example` - Copy to `.env` and configure

### For Deployment:
- `railway.toml` - Railway configuration
- `Dockerfile.backend` - Backend Docker image
- `HUGGINGFACE_SETUP.md` - AI setup guide

### For Demo:
- `DEMO_GUIDE.md` - Complete demo walkthrough
- `README.md` - Project overview

## 🚀 Quick Commands

### Local Development:
```bash
./run.sh                    # Start with Docker
```

### Railway Deployment:
- Push to GitHub → Railway auto-deploys
- Set environment variables in Railway dashboard

## 🧹 Cleaned Up

Removed all temporary fix/sync scripts that were created during setup. Your core code and deployment are safe!
