import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';

export class ShiftStore {
    employees: any[];
    shift: any[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employees: observable,
            shift: observable,

            setEmployees: action,
            addToShift: action,
            removeEmployee: action,
        });

        this.employees = [
            {
                id: 1,
                col1: 'Hello',
                col2: 'World',
            },
            {
                id: 2,
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                id: 3,
                col1: 'whatever',
                col2: 'you want',
            },
        ];

        this.shift = [];
    }

    setEmployees(employees: any[]): void {
        this.employees = employees;
    }

    addToShift(employee: any[]): void {
        this.shift.push(employee);
        console.log(this.shift);
    }

    removeEmployee(index): void {
        this.employees.splice(index, 1);
    }
}
