import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Chip, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import RoleStatusChip from './RoleStatusChip';
import type { Role } from '../types/role';

interface RoleTableProps {
  roles: Role[];
  onDelete: (role: Role) => void;
  onEdit: (role: Role) => void;
}

export default function RoleTable({ roles, onDelete, onEdit }: RoleTableProps) {
  const columns: GridColDef<Role>[] = [
    { field: 'roleCode', headerName: 'Role Code', minWidth: 140, flex: 0.8 },
    { field: 'roleName', headerName: 'Role Name', minWidth: 180, flex: 1 },
    {
      field: 'permissions',
      headerName: 'Permissions',
      minWidth: 280,
      flex: 1.5,
      sortable: false,
      valueGetter: (value: string[]) => value.join(', '),
      renderCell: ({ row }) => {
        const visiblePermissions = row.permissions.slice(0, 2);

        return (
          <Box alignItems="center" display="flex" flexWrap="wrap" gap={0.5} sx={{ py: 0.5 }}>
            {visiblePermissions.map((permission) => (
              <Chip key={permission} label={permission} size="small" />
            ))}
            {row.permissions.length > visiblePermissions.length ? (
              <Chip label={`+${row.permissions.length - visiblePermissions.length}`} size="small" variant="outlined" />
            ) : null}
          </Box>
        );
      },
    },
    { field: 'description', headerName: 'Description', minWidth: 260, flex: 1.4 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      flex: 0.7,
      renderCell: ({ row }) => <RoleStatusChip status={row.status} />,
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
    <Stack sx={{ minHeight: 460, width: '100%' }}>
      <DataGrid
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'roleCode', sort: 'asc' }],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        rows={roles}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'background.default',
          },
        }}
      />
    </Stack>
  );
}
