import { EmployeeStore } from './employee-store';
import { CompanyStore } from './company-store';
import { action, makeObservable, observable } from 'mobx';
import { ShiftStore } from './shift-store';
import { SearchStore } from './search-store';
import { CalendarStore } from './calendar-store';
import { DashboardStore } from './dashboard-store';

export class RootStore {
    employeeStore: EmployeeStore;
    companyStore: CompanyStore;
    shiftStore: ShiftStore;
    searchStore: SearchStore;
    calendarStore: CalendarStore;
    dashboardStore: DashboardStore;
    activePage = 'company-list';

    constructor() {
        this.employeeStore = new EmployeeStore(this);
        this.companyStore = new CompanyStore(this);
        this.shiftStore = new ShiftStore(this);
        this.searchStore = new SearchStore(this);
        this.calendarStore = new CalendarStore(this);
        this.dashboardStore = new DashboardStore(this);

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
