import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import {
    createEmployee,
    deleteEmployee,
    getEmployeeList,
    getEmployeeListForCompany,
    updateEmployee,
} from '../api/apiCalls';
import { message } from 'antd';
import { EmployeeDto } from '../models/dtos/employee-dto';
import { EmployeeEntity } from '../models/entities/employee-entity';
import { SearchableEmployeeEntity } from '../models/entities/searchable-employee-entity';

export class EmployeeStore {
    employees: EmployeeEntity[] = [];
    employee: EmployeeEntity;
    loadingEmployees = false;
    isEditOpen = false;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employees: observable,
            employee: observable,
            loadingEmployees: observable,
            isEditOpen: observable,

            fetchAllEmployees: action,
            closeModal: action,
            openToAdd: action,
            openToEdit: action,
            saveEmployee: action,
            deleteEmployee: action,
        });
    }

    async fetchAllEmployees(
        companyId: number = null,
        filter?: string,
        selected?: SearchableEmployeeEntity | number,
    ): Promise<void> {
        runInAction(() => {
            this.loadingEmployees = true;
            this.employees = [];
        });

        try {
            const employees = await getEmployeeList();

            let selectedEmployee;

            if (companyId) {
                await getEmployeeListForCompany(companyId).then((data) =>
                    runInAction(() => {
                        this.employees = data;
                    }),
                );
            } else {
                if (typeof selected !== 'number' && selected?.employee) {
                    selectedEmployee = employees.find((emp) => emp.id === selected.employee.id);
                } else {
                    selectedEmployee = employees.find((emp) => emp.id === selected);
                }

                runInAction(() => {
                    this.employees = employees;
                    this.employee = selectedEmployee ? selectedEmployee : null;
                });
                console.log(this.employees);
            }
        } catch (e) {
            message.error('Failed to load employees from database');
        } finally {
            runInAction(() => {
                this.loadingEmployees = false;
            });
        }
    }

    closeModal(): void {
        this.isEditOpen = false;
    }

    openToAdd(): void {
        runInAction(() => {
            this.employee = new EmployeeEntity();
            this.isEditOpen = true;
        });
    }

    async openToEdit(employee: EmployeeEntity): Promise<void> {
        const emp = this.employees.find((e) => e.id === employee.id);
        this.isEditOpen = true;
        if (emp) {
            await runInAction(async () => {
                this.employee = emp;
                if (this.employee.attachment) {
                    this.employee.attachment = `${
                        !this.employee.attachment.includes('http://localhost:8000') ? 'http://localhost:8000' : ''
                    }${this.employee.attachment.toString()}`;
                }
                if (this.employee.profile_picture) {
                    this.employee.profile_picture = `${
                        !this.employee.profile_picture.includes('http://localhost:8000') ? 'http://localhost:8000' : ''
                    }${this.employee.profile_picture.toString()}`;
                }
            });
        } else {
            throw new Error(`Zamestnanec s ID ${employee.id} nenalezen!`);
        }
    }

    async saveEmployee(employee: EmployeeDto): Promise<void> {
        if (this.employee.id) {
            try {
                // const updatedEmployee = await updateEmployee(this.employee.id, employee);
                await updateEmployee(this.employee.id, employee);
                message.warning('Udaje o zamestnanci byly upraveny');
                await this.fetchAllEmployees();
                runInAction(() => {
                    this.closeModal();
                });
            } catch (e) {
                console.log(e);
                message.error('Nepodařilo se upravit zaměstnance');
            }
        } else {
            try {
                await createEmployee(employee);
                message.success('Zaměstnanec byl úspěšně přidán');
                await this.fetchAllEmployees();
                runInAction(() => {
                    this.closeModal();
                });
            } catch (e) {
                console.log(e);
                message.error('Nepodařilo se vytvorit zaměstnance');
            }
        }
    }

    async deleteEmployee(id: number): Promise<void> {
        await deleteEmployee(id);
        runInAction(() => {
            this.loadingEmployees = true;
            message.success('Zamestnanec byl úspěšně smazán.');
        });
        await this.fetchAllEmployees();
        runInAction(() => {
            this.loadingEmployees = false;
        });
    }
}
