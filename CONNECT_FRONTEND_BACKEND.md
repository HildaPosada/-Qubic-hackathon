# 🔗 Connect Frontend to Railway Backend

## Step 1: Get Your Railway Backend URL

1. Go to your Railway project dashboard
2. Find your backend service
3. Copy the public URL (looks like: `https://your-app.up.railway.app`)

---

## Step 2: Update Frontend Configuration

### Option A: Update .env file (Local Development)

Create/update `.env` in the `frontend/` directory:

```bash
VITE_API_URL=https://your-backend.up.railway.app
```

### Option B: Deploy Frontend to Railway/Vercel

If deploying your frontend, set environment variable:

```bash
VITE_API_URL=https://your-backend.up.railway.app
```

---

## Step 3: Update Vite Config for Production

Your `vite.config.ts` needs to handle both local and production:

```typescript
proxy: {
  '/api': {
    target: process.env.VITE_API_URL || 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

---

## Step 4: Update Backend CORS

Make sure your Railway backend allows your frontend domain.

In Railway, set environment variable:

```bash
CORS_ORIGINS=https://your-frontend-domain.com,http://localhost:3000
```

Or set to allow all (for testing):

```bash
CORS_ORIGINS=*
```

---

## 🧪 Test Connection

### Local Frontend → Railway Backend:

1. Create `frontend/.env`:
```bash
VITE_API_URL=https://your-backend.up.railway.app
```

2. Start frontend:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000
4. Check browser console for API calls
5. Try generating a contract with AI assistant

---

## 🚀 Deploy Frontend Options

### Option 1: Railway (Same as Backend)

1. Create new Railway service
2. Connect your GitHub repo
3. Root Directory: `frontend`
4. Build Command: `npm run build`
5. Start Command: `npm run preview` or use nginx
6. Set `VITE_API_URL` environment variable

### Option 2: Vercel (Recommended for Frontend)

1. Go to https://vercel.com
2. Import your GitHub repo
3. Framework: Vite
4. Root Directory: `frontend`
5. Environment Variables:
   - `VITE_API_URL` = `https://your-backend.up.railway.app`
6. Deploy!

### Option 3: Netlify

1. Go to https://netlify.com
2. Import GitHub repo
3. Build command: `cd frontend && npm run build`
4. Publish directory: `frontend/dist`
5. Environment Variables:
   - `VITE_API_URL` = `https://your-backend.up.railway.app`

---

## 📋 Checklist

- [ ] Backend deployed on Railway
- [ ] Get Railway backend URL
- [ ] Update frontend VITE_API_URL
- [ ] Update backend CORS_ORIGINS
- [ ] Test API connection
- [ ] Add Hugging Face API key to Railway
- [ ] Test AI generation endpoint
- [ ] Deploy frontend (optional)

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Fix:** Add your frontend URL to backend CORS_ORIGINS in Railway

### Issue: API calls failing
**Fix:** Check Railway backend logs, ensure it's running

### Issue: AI not working
**Fix:** Add HUGGINGFACE_API_KEY to Railway environment variables

### Issue: 404 on API calls
**Fix:** Make sure VITE_API_URL includes https:// and no trailing slash

---

## 🎯 Quick Setup (Local Frontend + Railway Backend)

```bash
# In frontend directory
cd frontend

# Create .env file
echo "VITE_API_URL=https://your-backend.up.railway.app" > .env

# Install dependencies (if needed)
npm install

# Start frontend
npm run dev
```

Visit http://localhost:3000 and your frontend will use the Railway backend! 🚀
