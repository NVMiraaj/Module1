import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { Project } from '../../projects/types/project.types';
import type { Role } from '../types/role';
import type { ProjectDesignation } from '../types/projectDesignation';

interface ProjectDesignationTableProps {
  items: ProjectDesignation[];
  projects: Project[];
  roles: Role[];
  onDelete: (item: ProjectDesignation) => void;
  onEdit: (item: ProjectDesignation) => void;
}

export default function ProjectDesignationTable({
  items,
  projects,
  roles,
  onDelete,
  onEdit,
}: ProjectDesignationTableProps) {
  const projectById = new Map(projects.map((project) => [project.id, project]));
  const roleNameById = new Map(roles.map((role) => [role.id, role.roleName]));

  const columns: GridColDef<ProjectDesignation>[] = [
    {
      field: 'projectId',
      headerName: 'Project',
      minWidth: 240,
      flex: 1.3,
      valueGetter: (_value, row) => {
        const project = projectById.get(row.projectId);
        return project ? `${project.projectCode} - ${project.projectName}` : 'Unassigned';
      },
    },
    { field: 'chargeCode', headerName: 'Charge Code', minWidth: 150, flex: 0.8 },
    {
      field: 'roleId',
      headerName: 'Designation',
      minWidth: 200,
      flex: 1,
      valueGetter: (_value, row) => roleNameById.get(row.roleId) ?? 'Unassigned',
    },
    {
      field: 'perHourCharge',
      headerName: 'Per Hour Charge',
      align: 'right',
      flex: 0.8,
      headerAlign: 'right',
      minWidth: 150,
      type: 'number',
      valueFormatter: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 110,
      getActions: ({ row }) => [
        <GridActionsCellItem icon={<EditOutlinedIcon />} key="edit" label="Edit" onClick={() => onEdit(row)} />,
        <GridActionsCellItem
          icon={<DeleteOutlinedIcon />}
          key="delete"
          label="Delete"
          onClick={() => onDelete(row)}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: 460, width: '100%' }}>
      <DataGrid
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'chargeCode', sort: 'asc' }],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        rows={items}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'background.default',
          },
        }}
      />
    </Box>
  );
}
