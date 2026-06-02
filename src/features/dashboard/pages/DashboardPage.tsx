import { Grid } from '@mui/material';
import { MetricCard } from '../../../components/MetricCard';
import { PageHeader } from '../../../components/PageHeader';

const metrics = [
  { label: 'Employees', value: 250 },
  { label: 'Projects', value: 40 },
  { label: 'Billable', value: 180 },
  { label: 'Bench', value: 70 },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Workforce and delivery overview." />
      <Grid container spacing={2}>
        {metrics.map((metric) => (
          <Grid key={metric.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard label={metric.label} value={metric.value} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
