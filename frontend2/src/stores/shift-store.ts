import { RootStore } from './root-store';
import { action, makeObservable, observable, toJS } from 'mobx';
import { EmployeeEntity } from '../models/entities/employee-entity';
import { createShift } from '../api/apiCalls';
import { ShiftEntity } from '../models/entities/shift-entity';
import { ShiftDto } from '../models/dtos/shift-dto';
import moment from 'moment';

export class ShiftStore {
    employees: EmployeeEntity[] = [];
    shift: any[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employees: observable,
            shift: observable,

            addToShift: action,
            removeFromShift: action,
            clearShift: action,
            saveShift: action,

            setEmployees: action,
            addEmployee: action,
            removeEmployee: action,
        });

        this.employees = [...rootStore.employeeStore.employees];

        this.shift = [];
    }

    addToShift(employee: EmployeeEntity): void {
        this.shift.push(employee);
        console.log(this.shift);
    }

    removeFromShift(index: number): void {
        this.shift.splice(index, 1);
    }

    clearShift(): void {
        this.shift = [];
    }

    async saveShift(): Promise<void> {
        await this.rootStore.companyStore.fetchAllCompanies(); //TODO vyhodit to idealne a to radeji zkusit loadnout v useEffectu
        const shift = new ShiftDto();
        shift.time = 'ranni';
        shift.date = moment().format('YYYY-MM-DD');
        shift.company = toJS(this.rootStore.companyStore.companies.find((comp) => comp.id === 3).id);
        shift.employees = toJS(this.shift.map((shift) => shift.id));
        await createShift(shift);
        this.clearShift(); //TODO trigger this only if createShift was successfull (Exception wasnt thrown)
    }

    setEmployees(employees: EmployeeEntity[]): void {
        this.employees = employees;
    }

    addEmployee(employee: EmployeeEntity): void {
        this.employees.push(employee);
        console.log(this.employees);
    }

    removeEmployee(index: number): void {
        this.employees.splice(index, 1);
    }
}
