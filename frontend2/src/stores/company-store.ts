import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { createCompany, deleteCompany, getCompanyList, updateCompany } from '../api/apiCalls';
import { message } from 'antd';
import { CompanyEntity } from '../models/entities/company-entity';
import { CompanyDto } from '../models/dtos/company-dto';
import { SearchableCompanyEntity } from '../models/entities/searchable-company-entity';

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

            fetchAllCompanies: action,
            closeModal: action,
            openToEdit: action,
            addCompany: action,
            editCompany: action,
            updateCompany: action,
            deleteCompany: action,
        });
    }

    async fetchAllCompanies(filter: SearchableCompanyEntity = null): Promise<void> {
        runInAction(() => {
            this.loadingCompanies = true;
            this.companies = [];
        });

        const companies = await getCompanyList();

        let filteredCompanies;

        if (filter?.company) {
            filteredCompanies = companies.filter(
                (comp) => comp.name === filter.company.name || comp.address === filter.company.address,
            );
        }

        runInAction(() => {
            this.loadingCompanies = false;
            this.companies = filteredCompanies ? filteredCompanies : companies;
        });
    }

    closeModal(): void {
        this.isEditOpen = false;
    }

    openToEdit(company: CompanyEntity): void {
        const comp = this.companies.find((c) => c.id === company.id);
        this.isEditOpen = true;
        if (comp) {
            runInAction(() => {
                this.company = comp;
            });
        } else {
            throw new Error(`Spolecnost s ID ${company.id} nenalezena!`);
        }
    }

    async editCompany(company: CompanyDto): Promise<void> {
        if (this.company.id) {
            const updatedCompany = await updateCompany(company, this.company.id)
                .then(() => {
                    message.warning('Údaje o společnosti byly upraveny');
                })
                .catch((error) => {
                    message.error('Údaje o společnosti se nepodařilo upravit.');
                    console.log(error);
                }); //TODO dat to ID pryc nejak
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (updatedCompany) {
                this.updateCompany(updatedCompany);
            }
            await this.fetchAllCompanies();
        }

        runInAction(() => {
            this.closeModal();
        });
    }

    async addCompany(company: CompanyDto): Promise<void> {
        await createCompany(company)
            .then(() => {
                message.success('Spolecnost byla uspesne vytvorena');
            })
            .catch((error) => {
                message.error('Spolecnost se nepodarilo vytvorit');
                console.log(error);
            });
        await this.fetchAllCompanies();
        runInAction(() => {
            this.closeModal();
        });
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
