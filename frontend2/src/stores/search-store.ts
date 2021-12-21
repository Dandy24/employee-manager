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

    createSearchableCompanies = (): void => {
        const searchable = this.rootStore.companyStore.companies.map((company, index) => ({
            company,
            value: `${company.name} | ${company.phone} | ${company.address}`,
            label: SearchResultItem(company, index),
            key: `company-${company.id}`,
        }));
        this.setSearchableCompanies(searchable);
    };
}
