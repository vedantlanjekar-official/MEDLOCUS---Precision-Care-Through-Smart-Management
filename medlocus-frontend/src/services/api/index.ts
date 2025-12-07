import { apiClient } from '../apiClient';
import type {
  KPI,
  LoginRequest,
  LoginResponse,
  Transaction,
  TransactionsResponse,
  InventoryItem,
} from './types';

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  },
};

// KPIs API
export const fetchKPIs = async (): Promise<KPI[]> => {
  return apiClient.get<KPI[]>('/kpis');
};

// Transactions API
export const fetchTransactions = async (
  limit: number = 10,
  page: number = 1
): Promise<TransactionsResponse> => {
  return apiClient.get<TransactionsResponse>(
    `/transactions?limit=${limit}&page=${page}`
  );
};

// Inventory API
export const fetchInventoryAlerts = async (): Promise<InventoryItem[]> => {
  return apiClient.get<InventoryItem[]>('/inventory/alerts');
};

// Medicines/Inventory CRUD
export const fetchMedicines = async (search?: string): Promise<any[]> => {
  const url = search ? `/medicines/search?q=${encodeURIComponent(search)}` : '/medicines';
  return apiClient.get<any[]>(url);
};

export const fetchMedicine = async (id: number): Promise<any> => {
  return apiClient.get<any>(`/medicines/${id}`);
};

export const createMedicine = async (data: any): Promise<any> => {
  return apiClient.post<any>('/medicines', data);
};

export const updateMedicine = async (id: number, data: any): Promise<any> => {
  return apiClient.put<any>(`/medicines/${id}`, data);
};

export const deleteMedicine = async (id: number): Promise<void> => {
  return apiClient.delete<void>(`/medicines/${id}`);
};

// Customers API
import type { Customer, Sale, SaleItem, ReportSummary } from './types';

export const fetchCustomers = async (search?: string): Promise<Customer[]> => {
  const url = search ? `/customers?search=${encodeURIComponent(search)}` : '/customers';
  return apiClient.get<Customer[]>(url);
};

export const fetchCustomer = async (id: number): Promise<Customer> => {
  return apiClient.get<Customer>(`/customers/${id}`);
};

export const createCustomer = async (data: Partial<Customer>): Promise<Customer> => {
  return apiClient.post<Customer>('/customers', data);
};

export const updateCustomer = async (id: number, data: Partial<Customer>): Promise<Customer> => {
  return apiClient.put<Customer>(`/customers/${id}`, data);
};

export const deleteCustomer = async (id: number): Promise<void> => {
  return apiClient.delete<void>(`/customers/${id}`);
};

// Sales API
export const fetchSales = async (search?: string, status?: string, limit?: number, page?: number): Promise<{items: Sale[], total: number}> => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  if (limit) params.append('limit', limit.toString());
  if (page) params.append('page', page.toString());
  const url = `/sales${params.toString() ? '?' + params.toString() : ''}`;
  return apiClient.get<{items: Sale[], total: number}>(url);
};

export const fetchSale = async (id: number): Promise<Sale> => {
  return apiClient.get<Sale>(`/sales/${id}`);
};

export const createSale = async (data: Partial<Sale> & {items: SaleItem[]}): Promise<Sale> => {
  return apiClient.post<Sale>('/sales', data);
};

export const updateSale = async (id: number, data: Partial<Sale>): Promise<Sale> => {
  return apiClient.put<Sale>(`/sales/${id}`, data);
};

export const deleteSale = async (id: number): Promise<void> => {
  return apiClient.delete<void>(`/sales/${id}`);
};

// Reports API
export const fetchReportSummary = async (): Promise<ReportSummary> => {
  return apiClient.get<ReportSummary>('/reports/summary');
};

// Suppliers API (for dropdowns)
export const fetchSuppliers = async (): Promise<any[]> => {
  return apiClient.get<any[]>('/suppliers');
};

