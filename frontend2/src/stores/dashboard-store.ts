import { RootStore } from './root-store';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { EmployeeMonthlyOutputEntity } from '../models/entities/employee-monthly-output-entity';
import {
    getEmployeeMonthlyOutput,
    getMonthlyHoursByCompany,
    getOverallMonthlyOutput,
    getTopEmployeeOutputList,
} from '../api/apiCalls';
import { message } from 'antd';
import { OverallMonthlyOutputEntity } from '../models/entities/overall-monthly-output-entity';
import { GraphDataInterface, HoursTypeGraphDataInterface } from '../models/interfaces/graph-data-interface';

export class DashboardStore {
    employeeOutput: EmployeeMonthlyOutputEntity[];
    overallOutput: OverallMonthlyOutputEntity[];
    topEmployees: EmployeeMonthlyOutputEntity[];
    employeeMode = false;
    companyHours: GraphDataInterface[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employeeOutput: observable,
            overallOutput: observable,
            topEmployees: observable,
            employeeMode: observable,
            companyHours: observable,
            loadEmployeeOutput: action,
            loadOverallOutput: action,
            loadHoursByCompany: action,
            loadTopEmployeesOutputList: action,
            switchMode: action,

            workingDaysGraphData: computed,
            effectivityGraphData: computed,
            hoursDistributionGraphData: computed,
            housingCapacity: computed,
            overallEffectivity: computed,
            topEmployeeOutputsData: computed,
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
                const comp = { name: out[0], value: out[1] };
                formattedOutput.push(comp);
            });
        } catch (e) {
            message.error('Failed to load overall output from database');
        } finally {
            // this.loadingCompanies = false;
            runInAction(() => {
                this.companyHours = formattedOutput;
            });
        }
    }

    async loadTopEmployeesOutputList(): Promise<void> {
        runInAction(() => {
            // this.loadingCompanies = true;
            this.topEmployees = [];
        });

        let output = [];

        try {
            output = await getTopEmployeeOutputList();
        } catch (e) {
            message.error('Failed to load top employees output list from database');
        } finally {
            // this.loadingCompanies = false;
            runInAction(() => {
                this.topEmployees = output;
            });
        }
    }

    get workingDaysGraphData(): HoursTypeGraphDataInterface[] {
        return this.employeeOutput
            ?.map((output) => ({
                name: output.start_date,
                work: output.working_hours,
                vac: output.vacation_hours,
            }))
            .reverse();
    }

    get effectivityGraphData(): GraphDataInterface[] {
        return this.employeeOutput
            .map((output) => ({
                name: output.start_date,
                value: output.effectivity,
            }))
            .reverse();
    }

    get hoursDistributionGraphData(): GraphDataInterface[] {
        return [
            { name: 'Hours worked', value: this.employeeOutput[0]?.working_hours },
            { name: 'Hours vacation', value: this.employeeOutput[0]?.vacation_hours },
            { name: 'Hours sick', value: this.employeeOutput[0]?.sick_hours },
            { name: 'Hours overtime', value: this.employeeOutput[0]?.overtime },
        ];
    }

    get overallEffectivity(): GraphDataInterface[] {
        return this.overallOutput
            .map((output) => ({
                name: output.start_date,
                value: Math.ceil(output.effectivity),
            }))
            .reverse();
    }

    get housingCapacity(): number {
        return Math.ceil((this.overallOutput[0]?.housing_capacity / 15) * 100);
    }

    get overallWorkingDaysGraphData(): HoursTypeGraphDataInterface[] {
        return this.overallOutput.map((output) => ({
            name: output.start_date,
            work: output.working_hours,
            vac: output.vacation_hours,
        }));
    }

    // FIXME first_name + last_name
    get topEmployeeOutputsData(): HoursTypeGraphDataInterface[] {
        return this.topEmployees?.map((output) => ({
            name: this.rootStore.employeeStore.employees.find((emp) => emp.id === output.employee)?.last_name,
            work: output.working_hours,
            vac: output.vacation_hours,
        }));
    }
}
