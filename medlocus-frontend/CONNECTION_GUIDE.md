# Frontend-Backend Connection Guide

## ✅ Connection Status

The frontend is now connected to the Flask backend running on `http://localhost:5000`.

## 🔌 Endpoints Mapping

### Authentication
- **Frontend**: `POST /api/auth/login`
- **Backend**: `POST /api/auth/login`
- **Status**: ✅ Connected
- **Demo Credentials**: `demo@medlocus.com` / `demo123`

### KPIs
- **Frontend**: `GET /api/kpis`
- **Backend**: `GET /api/kpis`
- **Status**: ✅ Connected
- **Data Source**: Calculated from medicines table

### Transactions
- **Frontend**: `GET /api/transactions?limit=10&page=1`
- **Backend**: `GET /api/transactions?limit=10&page=1`
- **Status**: ✅ Connected
- **Data Source**: Derived from medicines table (simplified)

### Inventory Alerts
- **Frontend**: `GET /api/inventory/alerts`
- **Backend**: `GET /api/inventory/alerts`
- **Status**: ✅ Connected
- **Data Source**: Medicines with low stock (< 5) or expiring soon (within 30 days)

## 🚀 How to Run

### Step 1: Start Backend
```bash
cd "Prototype/Prototype 1/backend"
python app.py
```
Backend runs on: http://localhost:5000

### Step 2: Start Frontend
```bash
cd medlocus-frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### Step 3: Access Application
1. Open http://localhost:3000
2. Click "Sign In" or go to http://localhost:3000/login
3. Use demo credentials:
   - Email: `demo@medlocus.com`
   - Password: `demo123`
4. You'll be redirected to the dashboard with real data from the backend

## 🔄 Fallback Behavior

If the backend is not available:
- MSW (Mock Service Worker) will automatically activate
- You'll see a yellow warning banner: "⚠️ Using mock data (Backend not available)"
- The application will continue to work with mock data

## 🧪 Testing the Connection

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Authentication
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@medlocus.com","password":"demo123"}'
```

### Test KPIs
```bash
curl http://localhost:5000/api/kpis
```

### Test Transactions
```bash
curl "http://localhost:5000/api/transactions?limit=5"
```

### Test Inventory Alerts
```bash
curl http://localhost:5000/api/inventory/alerts
```

## 📝 Configuration

The frontend is configured to connect to the backend via:
- **Environment Variable**: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- **File**: `.env.local` (created automatically)

To change the backend URL, update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```

## 🐛 Troubleshooting

### CORS Errors
- The backend has CORS enabled for all origins
- If you see CORS errors, check that `flask-cors` is installed in the backend

### Connection Refused
- Ensure the backend is running on port 5000
- Check that no firewall is blocking the connection
- Verify the URL in `.env.local` is correct

### Data Not Loading
- Check browser console for errors
- Verify backend endpoints are responding (use curl tests above)
- Check that the database is set up and has data

### MSW Still Active
- MSW activates when backend is unavailable
- If backend is running but MSW is still active, check:
  1. Backend is accessible at http://localhost:5000
  2. Health endpoint responds: http://localhost:5000/api/health
  3. No network errors in browser console

## 📊 Data Flow

1. **User logs in** → Frontend calls `POST /api/auth/login` → Backend validates → Returns token
2. **Dashboard loads** → Frontend calls:
   - `GET /api/kpis` → Backend calculates from database
   - `GET /api/transactions` → Backend queries medicines table
   - `GET /api/inventory/alerts` → Backend finds low stock/expiring items
3. **Real-time updates** → Currently using mock WebSocket (to be connected to backend WebSocket in future)

## 🔐 Authentication

Currently using simple demo authentication. In production:
- Implement proper JWT validation
- Store tokens in httpOnly cookies
- Add refresh token mechanism
- Implement proper user management

## 🎯 Next Steps

1. ✅ Frontend connected to backend
2. ⏳ Connect WebSocket for real-time updates
3. ⏳ Add proper authentication with database
4. ⏳ Implement transaction management
5. ⏳ Add more KPI calculations
6. ⏳ Enhance error handling


