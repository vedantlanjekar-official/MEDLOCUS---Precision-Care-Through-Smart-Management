'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSales, fetchSale, createSale, updateSale, deleteSale, fetchCustomers, fetchMedicines } from '@/src/services/api';
import { Table } from '@/src/components/ui/Table';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { formatCurrency, formatDate } from '@/src/utils/formatters';

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<any>(null);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: salesData, isLoading } = useQuery({
    queryKey: ['sales', searchQuery, statusFilter, page],
    queryFn: () => fetchSales(searchQuery || undefined, statusFilter || undefined, 10, page),
  });

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const { data: medicines = [] } = useQuery({
    queryKey: ['medicines'],
    queryFn: () => fetchMedicines(),
  });

  const createMutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });

  const [formData, setFormData] = useState({
    customer_id: '',
    sale_date: new Date().toISOString().split('T')[0],
    status: 'completed',
    notes: '',
    items: [] as Array<{ medicine_id: string; quantity: string; unit_price: string }>,
  });

  const resetForm = () => {
    setFormData({
      customer_id: '',
      sale_date: new Date().toISOString().split('T')[0],
      status: 'completed',
      notes: '',
      items: [],
    });
    setEditingSale(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this sale?')) {
      deleteMutation.mutate(id);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { medicine_id: '', quantity: '1', unit_price: '' }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Auto-fill price when medicine is selected
    if (field === 'medicine_id' && value) {
      const medicine = medicines.find((m: any) => m.medicine_id.toString() === value);
      if (medicine) {
        newItems[index].unit_price = medicine.price.toString();
      }
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unit_price) || 0;
      return sum + (qty * price);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = formData.items.map(item => ({
      medicine_id: parseInt(item.medicine_id),
      quantity: parseInt(item.quantity),
      unit_price: parseFloat(item.unit_price),
      subtotal: parseFloat(item.quantity) * parseFloat(item.unit_price),
    }));

    const saleData = {
      customer_id: formData.customer_id ? parseInt(formData.customer_id) : null,
      sale_date: formData.sale_date,
      total_amount: calculateTotal(),
      status: formData.status,
      notes: formData.notes,
      items,
    };

    createMutation.mutate(saleData);
  };

  const columns = [
    {
      key: 'sale_id',
      label: 'Sale ID',
      render: (row: any) => <span className="font-medium">#{row.sale_id}</span>,
    },
    {
      key: 'customer_name',
      label: 'Customer',
      render: (row: any) => row.customer_name || 'Walk-in',
    },
    {
      key: 'sale_date',
      label: 'Date',
      render: (row: any) => formatDate(row.sale_date),
    },
    {
      key: 'item_count',
      label: 'Items',
    },
    {
      key: 'total_amount',
      label: 'Total',
      render: (row: any) => formatCurrency(row.total_amount),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: any) => (
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
    {
      key: 'actions',
      label: 'Actions',
      render: (row: any) => (
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDelete(row.sale_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          New Sale
        </Button>
      </div>

      <Card padding="md">
        <div className="mb-4 flex gap-4">
          <Input
            type="search"
            placeholder="Search by customer name or sale ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f62fe]"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <Table
              columns={columns}
              data={salesData?.items || []}
              page={page}
              pageSize={10}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); resetForm(); }}
        title="New Sale"
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer
              </label>
              <select
                value={formData.customer_id}
                onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f62fe]"
              >
                <option value="">Walk-in Customer</option>
                {customers.map((customer: any) => (
                  <option key={customer.customer_id} value={customer.customer_id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Sale Date"
              type="date"
              value={formData.sale_date}
              onChange={(e) => setFormData({ ...formData, sale_date: e.target.value })}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Items</label>
              <Button type="button" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end p-2 border rounded">
                  <div className="col-span-5">
                    <select
                      value={item.medicine_id}
                      onChange={(e) => updateItem(index, 'medicine_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    >
                      <option value="">Select Medicine</option>
                      {medicines.map((medicine: any) => (
                        <option key={medicine.medicine_id} value={medicine.medicine_id}>
                          {medicine.name} (Stock: {medicine.quantity})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      placeholder="Qty"
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                      placeholder="Price"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm font-medium">
                      {formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0))}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => removeItem(index)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
              {formData.items.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No items added. Click "Add Item" to start.
                </p>
              )}
            </div>
            <div className="mt-2 text-right">
              <span className="text-lg font-bold">Total: {formatCurrency(calculateTotal())}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f62fe]"
              >
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <Input
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => { setIsModalOpen(false); resetForm(); }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={createMutation.isPending}
              disabled={formData.items.length === 0}
            >
              Create Sale
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
