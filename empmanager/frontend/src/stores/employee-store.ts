import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';

export class EmployeeStore {
    employees: any[] = ['kok','test']; //TODO type  Employee[]
    loadingEmployees = false;
    //initializedContacts = false;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employees: observable,
            loadingEmployees: observable,

            // setActiveFilter: action,
            // fetchAllContacts: action,
            // setPageSize: action.bound,
        });
    }
}
