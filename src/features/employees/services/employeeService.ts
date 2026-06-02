
import { employeeData } from '../mock/employeeData';
import type { Employee, EmployeeFormValues } from '../types/employee';

let employees: Employee[] = [...employeeData];
let nextId = Math.max(...employees.map((employee) => employee.id)) + 1;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, 250));

export const employeeService = {
  async getAll() {
    await wait();
    return [...employees];
  },

  async create(values: EmployeeFormValues) {
    await wait();
    const employee: Employee = {
      ...values,
      id: nextId,
    };

    nextId += 1;
    employees = [employee, ...employees];
    return employee;
  },

  async update(id: number, values: EmployeeFormValues) {
    await wait();
    const employee: Employee = { ...values, id };
    employees = employees.map((current) => (current.id === id ? employee : current));
    return employee;
  },

  async delete(id: number) {
    await wait();
    employees = employees.filter((employee) => employee.id !== id);
    return id;
  },
};
