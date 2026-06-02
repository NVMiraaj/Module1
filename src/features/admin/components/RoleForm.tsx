import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import type { Role, RoleFormValues, RoleStatus } from '../types/role';

const permissionOptions = [
  'Dashboard View',
  'User Management',
  'Role Management',
  'Role View',
  'Employee Management',
  'Project Management',
  'Skills Management',
  'Resource Allocation',
  'Reports',
  'Settings',
] as const;

const statusOptions: RoleStatus[] = ['Active', 'Inactive'];

const schema: yup.ObjectSchema<RoleFormValues> = yup.object({
  description: yup.string().trim().required('Description is required').max(180, 'Use 180 characters or fewer'),
  permissions: yup.array().of(yup.string().required()).min(1, 'Select at least one permission').required(),
  roleCode: yup.string().trim().required('Role code is required').max(24, 'Use 24 characters or fewer'),
  roleName: yup.string().trim().required('Role name is required').max(60, 'Use 60 characters or fewer'),
  status: yup.mixed<RoleStatus>().oneOf(statusOptions).required('Status is required'),
});

const emptyValues: RoleFormValues = {
  description: '',
  permissions: [],
  roleCode: '',
  roleName: '',
  status: 'Active',
};

interface RoleFormProps {
  role?: Role | null;
  onCancel: () => void;
  onSubmit: (values: RoleFormValues) => void;
}

export default function RoleForm({ role, onCancel, onSubmit }: RoleFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RoleFormValues>({
    defaultValues: role ? { ...role } : emptyValues,
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="roleCode"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.roleCode)}
                fullWidth
                helperText={errors.roleCode?.message}
                label="Role Code"
              />
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.status)}
                fullWidth
                helperText={errors.status?.message}
                label="Status"
                select
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>

        <Controller
          control={control}
          name="roleName"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.roleName)}
              fullWidth
              helperText={errors.roleName?.message}
              label="Role Name"
            />
          )}
        />

        <Controller
          control={control}
          name="permissions"
          render={({ field }) => (
            <Autocomplete
              multiple
              onChange={(_event, value) => field.onChange(value)}
              options={[...permissionOptions]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors.permissions)}
                  helperText={errors.permissions?.message}
                  label="Permissions"
                />
              )}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.description)}
              fullWidth
              helperText={errors.description?.message}
              label="Description"
              minRows={3}
              multiline
            />
          )}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit" variant="contained">
            Save Role
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
