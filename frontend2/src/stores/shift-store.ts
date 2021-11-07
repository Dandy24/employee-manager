import { RootStore } from './root-store';
import { action, makeObservable, observable, toJS } from 'mobx';
import { EmployeeEntity } from '../models/entities/employee-entity';
import { createShift } from '../api/apiCalls';
import { ShiftEntity } from '../models/entities/shift-entity';
import { ShiftDto } from '../models/dtos/shift-dto';
import moment from 'moment';

export class ShiftStore {
    employees: EmployeeEntity[] = [];
    shiftEmployees: EmployeeEntity[];
    shift: any[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            employees: observable,
            shiftEmployees: observable,

            addToShift: action,
            removeFromShift: action,
            clearShift: action,
            saveShift: action,
            setShiftEmployees: action,

            setEmployees: action,
            addEmployee: action,
            removeEmployee: action,
        });

        this.employees = [...rootStore.employeeStore.employees];

        this.shiftEmployees = [];
    }

    addToShift(employee: EmployeeEntity, sourceIndex?: number, destinationIndex?: number): void {
        // if (this.shiftEmployees.length === 0) {
        this.shiftEmployees.push(employee);
        // } else {
        //     console.log(sourceIndex, destinationIndex);
        //     const items = [...this.shiftEmployees];
        //
        //     const [reorderedItem] = items.splice(sourceIndex, 1);
        //     items.splice(destinationIndex, 0, reorderedItem);
        //
        //     this.setShiftEmployees(items);
        // }
        //
        // console.log(this.shiftEmployees);
    }

    removeFromShift(index: number): void {
        this.shiftEmployees.splice(index, 1);
    }

    clearShift(): void {
        this.shiftEmployees = [];
    }

    setShiftEmployees(shift: EmployeeEntity[]): void {
        this.shiftEmployees = shift;
    }

    async saveShift(): Promise<void> {
        await this.rootStore.companyStore.fetchAllCompanies(); //TODO vyhodit to idealne a to radeji zkusit loadnout v useEffectu
        const shift = new ShiftDto();
        shift.time = 'ranni';
        shift.date = moment().format('YYYY-MM-DD');
        shift.companyID = toJS(this.rootStore.companyStore.companies.find((comp) => comp.id === 3).id);
        shift.employeeIDs = toJS(this.shiftEmployees.map((shift) => shift.id));
        await createShift(shift);
        this.clearShift(); //TODO trigger this only if createShift was successfull (Exception wasnt thrown)
    }

    setEmployees(employees: EmployeeEntity[]): void {
        this.employees = employees;
    }

    addEmployee(employee: EmployeeEntity): void {
        this.employees.push(employee);
        console.log(this.employees);
    }

    removeEmployee(index: number): void {
        this.employees.splice(index, 1);
    }
}
