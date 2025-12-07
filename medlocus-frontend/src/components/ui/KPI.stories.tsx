import type { Meta, StoryObj } from '@storybook/react';
import { KPI } from './KPI';
import type { KPI as KPIType } from '@/src/services/api/types';

const meta: Meta<typeof KPI> = {
  title: 'UI/KPI',
  component: KPI,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KPI>;

const mockKPI: KPIType = {
  id: 'k1',
  label: "Today's Sales",
  value: 12540.75,
  delta: 4.3,
  unit: 'USD',
};

export const Default: Story = {
  args: {
    kpi: mockKPI,
  },
};

export const WithNegativeDelta: Story = {
  args: {
    kpi: {
      ...mockKPI,
      delta: -8.0,
    },
  },
};

export const WithoutDelta: Story = {
  args: {
    kpi: {
      ...mockKPI,
      delta: undefined,
    },
  },
};

export const WithoutUnit: Story = {
  args: {
    kpi: {
      ...mockKPI,
      unit: undefined,
    },
  },
};


