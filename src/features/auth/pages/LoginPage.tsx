import { FormEvent } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
import { login } from '../../../store/store';
import { useAppDispatch } from '../../../store/hooks';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(login());
    navigate(from, { replace: true });
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: 'grey.50' }}>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Login
            </Typography>
            <Stack component="form" spacing={2.5} sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <TextField fullWidth label="Email" name="email" type="email" autoComplete="email" />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
              <Button type="submit" variant="contained" size="large" fullWidth>
                Login
              </Button>
              <Link component={RouterLink} to="/forgot-password" align="center">
                Forgot password?
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
