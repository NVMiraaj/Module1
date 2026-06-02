import { Outlet, NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { logout } from '../store/store';
import { useAppDispatch } from '../store/hooks';

const drawerWidth = 248;

const navigation = [
  { label: 'Dashboard', path: '/' },
  { label: 'Employees', path: '/employees' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skill Matrix', path: '/skill-matrix' },
  { label: 'Resource Allocation', path: '/resource-allocation' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' },
];

export function AppLayout() {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            HRMS
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List component="nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === '/'}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemText-secondary': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          ml: `${drawerWidth}px`,
          minHeight: '100vh',
          p: 3,
          pt: 11,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
