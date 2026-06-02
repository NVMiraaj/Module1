import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import type { Employee } from '../types/employee';

interface EmployeeColumnHandlers {
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function getEmployeeColumns({ onEdit, onDelete }: EmployeeColumnHandlers): GridColDef<Employee>[] {
  return [
    { field: 'employeeCode', headerName: 'Code', minWidth: 120, flex: 0.7 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 180,
      flex: 1,
      valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: 'email', headerName: 'Email', minWidth: 220, flex: 1.2 },
    { field: 'department', headerName: 'Department', minWidth: 150, flex: 0.9 },
    { field: 'designation', headerName: 'Designation', minWidth: 190, flex: 1 },
    {
      field: 'experience',
      headerName: 'Exp.',
      align: 'right',
      headerAlign: 'right',
      minWidth: 90,
      type: 'number',
      valueFormatter: (value) => `${value} yrs`,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          color={row.status === 'Active' ? 'success' : row.status === 'On Leave' ? 'warning' : 'default'}
          label={row.status}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      width: 96,
      getActions: ({ row }) => [
        <GridActionsCellItem icon={<EditIcon />} key="edit" label="Edit" onClick={() => onEdit(row)} />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          key="delete"
          label="Delete"
          onClick={() => onDelete(row)}
          showInMenu
        />,
      ],
    },
  ];
}
