import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import RoleForm from './RoleForm';
import type { Role, RoleFormValues } from '../types/role';

interface RoleDialogProps {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSubmit: (values: RoleFormValues) => void;
}

export default function RoleDialog({ open, role, onClose, onSubmit }: RoleDialogProps) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>{role ? 'Edit role' : 'Add role'}</DialogTitle>
      <DialogContent>
        <RoleForm onCancel={onClose} onSubmit={onSubmit} role={role} />
      </DialogContent>
    </Dialog>
  );
}
