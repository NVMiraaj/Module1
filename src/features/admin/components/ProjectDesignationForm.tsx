import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import type {
  ProjectDesignation,
  ProjectDesignationFormValues,
} from '../types/projectDesignation';

const getSchema = (
  projectIds: number[],
  roleIds: number[],
): yup.ObjectSchema<ProjectDesignationFormValues> =>
  yup.object({
    chargeCode: yup.string().trim().required('Charge code is required').max(32, 'Use 32 characters or fewer'),
    perHourCharge: yup
      .number()
      .typeError('Per hour charge is required')
      .min(0, 'Charge cannot be negative')
      .max(10000, 'Charge looks too high')
      .required('Per hour charge is required'),
    projectId: yup.number().oneOf(projectIds, 'Select a valid project').required('Project is required'),
    roleId: yup.number().oneOf(roleIds, 'Select a valid designation').required('Designation is required'),
  });

const getEmptyValues = (projectId: number, roleId: number): ProjectDesignationFormValues => ({
  chargeCode: '',
  perHourCharge: 0,
  projectId,
  roleId,
});

interface ProjectDesignationFormProps {
  item?: ProjectDesignation | null;
  onCancel: () => void;
  onSubmit: (values: ProjectDesignationFormValues) => void;
}

export default function ProjectDesignationForm({ item, onCancel, onSubmit }: ProjectDesignationFormProps) {
  const projects = useAppSelector((state) => state.projects.projects);
  const roles = useAppSelector((state) => state.roles.roles);
  const activeRoles = roles.filter((role) => role.status === 'Active');
  const projectIds = projects.map((project) => project.id);
  const roleIds = activeRoles.map((role) => role.id);
  const schema = getSchema(projectIds, roleIds);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProjectDesignationFormValues>({
    defaultValues: item ?? getEmptyValues(projectIds[0] ?? 0, roleIds[0] ?? 0),
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="projectId"
          render={({ field }) => (
            <TextField
              error={Boolean(errors.projectId)}
              fullWidth
              helperText={errors.projectId?.message}
              label="Project"
              onChange={(event) => field.onChange(Number(event.target.value))}
              select
              value={field.value}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.projectCode} - {project.projectName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="chargeCode"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.chargeCode)}
                fullWidth
                helperText={errors.chargeCode?.message}
                label="Charge Code"
              />
            )}
          />
          <Controller
            control={control}
            name="roleId"
            render={({ field }) => (
              <TextField
                error={Boolean(errors.roleId)}
                fullWidth
                helperText={errors.roleId?.message}
                label="Designation"
                onChange={(event) => field.onChange(Number(event.target.value))}
                select
                value={field.value}
              >
                {activeRoles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>

        <Controller
          control={control}
          name="perHourCharge"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.perHourCharge)}
              fullWidth
              helperText={errors.perHourCharge?.message}
              label="Per Hour Charge"
              onChange={(event) => field.onChange(Number(event.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
              type="number"
            />
          )}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
