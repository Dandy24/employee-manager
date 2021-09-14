import { WorkingCategoryEnum } from '../enums/working-category-enum';
import { CompanyEntity } from '../entities/company-entity';

export class EmployeeDto {
    public first_name: string;
    public last_name: string;
    public email: string;
    public phone: number;
    public health_limitations: string;
    public active: boolean;
    public working_category: WorkingCategoryEnum;
    public med_exam_date: string;
    public job_assign_date: string;
    public company: CompanyEntity | null;
}
