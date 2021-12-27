import { RootStore } from './root-store';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { MonthlyOutputEntity } from '../models/entities/monthly-output-entity';
import { getEmployeeMonthlyOutput } from '../api/apiCalls';
import { message } from 'antd';
export class DashboardStore {
    employeeOutput: MonthlyOutputEntity[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employeeOutput: observable,
            loadEmployeeOutput: action,

            workingDaysGraphData: computed,
        });
    }

    async loadEmployeeOutput(id: number): Promise<void> {
        runInAction(() => {
            // this.loadingCompanies = true;
            this.employeeOutput = [];
        });

        let output = [];

        try {
            output = await getEmployeeMonthlyOutput(id);
        } catch (e) {
            message.error('Failed to load employee output from database');
        } finally {
            // this.loadingCompanies = false;
            this.employeeOutput = output;
        }
    }

    get workingDaysGraphData() {
        return this.employeeOutput.map((output) => ({
            name: output.start_date,
            work: output.working_hours,
            vac: output.vacation_hours,
        }));
    }

    get effectivityGraphData() {
        return this.employeeOutput.map((output) => ({
            name: output.start_date,
            effectivity: output.effectivity,
        }));
    }

    get hoursDistributionGraphData() {
        return [
            { name: 'Hours worked', hours: this.employeeOutput[0]?.working_hours },
            { name: 'Hours vacation', hours: this.employeeOutput[0]?.vacation_hours },
            { name: 'Hours sick', hours: this.employeeOutput[0]?.sick_hours },
            { name: 'Hours overtime', hours: this.employeeOutput[0]?.overtime },
        ];
    }
}
