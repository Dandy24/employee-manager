import { makeObservable, observable } from 'mobx';
import { ShiftTypeEnum } from '../enums/shift-type-enum';

export class ShiftEntity {
    id: number;
    date: string; //TODO date type
    time: ShiftTypeEnum;
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
