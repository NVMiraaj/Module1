import { Box, CircularProgress } from '@mui/material';

export function LoadingFallback() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <CircularProgress aria-label="Loading page" />
    </Box>
  );
}
