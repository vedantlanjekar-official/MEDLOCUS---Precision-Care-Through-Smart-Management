'use client';

import React from 'react';
import { cn } from '@/src/utils/cn';
import { formatCurrency, formatDelta, formatNumber } from '@/src/utils/formatters';
import type { KPI as KPIType } from '@/src/services/api/types';

export interface KPIProps {
  kpi: KPIType;
  showDelta?: boolean;
  className?: string;
}

export const KPI: React.FC<KPIProps> = ({ kpi, showDelta = true, className }) => {
  const formatValue = () => {
    if (kpi.unit === 'USD') {
      return formatCurrency(kpi.value);
    }
    return formatNumber(kpi.value);
  };

  const delta = kpi.delta;
  const isPositive = delta !== undefined && delta >= 0;

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-6',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{kpi.label}</p>
          <p className="text-2xl font-bold text-gray-900">{formatValue()}</p>
          {showDelta && delta !== undefined && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {formatDelta(delta)}
              </span>
              <span className="ml-1 text-sm text-gray-500">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


