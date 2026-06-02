import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type { Role } from '../types/role';

interface DeleteRoleDialogProps {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteRoleDialog({ open, role, onClose, onConfirm }: DeleteRoleDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={open}>
      <DialogTitle>Delete role</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {role ? `Delete ${role.roleName}? This action cannot be undone.` : 'Delete this role?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
