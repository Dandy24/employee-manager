import {EmployeeStore} from "./employee-store";


export class RootStore {
    employeeStore: EmployeeStore;
    //contactModalStore: ContactModalStore;

    constructor() {
        this.employeeStore = new EmployeeStore(this);
        //this.contactModalStore = new ContactModalStore(this);

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
