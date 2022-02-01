import { makeObservable, observable } from 'mobx';
import { CompanyEntity } from './company-entity';

export class SearchableCompanyEntity {
    company: CompanyEntity;
    value: string;
    label: JSX.Element;

    constructor() {
        makeObservable(this, {
            company: observable,
            value: observable,
            label: observable,
        });
    }
}
