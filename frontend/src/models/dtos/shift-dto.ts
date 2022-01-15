import { ShiftTypeEnum } from '../enums/shift-type-enum';

export class ShiftDto {
    date: string; //TODO date type
    time: ShiftTypeEnum;
    companyID: number; //CompanyEntity
    employeeIDs: number[]; //EmployeeEntity[]
}
