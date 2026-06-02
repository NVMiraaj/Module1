import { Card, CardContent, Typography } from '@mui/material';
import { PageHeader } from './PageHeader';

type ModulePlaceholderProps = {
  title: string;
  description: string;
};

export function ModulePlaceholder({ title, description }: ModulePlaceholderProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Card variant="outlined">
        <CardContent>
          <Typography color="text.secondary">
            This feature route is ready for module-specific components, services, and state.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
