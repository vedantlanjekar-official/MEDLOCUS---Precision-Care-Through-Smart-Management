'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/utils/cn';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Inventory', href: '/dashboard/inventory' },
  { label: 'Sales', href: '/dashboard/sales' },
  { label: 'Customers', href: '/dashboard/customers' },
  { label: 'Reports', href: '/dashboard/reports' },
];

export const SideNav: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full transition-transform duration-300 z-50',
          'fixed md:static inset-y-0 left-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'w-64'
        )}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'block px-4 py-3 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#0f62fe] dark:bg-teal-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

