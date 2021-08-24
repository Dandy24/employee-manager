import {EmployeeStore} from "./employee-store";
import {CompanyStore} from "./company-store";


export class RootStore {
    employeeStore: EmployeeStore;
    companyStore: CompanyStore;

    constructor() {
        this.employeeStore = new EmployeeStore(this);
        this.companyStore = new CompanyStore(this);

        // makeObservable(this, {
        //     contactStore: observable,
        // });
    }

    /*hydrate(): RootStoreHydration {
        return {};
    }

    rehydrate(data: RootStoreHydration): void {
        if (data) {
        }
    }*/
}
