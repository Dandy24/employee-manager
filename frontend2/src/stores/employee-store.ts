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

export class EmployeeStore {
    employees: EmployeeEntity[] = [];
    employee: any = {};
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
            openToEdit: action,
            addEmployee: action,
            editEmployee: action,
            deleteEmployee: action,
        });
    }

    async fetchAllEmployees(companyId: number = null, shiftId: number = null): Promise<void> {
        runInAction(() => {
            this.loadingEmployees = true;
            this.employees = [];
        });
        if (companyId) {
            await getEmployeeListForCompany(companyId).then((data) =>
                runInAction(() => {
                    this.employees = data;
                }),
            );
        } else {
            await getEmployeeList().then((data) =>
                runInAction(() => {
                    this.employees = data;
                }),
            );
        }

        runInAction(() => {
            this.loadingEmployees = false;
        });
    }

    closeModal(): void {
        this.isEditOpen = false;
    }

    openToEdit(employee: EmployeeEntity): void {
        //console.log(employee);
        const emp = this.employees.find((e) => e.id === employee.id);
        this.isEditOpen = true;
        if (emp) {
            runInAction(() => {
                this.employee = emp;
            });
        } else {
            throw new Error(`Zamestnanec s ID ${employee.id} nenalezen!`);
        }
    }

    async editEmployee(employee: EmployeeDto): Promise<void> {
        if (this.employee.id) {
            await updateEmployee(this.employee.id, employee) //TODO dat to ID pryc nejak
                .then(() => {
                    message.warning('Udaje o zamestnanci byly upraveny');
                })
                .catch((error) => {
                    console.log(error);
                    message.error('Nepodařilo se upravit zaměstnance');
                });
        }
        await this.fetchAllEmployees();
        runInAction(() => {
            this.closeModal();
        });
    }

    async addEmployee(employee: EmployeeDto): Promise<void> {
        await createEmployee(employee)
            .then(() => {
                message.success('Zaměstnanec byl úspěšně přidán');
            })
            .catch((error) => {
                console.log(error);
                message.error('Nepodařilo se vytvorit zaměstnance');
            });
        await this.fetchAllEmployees();
        runInAction(() => {
            this.closeModal();
        });
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
