import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function ForgotPasswordPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: 'grey.50' }}>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Forgot Password
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Enter your email to receive reset instructions.
            </Typography>
            <Stack component="form" spacing={2.5} sx={{ mt: 3 }}>
              <TextField fullWidth label="Email" name="email" type="email" autoComplete="email" />
              <Button type="submit" variant="contained" size="large" fullWidth>
                Send reset link
              </Button>
              <Link component={RouterLink} to="/login" align="center">
                Back to login
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
