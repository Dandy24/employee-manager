import { RootStore } from './root-store';
import { action, makeObservable, observable } from 'mobx';

export class ShiftStore {
    employees: any[];
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

    addToShift(employee: any[]): void {
        this.shift.push(employee);
        console.log(this.shift);
    }

    removeFromShift(index): void {
        this.shift.splice(index, 1);
    }

    setEmployees(employees: any[]): void {
        this.employees = employees;
    }

    addEmployee(employee: any[]): void {
        this.employees.push(employee);
        console.log(this.employees);
    }

    removeEmployee(index): void {
        this.employees.splice(index, 1);
    }
}
