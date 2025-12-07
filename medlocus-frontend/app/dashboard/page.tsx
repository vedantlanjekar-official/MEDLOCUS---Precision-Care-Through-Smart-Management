'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchKPIs, fetchTransactions, fetchInventoryAlerts } from '@/src/services/api';
import { KPI } from '@/src/components/ui/KPI';
import { Table } from '@/src/components/ui/Table';
import { Card } from '@/src/components/ui/Card';
import { useRealtime } from '@/src/hooks/useRealtime';
import { formatCurrency, formatDateTime } from '@/src/utils/formatters';
import type { Transaction } from '@/src/services/api/types';
import { useState } from 'react';

export default function DashboardPage() {
  const [transactionPage, setTransactionPage] = useState(1);
  const { isConnected } = useRealtime();

  const { data: kpis = [], isLoading: kpisLoading } = useQuery({
    queryKey: ['kpis'],
    queryFn: fetchKPIs,
  });

  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions', transactionPage],
    queryFn: () => fetchTransactions(10, transactionPage),
  });

  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['inventory-alerts'],
    queryFn: fetchInventoryAlerts,
  });

  const transactionColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (row: Transaction) => formatDateTime(row.date),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (row: Transaction) => row.customer,
    },
    {
      key: 'items',
      label: 'Items',
      render: (row: Transaction) => row.items,
    },
    {
      key: 'total',
      label: 'Total',
      render: (row: Transaction) => formatCurrency(row.total),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: Transaction) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : row.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      {isConnected && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
          ✓ Real-time updates connected
        </div>
      )}

      {/* KPI Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpisLoading ? (
            <div className="col-span-4 text-center py-8 text-gray-500">
              Loading KPIs...
            </div>
          ) : (
            kpis.map((kpi) => <KPI key={kpi.id} kpi={kpi} />)
          )}
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2" padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales Trend
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">
              Chart placeholder (Chart.js integration)
            </p>
          </div>
        </Card>

        {/* Alerts Card */}
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
          {alertsLoading ? (
            <p className="text-sm text-gray-500">Loading alerts...</p>
          ) : alerts.length === 0 ? (
            <p className="text-sm text-gray-500">No alerts</p>
          ) : (
            <ul className="space-y-3">
              {alerts.map((alert) => (
                <li
                  key={alert.id}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-md"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {alert.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Stock: {alert.stock}
                    {alert.expiryDate && ` • Expires: ${alert.expiryDate}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Transactions
        </h3>
        {transactionsLoading ? (
          <p className="text-sm text-gray-500">Loading transactions...</p>
        ) : (
          <Table
            columns={transactionColumns}
            data={transactionsData?.items || []}
            page={transactionPage}
            pageSize={10}
            onPageChange={setTransactionPage}
          />
        )}
      </Card>
    </div>
  );
}


