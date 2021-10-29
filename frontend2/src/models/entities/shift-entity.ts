import { EmployeeEntity } from './employee-entity';
import { makeObservable, observable } from 'mobx';
import { CompanyEntity } from './company-entity';

export class ShiftEntity {
    id: number;
    date: string; //TODO date type
    time: string; //TODO create Enum
    company: number; //CompanyEntity
    employees: number[]; //EmployeeEntity[]

    constructor() {
        makeObservable(this, {
            id: observable,
            date: observable,
            time: observable,
            company: observable,
            employees: observable,
        });
    }
}
