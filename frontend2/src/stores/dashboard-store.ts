import { RootStore } from './root-store';
import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';
import { EmployeeMonthlyOutputEntity } from '../models/entities/employee-monthly-output-entity';
import { getEmployeeMonthlyOutput, getMonthlyHoursByCompany, getOverallMonthlyOutput } from '../api/apiCalls';
import { message } from 'antd';
import { OverallMonthlyOutputEntity } from '../models/entities/overall-monthly-output-entity';

//FIXME move to own file
export interface CompanyHours {
    name: string;
    hours: number;
}

export class DashboardStore {
    employeeOutput: EmployeeMonthlyOutputEntity[];
    overallOutput: OverallMonthlyOutputEntity[];
    employeeMode = false;
    companyHours: CompanyHours[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employeeOutput: observable,
            overallOutput: observable,
            employeeMode: observable,
            loadEmployeeOutput: action,
            loadOverallOutput: action,
            switchMode: action,

            workingDaysGraphData: computed,
            effectivityGraphData: computed,
            hoursDistributionGraphData: computed,
            overallWorkingHours: computed,
            overallEffectivity: computed,
        });
    }

    switchMode(): void {
        this.employeeMode = !this.employeeMode;
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
            runInAction(() => {
                this.employeeOutput = output;
            });
        }
    }

    async loadOverallOutput(): Promise<void> {
        runInAction(() => {
            // this.loadingCompanies = true;
            this.overallOutput = [];
        });

        let output = [];

        try {
            output = await getOverallMonthlyOutput();
        } catch (e) {
            message.error('Failed to load overall output from database');
        } finally {
            // this.loadingCompanies = false;
            runInAction(() => {
                this.overallOutput = output;
            });
        }
    }

    async loadHoursByCompany(): Promise<void> {
        runInAction(() => {
            // this.loadingCompanies = true;
            this.companyHours = [];
        });

        let output = [];
        const formattedOutput = [];

        try {
            output = await getMonthlyHoursByCompany(this.overallOutput[0].start_date, this.overallOutput[0].end_date);

            output.forEach((out) => {
                const comp = { name: out[0], hours: out[1] };
                formattedOutput.push(comp);
            });
        } catch (e) {
            message.error('Failed to load overall output from database');
        } finally {
            // this.loadingCompanies = false;
            runInAction(() => {
                this.companyHours = output;
            });
        }
    }

    get workingDaysGraphData() {
        return this.employeeOutput?.map((output) => ({
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

    get overallWorkingHours() {
        return this.employeeOutput.reduce((prevOutput, currOutput) => prevOutput + currOutput.working_hours, 0);
    }

    get overallEffectivity() {
        return this.overallOutput.map((output) => ({
            name: output.start_date,
            effectivity: Math.ceil(output.effectivity),
        }));
    }

    get housingCapacity() {
        return Math.ceil((this.overallOutput[0]?.housing_capacity / 15) * 100);
    }

    get overallWorkingDaysGraphData() {
        return this.overallOutput.map((output) => ({
            name: output.start_date,
            work: output.working_hours,
            vac: output.vacation_hours,
        }));
    }
}
