import { makeObservable, observable } from 'mobx';

export class MonthlyOutputEntity {
    id: number;
    working_hours: number;
    sick_hours: number;
    vacation_hours: number;
    start_date: string;
    end_date: string;
    effectivity: number;
    overtime: number;
    employeeID: number; //Entity

    constructor() {
        makeObservable(this, {
            id: observable,
            working_hours: observable,
            sick_hours: observable,
            vacation_hours: observable,
            start_date: observable,
            end_date: observable,
            effectivity: observable,
            overtime: observable,
            employeeID: observable,
        });
    }
}
