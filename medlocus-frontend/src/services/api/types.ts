// API Type Definitions

export interface KPI {
  id: string;
  label: string;
  value: number;
  delta?: number; // percent change vs previous period
  unit?: string;
}

export interface Transaction {
  id: string;
  date: string; // ISO
  customer: string;
  items: number;
  total: number; // cents or float
  status: 'completed' | 'pending' | 'refunded';
}

export interface InventoryItem {
  id: string;
  name: string;
  sku?: string;
  stock: number;
  expiryDate?: string; // optional ISO
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface TransactionsResponse {
  items: Transaction[];
  total: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface Customer {
  customer_id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Sale {
  sale_id: number;
  customer_id?: number;
  customer_name?: string;
  customer_email?: string;
  sale_date: string;
  total_amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
  item_count?: number;
  items?: SaleItem[];
  created_at?: string;
  updated_at?: string;
}

export interface SaleItem {
  sale_item_id?: number;
  sale_id?: number;
  medicine_id: number;
  medicine_name?: string;
  company?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface ReportSummary {
  today_sales: number;
  month_sales: number;
  total_customers: number;
  total_medicines: number;
  low_stock: number;
  expiring_soon: number;
  top_medicines: Array<{
    name: string;
    company: string;
    total_sold: number;
    revenue: number;
  }>;
  sales_trend: Array<{
    date: string;
    total: number;
  }>;
}

