import { Card, CardContent, Typography } from '@mui/material';

type MetricCardProps = {
  label: string;
  value: string | number;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {label}
        </Typography>
        <Typography variant="h4" component="p" sx={{ mt: 1, fontWeight: 700 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
