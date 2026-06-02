import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ProjectDesignationForm from './ProjectDesignationForm';
import type {
  ProjectDesignation,
  ProjectDesignationFormValues,
} from '../types/projectDesignation';

interface ProjectDesignationDialogProps {
  item: ProjectDesignation | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ProjectDesignationFormValues) => void;
}

export default function ProjectDesignationDialog({
  item,
  open,
  onClose,
  onSubmit,
}: ProjectDesignationDialogProps) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>{item ? 'Edit project designation' : 'Add project designation'}</DialogTitle>
      <DialogContent>
        <ProjectDesignationForm item={item} onCancel={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
