import { CompanyEntity } from '../models/entities/company-entity';
import { RootStore } from './root-store';
import { action, makeObservable, observable } from 'mobx';
import { SearchResultItem } from '../components/search/search-result';
import React from 'react';

export class SearchStore {
    searchableCompanies: any; // TODO Entity SearchableItem
    searchableEmployees: any;
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
        });
    }

    setSearchableCompanies(companies: CompanyEntity[]): void {
        this.searchableCompanies = companies;
    }

    createSearchableCompanies = (companies: CompanyEntity[]): void => {
        const searchable = companies.map((company) => ({
            ...company,
            value: company.name,
            label: SearchResultItem(company),
        }));
        this.setSearchableCompanies(searchable);
    };
}
