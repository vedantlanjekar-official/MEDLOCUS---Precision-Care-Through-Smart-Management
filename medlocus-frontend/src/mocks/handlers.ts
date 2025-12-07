import { http, HttpResponse } from 'msw';
import type {
  KPI,
  LoginRequest,
  LoginResponse,
  Transaction,
  TransactionsResponse,
  InventoryItem,
} from '../services/api/types';

// Mock data
const mockKPIs: KPI[] = [
  { id: 'k1', label: "Today's Sales", value: 12540.75, delta: 4.3, unit: 'USD' },
  { id: 'k2', label: 'Pending Prescriptions', value: 12, delta: -8.0 },
  { id: 'k3', label: 'Low Stock Items', value: 7, delta: 1.5 },
  { id: 'k4', label: 'Total Inventory Value', value: 245000, delta: 2.1, unit: 'USD' },
];

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    date: '2025-12-06T09:12:00Z',
    customer: 'R. Sharma',
    items: 3,
    total: 250.5,
    status: 'completed',
  },
  {
    id: 't2',
    date: '2025-12-06T08:45:00Z',
    customer: 'A. Patel',
    items: 2,
    total: 180.25,
    status: 'completed',
  },
  {
    id: 't3',
    date: '2025-12-06T08:30:00Z',
    customer: 'S. Kumar',
    items: 5,
    total: 420.0,
    status: 'pending',
  },
  {
    id: 't4',
    date: '2025-12-06T07:15:00Z',
    customer: 'M. Singh',
    items: 1,
    total: 95.0,
    status: 'completed',
  },
  {
    id: 't5',
    date: '2025-12-06T06:50:00Z',
    customer: 'K. Reddy',
    items: 4,
    total: 320.75,
    status: 'completed',
  },
  {
    id: 't6',
    date: '2025-12-05T18:20:00Z',
    customer: 'P. Desai',
    items: 2,
    total: 150.0,
    status: 'refunded',
  },
];

const mockInventoryAlerts: InventoryItem[] = [
  {
    id: 'i1',
    name: 'Paracetamol 500mg',
    sku: 'PAR-500',
    stock: 2,
    expiryDate: '2026-01-15',
  },
  {
    id: 'i2',
    name: 'Insulin vials',
    sku: 'INS-001',
    stock: 4,
  },
  {
    id: 'i3',
    name: 'Amoxicillin 250mg',
    sku: 'AMX-250',
    stock: 5,
    expiryDate: '2025-12-20',
  },
];

// Demo credentials
const DEMO_EMAIL = 'demo@medlocus.com';
const DEMO_PASSWORD = 'demo123';

export const handlers = [
  // Auth endpoints
  http.post<never, LoginRequest, LoginResponse>('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      return HttpResponse.json({
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'user-1',
          name: 'Demo User',
          email: DEMO_EMAIL,
        },
      });
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // KPI endpoints
  http.get('/api/kpis', () => {
    return HttpResponse.json(mockKPIs);
  }),

  // Transaction endpoints
  http.get('/api/transactions', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mockTransactions.slice(start, end);

    return HttpResponse.json<TransactionsResponse>({
      items,
      total: mockTransactions.length,
    });
  }),

  // Inventory endpoints
  http.get('/api/inventory/alerts', () => {
    return HttpResponse.json(mockInventoryAlerts);
  }),

  // Error testing endpoint
  http.get('/api/error-test', () => {
    return HttpResponse.json(
      { message: 'Test error response' },
      { status: 500 }
    );
  }),
];


