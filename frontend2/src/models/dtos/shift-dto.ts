import { EmployeeEntity } from '../entities/employee-entity';
import { CompanyEntity } from '../entities/company-entity';

export class ShiftDto {
    date: string; //TODO date type
    time: string; //TODO create Enum
    company: number; //CompanyEntity
    employees: number[]; //EmployeeEntity[]
}
