'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchReportSummary } from '@/src/services/api';
import { Card } from '@/src/components/ui/Card';
import { KPI } from '@/src/components/ui/KPI';
import { formatCurrency, formatDate } from '@/src/utils/formatters';
import type { KPI as KPIType } from '@/src/services/api/types';

export default function ReportsPage() {
  const { data: report, isLoading } = useQuery({
    queryKey: ['report-summary'],
    queryFn: fetchReportSummary,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f62fe]"></div>
      </div>
    );
  }

  if (!report) {
    return <div className="text-gray-500">No report data available</div>;
  }

  const kpis: KPIType[] = [
    {
      id: 'r1',
      label: "Today's Sales",
      value: report.today_sales,
      delta: 0,
      unit: 'USD',
    },
    {
      id: 'r2',
      label: 'Monthly Sales',
      value: report.month_sales,
      delta: 0,
      unit: 'USD',
    },
    {
      id: 'r3',
      label: 'Total Customers',
      value: report.total_customers,
    },
    {
      id: 'r4',
      label: 'Total Medicines',
      value: report.total_medicines,
    },
    {
      id: 'r5',
      label: 'Low Stock Items',
      value: report.low_stock,
    },
    {
      id: 'r6',
      label: 'Expiring Soon',
      value: report.expiring_soon,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <KPI key={kpi.id} kpi={kpi} showDelta={false} />
        ))}
      </div>

      {/* Top Selling Medicines */}
      <Card padding="md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Selling Medicines (Last 30 Days)</h2>
        {report.top_medicines.length === 0 ? (
          <p className="text-gray-500">No sales data available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.top_medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {medicine.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {medicine.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.total_sold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(medicine.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Sales Trend */}
      <Card padding="md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Trend (Last 7 Days)</h2>
        {report.sales_trend.length === 0 ? (
          <p className="text-gray-500">No sales data available</p>
        ) : (
          <div className="space-y-2">
            {report.sales_trend.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-700">
                  {formatDate(trend.date)}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(trend.total)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Medicines:</span>
              <span className="font-semibold">{report.total_medicines}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock Items:</span>
              <span className="font-semibold text-red-600">{report.low_stock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expiring Soon:</span>
              <span className="font-semibold text-yellow-600">{report.expiring_soon}</span>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Today's Sales:</span>
              <span className="font-semibold">{formatCurrency(report.today_sales)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Sales:</span>
              <span className="font-semibold">{formatCurrency(report.month_sales)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Customers:</span>
              <span className="font-semibold">{report.total_customers}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
