import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, Button, InputAdornment, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import PageContainer from '../../../components/common/PageContainer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import DeleteRoleDialog from '../components/DeleteRoleDialog';
import RoleDialog from '../components/RoleDialog';
import RoleTable from '../components/RoleTable';
import { createRole, deleteRole, setRoleSearch, setRoleStatusFilter, updateRole } from '../store/roleSlice';
import type { Role, RoleFormValues, RoleStatus } from '../types/role';

const statusFilters: Array<RoleStatus | 'All'> = ['All', 'Active', 'Inactive'];

export default function RoleList() {
  const dispatch = useAppDispatch();
  const { filters, roles } = useAppSelector((state) => state.roles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const filteredRoles = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return roles.filter((role) => {
      const matchesStatus = filters.status === 'All' || role.status === filters.status;
      const searchable = [role.roleCode, role.roleName, role.description, role.status, ...role.permissions]
        .join(' ')
        .toLowerCase();

      return matchesStatus && (!search || searchable.includes(search));
    });
  }, [filters.search, filters.status, roles]);

  const handleAdd = () => {
    setSelectedRole(null);
    setDialogOpen(true);
  };

  const handleSubmit = (values: RoleFormValues) => {
    if (selectedRole) {
      dispatch(updateRole({ id: selectedRole.id, ...values }));
      setSnackbarMessage('Role updated successfully.');
    } else {
      dispatch(createRole(values));
      setSnackbarMessage('Role created successfully.');
    }

    setDialogOpen(false);
    setSelectedRole(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) {
      return;
    }

    dispatch(deleteRole(deleteTarget.id));
    setDeleteTarget(null);
    setSnackbarMessage('Role deleted successfully.');
  };

  return (
    <PageContainer title="Role Management">
      <Stack spacing={2.5}>
        <Stack
          alignItems={{ xs: 'stretch', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography color="text.primary" fontWeight={700} variant="h6">
              Roles
            </Typography>
            <Typography variant="body2">
              {filteredRoles.length} of {roles.length} role records
            </Typography>
          </Box>
          <Button onClick={handleAdd} startIcon={<AddIcon />} variant="contained">
            Add Role
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            onChange={(event) => dispatch(setRoleSearch(event.target.value))}
            placeholder="Search roles"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            value={filters.search}
          />
          <TextField
            label="Status"
            onChange={(event) => dispatch(setRoleStatusFilter(event.target.value as RoleStatus | 'All'))}
            select
            sx={{ minWidth: { md: 180 } }}
            value={filters.status}
          >
            {statusFilters.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <RoleTable
          onDelete={setDeleteTarget}
          onEdit={(role) => {
            setSelectedRole(role);
            setDialogOpen(true);
          }}
          roles={filteredRoles}
        />
      </Stack>

      <RoleDialog
        onClose={() => {
          setDialogOpen(false);
          setSelectedRole(null);
        }}
        onSubmit={handleSubmit}
        open={dialogOpen}
        role={selectedRole}
      />
      <DeleteRoleDialog
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        open={Boolean(deleteTarget)}
        role={deleteTarget}
      />
      <Snackbar autoHideDuration={3000} onClose={() => setSnackbarMessage('')} open={Boolean(snackbarMessage)}>
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
