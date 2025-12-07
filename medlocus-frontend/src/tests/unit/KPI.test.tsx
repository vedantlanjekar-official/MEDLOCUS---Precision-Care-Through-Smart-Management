import { render, screen } from '@testing-library/react';
import { KPI } from '@/src/components/ui/KPI';
import type { KPI as KPIType } from '@/src/services/api/types';

describe('KPI Component', () => {
  const mockKPI: KPIType = {
    id: 'k1',
    label: "Today's Sales",
    value: 12540.75,
    delta: 4.3,
    unit: 'USD',
  };

  it('renders KPI with label and value', () => {
    render(<KPI kpi={mockKPI} />);
    expect(screen.getByText("Today's Sales")).toBeInTheDocument();
    expect(screen.getByText('$12,540.75')).toBeInTheDocument();
  });

  it('displays delta when provided', () => {
    render(<KPI kpi={mockKPI} />);
    expect(screen.getByText('+4.3%')).toBeInTheDocument();
  });

  it('hides delta when showDelta is false', () => {
    render(<KPI kpi={mockKPI} showDelta={false} />);
    expect(screen.queryByText('+4.3%')).not.toBeInTheDocument();
  });

  it('handles negative delta', () => {
    const negativeKPI = { ...mockKPI, delta: -8.0 };
    render(<KPI kpi={negativeKPI} />);
    expect(screen.getByText('-8.0%')).toBeInTheDocument();
  });

  it('formats number without unit', () => {
    const noUnitKPI = { ...mockKPI, unit: undefined };
    render(<KPI kpi={noUnitKPI} />);
    expect(screen.getByText('12,541')).toBeInTheDocument();
  });
});


