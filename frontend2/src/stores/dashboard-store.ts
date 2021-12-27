import { RootStore } from './root-store';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment from 'moment';
import { ShiftEntity } from '../models/entities/shift-entity';
import { MonthlyOutputEntity } from '../models/entities/monthly-output-entity';
import { getCompanyList, getEmployeeMonthlyOutput } from '../api/apiCalls';
import { message } from 'antd';
import { EmployeeEntity } from '../models/entities/employee-entity';

export class DashboardStore {
    employeeOutput: MonthlyOutputEntity;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employeeOutput: observable,
            loadEmployeeOutput: action,
        });
    }

    async loadEmployeeOutput(id: number): Promise<void> {
        runInAction(() => {
            // this.loadingCompanies = true;
            this.employeeOutput = null;
        });

        let output = null;

        try {
            output = await getEmployeeMonthlyOutput(id);
        } catch (e) {
            message.error('Failed to load employee output from database');
        } finally {
            // this.loadingCompanies = false;
            this.employeeOutput = output;
        }
    }
}
