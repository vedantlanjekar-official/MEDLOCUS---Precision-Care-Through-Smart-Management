# MEDLOCUS Frontend

A production-quality frontend for MEDLOCUS - Medical Storage Management System. Built with Next.js, TypeScript, Tailwind CSS, and React Query.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- Python 3.8+ (for backend)
- MySQL (for backend database)

### Installation

1. **Start the Flask Backend** (in a separate terminal):
   ```bash
   cd "Prototype/Prototype 1/backend"
   python app.py
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000)

2. **Start the Frontend**:
   ```bash
   cd medlocus-frontend
   npm install
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000)

**Important**: The backend must be running before starting the frontend. The frontend will automatically connect to the backend API. If the backend is unavailable, MSW mocks will be used as a fallback (you'll see a warning banner).

### Demo Credentials

- **Email**: `demo@medlocus.com`
- **Password**: `demo123`

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start Next.js dev server
npm run storybook    # Start Storybook component playground

# Testing
npm test             # Run unit tests with Jest
npm run test:watch   # Run tests in watch mode
npm run e2e          # Run E2E tests with Playwright
npm run e2e:ui       # Run E2E tests with UI

# Production
npm run build        # Build for production
npm start            # Start production server
npm run build-storybook  # Build Storybook for deployment
```

## 🏗️ Project Structure

```
medlocus-frontend/
├── app/                    # Next.js app directory (routes)
│   ├── page.tsx           # Landing page (/)
│   ├── login/             # Login page
│   └── dashboard/         # Protected dashboard routes
├── src/
│   ├── components/
│   │   ├── ui/           # Design system components
│   │   └── layout/        # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API client and services
│   ├── mocks/             # MSW handlers and mock socket
│   ├── design-system/     # Design tokens
│   ├── utils/             # Utility functions
│   └── tests/             # Test files
├── public/                # Static assets
└── .storybook/            # Storybook configuration
```

## 🎨 Features

### Pages

- **Landing Page (`/`)**: Hero section with feature cards and footer
- **Login Page (`/login`)**: Authentication with demo credentials support
- **Dashboard (`/dashboard`)**: Protected route with KPIs, transactions, and alerts

### Components

- **UI Components**: Button, Input, Card, Modal, Avatar, Table, KPI
- **Layout Components**: TopNav, SideNav, HeroPane
- All components are accessible and follow WCAG AA standards

### Authentication

- Mock JWT-based authentication
- Protected routes with automatic redirect
- Session persistence via sessionStorage
- Demo credentials for quick testing

### Real-time Updates

- Mock WebSocket connection via `useRealtime()` hook
- Automatic KPI updates when events are received
- Connection status indicator

## 🧪 Testing

### Unit Tests

Unit tests are written with Jest and React Testing Library:

```bash
npm test
```

Tests cover:
- Authentication flows (`useAuth` hook)
- Component rendering (KPI, Button, etc.)
- Utility functions

### E2E Tests

E2E tests use Playwright:

```bash
npm run e2e
```

The E2E test suite includes:
- Login flow with demo credentials
- Dashboard rendering verification
- KPI and transaction table validation

## 📚 Storybook

View and interact with components in isolation:

```bash
npm run storybook
```

Stories are available for:
- Button (all variants)
- KPI (with/without delta, different units)
- More components can be added

## 🔌 API Contract

### Authentication

#### POST `/api/auth/login`

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid credentials"
}
```

### KPIs

#### GET `/api/kpis`

**Response (200):**
```json
[
  {
    "id": "string",
    "label": "string",
    "value": 0,
    "delta": 0,
    "unit": "string"
  }
]
```

### Transactions

#### GET `/api/transactions?limit=10&page=1`

**Response (200):**
```json
{
  "items": [
    {
      "id": "string",
      "date": "ISO 8601",
      "customer": "string",
      "items": 0,
      "total": 0,
      "status": "completed" | "pending" | "refunded"
    }
  ],
  "total": 0
}
```

### Inventory Alerts

#### GET `/api/inventory/alerts`

**Response (200):**
```json
[
  {
    "id": "string",
    "name": "string",
    "sku": "string",
    "stock": 0,
    "expiryDate": "ISO 8601"
  }
]
```

### WebSocket Events

**Namespace**: `/ws/notifications`

**Event Types:**

1. **kpi_update**
```json
{
  "type": "kpi_update",
  "payload": {
    "id": "string",
    "value": 0
  }
}
```

2. **notification**
```json
{
  "type": "notification",
  "payload": {
    "id": "string",
    "message": "string",
    "createdAt": "ISO 8601"
  }
}
```

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Mocking**: MSW (Mock Service Worker)
- **Real-time**: Mock WebSocket (socket.io-client compatible)
- **Testing**: Jest, React Testing Library, Playwright
- **Component Playground**: Storybook
- **UI Components**: Headless UI

## 🔐 Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
```

**Note**: The frontend is configured to connect to the Flask backend running on `http://localhost:5000`. Make sure the backend is running before starting the frontend.

## 📝 Development Notes

### MSW (Mock Service Worker)

MSW is used to mock all API calls in development. The handlers are defined in `src/mocks/handlers.ts`.

To disable MSW, remove the `MSWProvider` from `app/layout.tsx`.

### Mock WebSocket

The real-time functionality uses a mock WebSocket implementation (`src/mocks/socket.ts`) that emits events every 15 seconds for demonstration purposes.

For production, replace the mock socket with a real WebSocket or Socket.IO connection.

### Protected Routes

Routes under `/dashboard/*` are protected. Unauthenticated users are automatically redirected to `/login` with a `returnTo` parameter.

### Type Safety

All API types are defined in `src/services/api/types.ts`. Use these types throughout the application for consistency.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Docker

A Dockerfile can be added for containerized deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

Set the following environment variables in your deployment platform:

- `NEXT_PUBLIC_API_URL`: Your backend API URL (default: `/api`)

## 🐛 Troubleshooting

### MSW not working

- Ensure `MSWProvider` is in `app/layout.tsx`
- Check browser console for MSW initialization messages
- Verify handlers are correctly imported

### Tests failing

- Run `npm install` to ensure all dependencies are installed
- Clear Jest cache: `npm test -- --clearCache`
- For Playwright: `npx playwright install`

### Build errors

- Check TypeScript errors: `npx tsc --noEmit`
- Verify all imports use correct paths
- Ensure all environment variables are set

## 📖 Handoff Notes for Backend Team

### Required Endpoints

1. **POST `/api/auth/login`**
   - Accepts email and password
   - Returns JWT token and user object
   - Returns 401 for invalid credentials

2. **GET `/api/kpis`**
   - Returns array of KPI objects
   - No authentication required for demo (add auth headers in production)

3. **GET `/api/transactions`**
   - Accepts `limit` and `page` query parameters
   - Returns paginated transaction list

4. **GET `/api/inventory/alerts`**
   - Returns array of low stock/expiring items

### WebSocket Requirements

- Namespace: `/ws/notifications`
- Event types: `kpi_update`, `notification`
- Format: See WebSocket Events section above

### Authentication

- JWT tokens should be sent in `Authorization: Bearer <token>` header
- Token should be stored in httpOnly cookie in production (currently using sessionStorage for demo)

## 📄 License

This project is part of the MEDLOCUS system.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

---

**Note**: This is a frontend-only implementation. All backend interactions are mocked using MSW. Replace mock implementations with real API calls when backend is ready.
