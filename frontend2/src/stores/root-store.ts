import { EmployeeStore } from './employee-store';
import { CompanyStore } from './company-store';
import { action, makeObservable, observable } from 'mobx';
import { ShiftStore } from './shift-store';

export class RootStore {
    employeeStore: EmployeeStore;
    companyStore: CompanyStore;
    shiftStore: ShiftStore;
    activePage = 'company-list';

    constructor() {
        this.employeeStore = new EmployeeStore(this);
        this.companyStore = new CompanyStore(this);
        this.shiftStore = new ShiftStore(this);

        makeObservable(this, {
            activePage: observable,

            setActivePage: action,
        });
    }

    setActivePage(newPage: string): void {
        this.activePage = newPage;
    }

    /*hydrate(): RootStoreHydration {
        return {};
    }

    rehydrate(data: RootStoreHydration): void {
        if (data) {
        }
    }*/
}
