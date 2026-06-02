
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import type { Employee, EmployeeFormValues, EmployeeStatus } from '../types/employee';

const statusOptions: EmployeeStatus[] = ['Active', 'Inactive', 'On Leave'];
const departmentOptions = [
  'Application Development',
  'Cloud Services',
  'Cybersecurity',
  'Data & Analytics',
  'DevOps',
  'Enterprise Applications',
  'IT Support',
  'Product Engineering',
  'Project Management',
  'Quality Assurance',
  'UI/UX Design',
] as const;
const designationOptions = [
  'Associate Software Engineer',
  'Software Engineer',
  'Senior Software Engineer',
  'Technical Lead',
  'Solution Architect',
  'DevOps Engineer',
  'Cloud Engineer',
  'QA Engineer',
  'Automation Test Engineer',
  'Business Analyst',
  'Scrum Master',
  'Project Manager',
  'UI/UX Designer',
  'Data Analyst',
  'Support Engineer',
] as const;

const getSchema = (roleIds: number[]): yup.ObjectSchema<EmployeeFormValues> =>
  yup.object({
    employeeCode: yup.string().trim().required('Employee code is required').max(20, 'Use 20 characters or fewer'),
    firstName: yup.string().trim().required('First name is required').max(50, 'Use 50 characters or fewer'),
    lastName: yup.string().trim().required('Last name is required').max(50, 'Use 50 characters or fewer'),
    email: yup.string().trim().email('Enter a valid email').required('Email is required'),
    phone: yup.string().trim().required('Phone is required').max(24, 'Use 24 characters or fewer'),
    department: yup.string().oneOf([...departmentOptions], 'Select a valid department').required('Department is required'),
    designation: yup
      .string()
      .oneOf([...designationOptions], 'Select a valid designation')
      .required('Designation is required'),
    roleId: yup.number().oneOf(roleIds, 'Select a valid role').required('Role is required'),
    skillIds: yup.array().of(yup.number().required()).required(),
    experience: yup
      .number()
      .typeError('Experience is required')
      .min(0, 'Experience cannot be negative')
      .max(50, 'Experience looks too high')
      .required('Experience is required'),
    joiningDate: yup.string().required('Joining date is required'),
    status: yup.mixed<EmployeeStatus>().oneOf(statusOptions).required('Status is required'),
  });

const getEmptyValues = (roleId: number): EmployeeFormValues => ({
  employeeCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: 'Application Development',
  designation: 'Software Engineer',
  roleId,
  skillIds: [],
  experience: 0,
  joiningDate: new Date().toISOString().slice(0, 10),
  status: 'Active',
});

interface EmployeeFormProps {
  employee?: Employee | null;
  onCancel: () => void;
  onSubmit: (values: EmployeeFormValues) => Promise<void> | void;
}

export default function EmployeeForm({ employee, onCancel, onSubmit }: EmployeeFormProps) {
  const skills = useAppSelector((state) => state.skills.skills);
  const roles = useAppSelector((state) => state.roles.roles);
  const activeRoles = useMemo(() => roles.filter((role) => role.status === 'Active'), [roles]);
  const roleIds = useMemo(() => activeRoles.map((role) => role.id), [activeRoles]);
  const defaultRoleId = activeRoles.find((role) => role.roleName === 'Software Engineer')?.id ?? activeRoles[0]?.id ?? 0;
  const schema = useMemo(() => getSchema(roleIds), [roleIds]);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<EmployeeFormValues>({
    defaultValues: employee ? { ...employee } : getEmptyValues(defaultRoleId),
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="employeeCode"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.employeeCode)}
                fullWidth
                helperText={errors.employeeCode?.message}
                label="Employee Code"
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.firstName)}
                fullWidth
                helperText={errors.firstName?.message}
                label="First Name"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.lastName)}
                fullWidth
                helperText={errors.lastName?.message}
                label="Last Name"
              />
            )}
          />
        </Stack>

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.email)}
              fullWidth
              helperText={errors.email?.message}
              label="Email"
              type="email"
            />
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.phone)}
                fullWidth
                helperText={errors.phone?.message}
                label="Phone"
              />
            )}
          />
          <Controller
            control={control}
            name="joiningDate"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.joiningDate)}
                fullWidth
                helperText={errors.joiningDate?.message}
                label="Joining Date"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="department"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.department)}
                fullWidth
                helperText={errors.department?.message}
                label="Department"
                select
              >
                {departmentOptions.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="designation"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.designation)}
                fullWidth
                helperText={errors.designation?.message}
                label="Designation"
                select
              >
                {designationOptions.map((designation) => (
                  <MenuItem key={designation} value={designation}>
                    {designation}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            control={control}
            name="roleId"
            render={({ field }) => (
              <TextField
                error={Boolean(errors.roleId)}
                fullWidth
                helperText={errors.roleId?.message}
                label="Role"
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
          <Controller
            control={control}
            name="experience"
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.experience)}
                fullWidth
                helperText={errors.experience?.message}
                label="Experience"
                onChange={(event) => field.onChange(Number(event.target.value))}
                type="number"
              />
            )}
          />
        </Stack>

        <Controller
          control={control}
          name="skillIds"
          render={({ field }) => (
            <Autocomplete
              getOptionLabel={(option) => option.skillName}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              multiple
              onChange={(_event, value) => field.onChange(value.map((skill) => skill.id))}
              options={skills}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors.skillIds)}
                  helperText={errors.skillIds?.message}
                  label="Skills"
                />
              )}
              value={skills.filter((skill) => field.value.includes(skill.id))}
            />
          )}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit" variant="contained">
            Save Employee
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
