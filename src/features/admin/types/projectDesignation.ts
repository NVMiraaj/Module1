export interface ProjectDesignation {
  id: number;
  projectId: number;
  chargeCode: string;
  roleId: number;
  perHourCharge: number;
}

export type ProjectDesignationFormValues = Omit<ProjectDesignation, 'id'>;
