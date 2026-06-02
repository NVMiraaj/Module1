import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type { ProjectDesignation } from '../types/projectDesignation';

interface DeleteProjectDesignationDialogProps {
  item: ProjectDesignation | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectDesignationDialog({
  item,
  open,
  onClose,
  onConfirm,
}: DeleteProjectDesignationDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={open}>
      <DialogTitle>Delete project designation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {item ? `Delete charge code ${item.chargeCode}? This action cannot be undone.` : 'Delete this record?'}
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
