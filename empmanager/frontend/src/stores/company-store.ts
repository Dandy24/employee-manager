import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import { createCompany, deleteCompany, getCompanyList, updateCompany } from '../api/apiCalls';
import { message } from 'antd';

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

    async saveCompany(company: any): Promise<void> {
        if (this.company.id) {
            await updateCompany(company, this.company.id); //TODO dat to ID pryc nejak
        } else {
            await createCompany(company);
        }
        await this.fetchAllCompanies();
        runInAction(() => {
            this.closeModal();
        });
    }

    async deleteCompany(company: any): Promise<void> {
        //TODO type
        await deleteCompany(company.id);
        runInAction(() => {
            this.loadingCompanies = true;
            message.success('Firma byla úspěšně smazána.');
        });
        await this.fetchAllCompanies();
        runInAction(() => {
            this.loadingCompanies = false;
        });
    }
}
