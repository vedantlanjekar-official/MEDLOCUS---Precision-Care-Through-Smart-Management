# 🚀 How to Run MEDLOCUS Project

## Quick Start

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd "Prototype/Prototype 1/backend"
python app.py
```
Backend will run on: **http://localhost:5000**

**Terminal 2 - Frontend:**
```bash
cd medlocus-frontend
npm run dev
```
Frontend will run on: **http://localhost:3000**

### Option 2: Run in Background (Windows PowerShell)

```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\vedan\Desktop\Projects\MEDLOCUS\Prototype\Prototype 1\backend'; python app.py"

# Start Frontend (wait 3 seconds for backend)
Start-Sleep -Seconds 3
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\vedan\Desktop\Projects\MEDLOCUS\medlocus-frontend'; npm run dev"

# Open Browser
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"
```

## ✅ Verification

### Check Backend
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status": "healthy", "message": "..."}`

### Check Frontend
Open browser: **http://localhost:3000**

### Check Backend API
```bash
curl http://localhost:5000/api/kpis
```
Should return KPI data array

## 🔐 Login Credentials

- **Email**: `demo@medlocus.com`
- **Password**: `demo123`

## 📋 What to Expect

1. **Landing Page** (`/`): Hero section with feature cards
2. **Login Page** (`/login`): Sign in with demo credentials
3. **Dashboard** (`/dashboard`): 
   - KPI cards showing real data from database
   - Recent transactions table
   - Inventory alerts
   - Real-time connection status

## 🐛 Troubleshooting

### Backend Not Starting
- Check MySQL is running
- Verify database `medvault_db` exists
- Check `.env` file in `backend/` folder has correct MySQL credentials

### Frontend Not Starting
- Run `npm install` in `medlocus-frontend` folder
- Check Node.js version (18+ required)
- Clear `.next` cache: `rm -rf .next` (or `Remove-Item -Recurse -Force .next` on Windows)

### Connection Issues
- Ensure backend is running on port 5000
- Check `.env.local` in frontend has: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- Verify CORS is enabled in backend (it is by default)

### Port Already in Use
- Backend: Change port in `backend/config.py` or `.env`
- Frontend: Change port: `npm run dev -- -p 3001`

## 📊 Server Status

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **API Health**: http://localhost:5000/api/health
- **Database**: MySQL `medvault_db`

## 🎯 Next Steps After Running

1. Open http://localhost:3000
2. Click "Sign In" or navigate to /login
3. Enter demo credentials
4. Explore the dashboard with real data from your database!


