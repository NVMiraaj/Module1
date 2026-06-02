import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, Button, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import PageContainer from '../../../components/common/PageContainer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import DeleteProjectDesignationDialog from '../components/DeleteProjectDesignationDialog';
import ProjectDesignationDialog from '../components/ProjectDesignationDialog';
import ProjectDesignationTable from '../components/ProjectDesignationTable';
import {
  createProjectDesignation,
  deleteProjectDesignation,
  setProjectDesignationSearch,
  updateProjectDesignation,
} from '../store/projectDesignationSlice';
import type {
  ProjectDesignation,
  ProjectDesignationFormValues,
} from '../types/projectDesignation';

export default function ProjectDesignationList() {
  const dispatch = useAppDispatch();
  const { filters, projectDesignations } = useAppSelector((state) => state.projectDesignations);
  const projects = useAppSelector((state) => state.projects.projects);
  const roles = useAppSelector((state) => state.roles.roles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProjectDesignation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectDesignation | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const filteredItems = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const projectById = new Map(projects.map((project) => [project.id, project]));
    const roleNameById = new Map(roles.map((role) => [role.id, role.roleName]));

    return projectDesignations.filter((item) => {
      const project = projectById.get(item.projectId);
      const searchable = [
        item.chargeCode,
        item.perHourCharge.toString(),
        project?.projectCode ?? '',
        project?.projectName ?? '',
        roleNameById.get(item.roleId) ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return !search || searchable.includes(search);
    });
  }, [filters.search, projectDesignations, projects, roles]);

  const handleAdd = () => {
    setSelectedItem(null);
    setDialogOpen(true);
  };

  const handleSubmit = (values: ProjectDesignationFormValues) => {
    if (selectedItem) {
      dispatch(updateProjectDesignation({ id: selectedItem.id, ...values }));
      setSnackbarMessage('Project designation updated successfully.');
    } else {
      dispatch(createProjectDesignation(values));
      setSnackbarMessage('Project designation created successfully.');
    }

    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) {
      return;
    }

    dispatch(deleteProjectDesignation(deleteTarget.id));
    setDeleteTarget(null);
    setSnackbarMessage('Project designation deleted successfully.');
  };

  return (
    <PageContainer title="Project Designation">
      <Stack spacing={2.5}>
        <Stack
          alignItems={{ xs: 'stretch', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography color="text.primary" fontWeight={700} variant="h6">
              Project charge codes
            </Typography>
            <Typography variant="body2">
              {filteredItems.length} of {projectDesignations.length} designation records
            </Typography>
          </Box>
          <Button onClick={handleAdd} startIcon={<AddIcon />} variant="contained">
            Add Project Designation
          </Button>
        </Stack>

        <TextField
          fullWidth
          onChange={(event) => dispatch(setProjectDesignationSearch(event.target.value))}
          placeholder="Search project, designation, charge code, or hourly charge"
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

        <ProjectDesignationTable
          items={filteredItems}
          onDelete={setDeleteTarget}
          onEdit={(item) => {
            setSelectedItem(item);
            setDialogOpen(true);
          }}
          projects={projects}
          roles={roles}
        />
      </Stack>

      <ProjectDesignationDialog
        item={selectedItem}
        onClose={() => {
          setDialogOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
        open={dialogOpen}
      />
      <DeleteProjectDesignationDialog
        item={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        open={Boolean(deleteTarget)}
      />
      <Snackbar autoHideDuration={3000} onClose={() => setSnackbarMessage('')} open={Boolean(snackbarMessage)}>
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
