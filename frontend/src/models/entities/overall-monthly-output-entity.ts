import { makeObservable, observable } from 'mobx';

export class OverallMonthlyOutputEntity {
    id: number;
    working_hours: number; //FixME django rest returns decimals as string in JSON
    sick_hours: number; //FIXME find a way to store it as a number type
    vacation_hours: number;
    start_date: string;
    end_date: string;
    effectivity: number;
    housing_capacity: number;
    // overtime: number;
    // employeeID: number; //Entity

    constructor() {
        makeObservable(this, {
            id: observable,
            working_hours: observable,
            sick_hours: observable,
            vacation_hours: observable,
            start_date: observable,
            end_date: observable,
            effectivity: observable,
            housing_capacity: observable,
        });
    }
}
