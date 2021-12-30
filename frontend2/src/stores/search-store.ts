import { RootStore } from './root-store';
import { action, makeObservable, observable } from 'mobx';
import { SearchResultItem } from '../components/search/search-result';
import { SearchableCompanyEntity } from '../models/entities/searchable-company-entity';
import { SearchableEmployeeEntity } from '../models/entities/searchable-employee-entity';

export class SearchStore {
    searchableCompanies: SearchableCompanyEntity[]; // TODO Entity SearchableItem
    searchableEmployees: SearchableEmployeeEntity[]; // TODO Entity SearchableItem
    loading = false;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            searchableCompanies: observable,
            searchableEmployees: observable,
            loading: observable,

            createSearchableCompanies: action,
            setSearchableCompanies: action,
            createSearchableEmployees: action,
            setSearchableEmployees: action,
        });
    }

    setSearchableCompanies(companies: SearchableCompanyEntity[]): void {
        this.searchableCompanies = companies;
    }

    setSearchableEmployees(employees: SearchableEmployeeEntity[]): void {
        this.searchableEmployees = employees;
    }

    createSearchableCompanies = (): void => {
        const searchable = this.rootStore.companyStore.companies.map((company, index) => ({
            company,
            value: `${company.name} | ${company.phone} | ${company.address}`,
            label: SearchResultItem(company, index, this.rootStore),
            key: `company-${company.id}`,
        }));
        this.setSearchableCompanies(searchable);
    };

    createSearchableEmployees = (): void => {
        const searchable = this.rootStore.employeeStore.employees.map((employee, index) => ({
            employee,
            value: `${employee.first_name} ${employee.last_name} | ${employee.phone} | ${employee.company}`,
            label: SearchResultItem(employee, index, this.rootStore),
            key: `employee-${employee.id}`,
        }));
        this.setSearchableEmployees(searchable);
    };
}
