import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { createCompany, deleteCompany, getCompanyList, updateCompany } from '../api/apiCalls';
import { message } from 'antd';
import { CompanyEntity } from '../models/entities/company-entity';

export class CompanyStore {
    companies: any[] = []; //TODO type  Employee[]
    company: any = {};
    loadingCompanies = false;
    isEditOpen = false;
    private rootStore: RootStore;

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

    async fetchAllCompanies(): Promise<void> {
        runInAction(() => {
            this.loadingCompanies = true;
            this.companies = [];
        });
        await getCompanyList().then((data) => (this.companies = data));
        runInAction(() => {
            this.loadingCompanies = false;
        });
    }

    closeModal(): void {
        this.isEditOpen = false;
    }

    openToAdd() {
        //TODO
    }

    openToEdit(company: any): void {
        const comp = this.companies.find((c) => c.id === company.id);
        this.isEditOpen = true;
        if (comp) {
            this.company = comp;
        } else {
            throw new Error(`Spolecnost s ID ${company.id} nenalezena!`);
        }
    }

    async editCompany(company: any): Promise<void> {
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

    async addCompany(company: any): Promise<void> {
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

    async deleteCompany(company: any): Promise<void> {
        //TODO type
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

    updateCompany(updatedCompany: any): void {
        runInAction(() => {
            const updatedCompanyIndex = this.companies.findIndex((company) => company.id === updatedCompany.id);
            if (updatedCompanyIndex !== -1) {
                this.companies[updatedCompanyIndex] = updatedCompanyIndex;
            }
        });
    }
}
