import { Chip } from '@mui/material';
import type { RoleStatus } from '../types/role';

export default function RoleStatusChip({ status }: { status: RoleStatus }) {
  return <Chip color={status === 'Active' ? 'success' : 'default'} label={status} size="small" variant="outlined" />;
}
