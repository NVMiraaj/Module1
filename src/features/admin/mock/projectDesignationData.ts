import type { ProjectDesignation } from '../types/projectDesignation';

export const projectDesignationData: ProjectDesignation[] = [
  {
    id: 1,
    projectId: 1,
    chargeCode: 'HRMS-TL-001',
    roleId: 4,
    perHourCharge: 95,
  },
  {
    id: 2,
    projectId: 1,
    chargeCode: 'HRMS-SE-002',
    roleId: 2,
    perHourCharge: 62,
  },
  {
    id: 3,
    projectId: 2,
    chargeCode: 'CRM-SSE-001',
    roleId: 3,
    perHourCharge: 78,
  },
  {
    id: 4,
    projectId: 4,
    chargeCode: 'BANK-ARCH-001',
    roleId: 5,
    perHourCharge: 120,
  },
];
