import { makeObservable, observable } from 'mobx';
import { EmployeeEntity } from './employee-entity';

export class SearchableEmployeeEntity {
    employee: EmployeeEntity;
    value: string;
    label: JSX.Element;

    constructor() {
        makeObservable(this, {
            employee: observable,
            value: observable,
            label: observable,
        });
    }
}
