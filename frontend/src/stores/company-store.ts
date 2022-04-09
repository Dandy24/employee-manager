import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { createCompany, deleteCompany, getCompanyList, updateCompany } from '../api/apiCalls';
import { message } from 'antd';
import { CompanyEntity } from '../models/entities/company-entity';
import { CompanyDto } from '../models/dtos/company-dto';
import { SearchableCompanyEntity } from '../models/entities/searchable-company-entity';

import 'moment/locale/cs';
import moment from 'moment';

moment.locale('cs');

export class CompanyStore {
    companies: CompanyEntity[] = [];
    company: CompanyEntity;
    loadingCompanies = false;
    isEditOpen = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            company: observable,
            companies: observable,
            loadingCompanies: observable,
            isEditOpen: observable,

            getCompaniesFromStorage: action,

            fetchAllCompanies: action,
            closeModal: action,
            openToAdd: action,
            openToEdit: action,
            saveCompany: action,
            updateCompany: action,
            deleteCompany: action,
        });
    }

    getCompaniesFromStorage(): void {
        this.companies.push(JSON.parse(localStorage.getItem('company')));
    }

    // FIXME proc se tady neposila string na BE a tam se nepouziva filter (WHERE atd.)
    async fetchAllCompanies(filter?: string, selected?: SearchableCompanyEntity): Promise<void> {
        runInAction(() => {
            this.loadingCompanies = true;
            this.companies = [];
        });

        try {
            const companies = await getCompanyList();

            let filteredCompanies;

            if (filter) {
                filteredCompanies = companies.filter(
                    (comp) =>
                        filter.toLowerCase().includes(comp.name.toLowerCase()) ||
                        comp.name.toLowerCase().includes(filter.toLowerCase()) ||
                        filter.toLowerCase().includes(comp.address.toLowerCase()) ||
                        comp.address.toLowerCase().includes(filter.toLowerCase()) ||
                        filter.includes(comp.phone.toString()),
                );
            }

            if (selected?.company) {
                filteredCompanies = companies.filter(
                    (comp) => comp.name === selected.company.name || comp.address === selected.company.address,
                );
            }
            runInAction(() => {
                this.companies = filteredCompanies ? filteredCompanies : companies;
            });
        } catch (e) {
            message.error('Failed to load companies from database');
        } finally {
            runInAction(() => {
                this.loadingCompanies = false;
            });
        }
    }

    closeModal(): void {
        this.isEditOpen = false;
    }

    openToAdd(): void {
        runInAction(() => {
            this.isEditOpen = true;
            this.company = new CompanyEntity();
        });
    }

    openToEdit(company: CompanyEntity): void {
        const comp = this.companies.find((c) => c.id === company.id);
        this.isEditOpen = true;
        if (comp) {
            runInAction(() => {
                this.company = comp;
                if (this.company.profile_picture) {
                    this.company.profile_picture = `${
                        !this.company.profile_picture.includes('http://localhost:8000') ? 'http://localhost:8000' : ''
                    }${this.company.profile_picture.toString()}`;
                }
            });
        } else {
            throw new Error(`Spolecnost s ID ${company.id} nenalezena!`);
        }
    }

    async saveCompany(company: CompanyDto): Promise<void> {
        if (this.company.id) {
            try {
                const updatedCompany = await updateCompany(company, this.company.id);
                message.warning('Údaje o společnosti byly upraveny');
                if (updatedCompany) {
                    this.updateCompany(updatedCompany);
                }
                await this.fetchAllCompanies();
                runInAction(() => {
                    this.closeModal();
                });
            } catch (e) {
                message.error('Údaje o společnosti se nepodařilo upravit.');
                console.log(e);
            }
        } else {
            try {
                await createCompany(company);
                message.success('Spolecnost byla uspesne vytvorena');
                await this.fetchAllCompanies();
                runInAction(() => {
                    this.closeModal();
                });
            } catch (e) {
                message.error('Spolecnost se nepodarilo vytvorit');
                console.log(e);
            }
        }
    }

    async deleteCompany(company: CompanyEntity): Promise<void> {
        await deleteCompany(company.id).catch(() => {
            message.error('Firmu se nepodařilo smazat.');
        });
        runInAction(() => {
            this.loadingCompanies = true;
            message.success('Firma byla úspěšně smazána.');
        });
        await this.fetchAllCompanies();
        runInAction(() => {
            this.loadingCompanies = false;
        });
    }

    updateCompany(updatedCompany: CompanyEntity): void {
        runInAction(() => {
            const updatedCompanyIndex = this.companies.findIndex((company) => company.id === updatedCompany.id);
            if (updatedCompanyIndex !== -1) {
                this.companies[updatedCompanyIndex] = updatedCompany;
            }
        });
    }
}
