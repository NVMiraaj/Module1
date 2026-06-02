import { Box, Typography } from '@mui/material';

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {description ? (
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
