import { makeObservable, observable } from 'mobx';

export class ShiftEntity {
    id: number;
    date: string; //TODO date type
    time: string; //TODO create Enum
    companyID: number; //CompanyEntity
    employeeIDs: number[]; //EmployeeEntity[]

    constructor() {
        makeObservable(this, {
            id: observable,
            date: observable,
            time: observable,
            companyID: observable,
            employeeIDs: observable,
        });
    }
}
