export type RoleStatus = 'Active' | 'Inactive';

export interface Role {
  id: number;
  roleCode: string;
  roleName: string;
  description: string;
  permissions: string[];
  status: RoleStatus;
}

export type RoleFormValues = Omit<Role, 'id'>;
