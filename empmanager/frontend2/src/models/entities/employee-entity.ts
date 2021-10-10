import { makeObservable, observable } from 'mobx';
import { WorkingCategoryEnum } from '../enums/working-category-enum';
import { CompanyEntity } from './company-entity';

export class EmployeeEntity {
    public id: number;
    public first_name: string;
    public last_name: string;
    public email: string;
    public phone: number;
    public health_limitations: string;
    public active: boolean;
    public working_category: WorkingCategoryEnum;
    public med_exam_date: Date;
    public job_assign_date: Date;
    public company: CompanyEntity | null;

    constructor() {
        makeObservable(this, {
            id: observable,
            first_name: observable,
            last_name: observable,
            email: observable,
            phone: observable,
            health_limitations: observable,
            active: observable,
            working_category: observable,
            med_exam_date: observable,
            job_assign_date: observable,
            company: observable,
        });
    }
}
