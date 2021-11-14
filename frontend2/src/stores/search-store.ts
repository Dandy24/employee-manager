import { CompanyEntity } from '../models/entities/company-entity';
import { RootStore } from './root-store';
import { action, makeObservable, observable } from 'mobx';
import { SearchResultItem } from '../components/search/search-result';
import { SearchableCompanyEntity } from '../models/entities/searchable-company-entity';

export class SearchStore {
    searchableCompanies: SearchableCompanyEntity[]; // TODO Entity SearchableItem
    loading = false;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            searchableCompanies: observable,
            loading: observable,

            createSearchableCompanies: action,
            setSearchableCompanies: action,
        });
    }

    setSearchableCompanies(companies: SearchableCompanyEntity[]): void {
        this.searchableCompanies = companies;
    }

    createSearchableCompanies = (companies: CompanyEntity[]): void => {
        const searchable = companies.map((company, index) => ({
            company,
            value: company.name,
            label: SearchResultItem(company, index),
        }));
        this.setSearchableCompanies(searchable);
    };
}
