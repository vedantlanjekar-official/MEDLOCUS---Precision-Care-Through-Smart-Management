'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMedicines, fetchSuppliers, createMedicine, updateMedicine, deleteMedicine } from '@/src/services/api';
import { Table } from '@/src/components/ui/Table';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { formatCurrency, formatDate } from '@/src/utils/formatters';

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['medicines', searchQuery],
    queryFn: () => fetchMedicines(searchQuery || undefined),
  });

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
  });

  const createMutation = useMutation({
    mutationFn: createMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateMedicine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mfg_date: '',
    exp_date: '',
    quantity: '',
    price: '',
    supplier_id: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      mfg_date: '',
      exp_date: '',
      quantity: '',
      price: '',
      supplier_id: '',
    });
    setEditingMedicine(null);
  };

  const handleEdit = (medicine: any) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      company: medicine.company,
      mfg_date: medicine.mfg_date,
      exp_date: medicine.exp_date,
      quantity: medicine.quantity.toString(),
      price: medicine.price.toString(),
      supplier_id: medicine.supplier_id.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      supplier_id: parseInt(formData.supplier_id),
    };

    if (editingMedicine) {
      updateMutation.mutate({ id: editingMedicine.medicine_id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row: any) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: 'company',
      label: 'Company',
    },
    {
      key: 'quantity',
      label: 'Stock',
      render: (row: any) => (
        <span className={row.quantity < 5 ? 'text-red-600 font-semibold' : ''}>
          {row.quantity}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (row: any) => formatCurrency(row.price),
    },
    {
      key: 'exp_date',
      label: 'Expiry Date',
      render: (row: any) => formatDate(row.exp_date),
    },
    {
      key: 'supplier_name',
      label: 'Supplier',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row.medicine_id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          Add Medicine
        </Button>
      </div>

      <Card padding="md">
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search medicines by name, company, or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <Table columns={columns} data={medicines} />
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); resetForm(); }}
        title={editingMedicine ? 'Edit Medicine' : 'Add Medicine'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Medicine Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Manufacturing Date"
              type="date"
              value={formData.mfg_date}
              onChange={(e) => setFormData({ ...formData, mfg_date: e.target.value })}
              required
            />
            <Input
              label="Expiry Date"
              type="date"
              value={formData.exp_date}
              onChange={(e) => setFormData({ ...formData, exp_date: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="0"
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </label>
            <select
              value={formData.supplier_id}
              onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f62fe]"
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier: any) => (
                <option key={supplier.supplier_id} value={supplier.supplier_id}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
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
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              {editingMedicine ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
