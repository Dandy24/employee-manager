import { RootStore } from './root-store';
import { action, makeObservable, observable } from 'mobx';
import { EmployeeEntity } from '../models/entities/employee-entity';

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
