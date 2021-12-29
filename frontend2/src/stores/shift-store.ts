import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { EmployeeEntity } from '../models/entities/employee-entity';
import {
    createShift,
    deleteShift,
    getEmployeeListForShift,
    getShiftListForCompany,
    updateShift,
} from '../api/apiCalls';
import { ShiftEntity } from '../models/entities/shift-entity';
import { ShiftDto } from '../models/dtos/shift-dto';
import { message } from 'antd';
import { ShiftTypeEnum } from '../models/enums/shift-type-enum';

/** TODO REFACTOR !!! **/

export class ShiftStore {
    availableEmployees: EmployeeEntity[] = [];
    shiftEmployees: EmployeeEntity[];
    shift: ShiftEntity;
    shiftList: ShiftEntity[];
    shiftListForDay: ShiftEntity[];

    shiftEditResult?: 'success' | 'error';
    isSubmitted = false;

    /** FIXME should probably be changed back to private, might cause errors **/
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            availableEmployees: observable,
            shiftEmployees: observable,
            shiftList: observable,
            shiftListForDay: observable,
            shift: observable,

            setShiftsForDate: action,

            loadShiftList: action,
            getShiftById: action,
            addToShift: action,
            removeFromShift: action,
            clearShift: action,
            addShift: action,
            saveShift: action,
            setShiftEmployees: action,
            deleteShift: action,

            setEmployees: action,
            addEmployee: action,
            removeEmployee: action,

            shiftEditResult: observable,
            isSubmitted: observable,
        });

        //this.availableEmployees = [...rootStore.employeeStore.employees];

        this.shiftEmployees = [];
    }

    setShift(shiftId: number): void {
        this.shift = this.shiftList.find((shift) => shift.id === shiftId);
    }

    setShiftsForDate(date: string): void {
        this.shiftListForDay = this.shiftList?.filter((shift) => shift.date === date);
    }

    getShiftById(shiftId: number): ShiftEntity {
        return this.shiftList.find((shift) => shift.id === shiftId);
    }

    async loadShiftList(companyId: number): Promise<void> {
        const shifts = await getShiftListForCompany(companyId);
        if (shifts) {
            runInAction(() => {
                this.shiftList = shifts;
            });
        }
    }

    addToShift(employee: EmployeeEntity): void {
        this.shiftEmployees.push(employee);
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

    async saveShift(updatedShift: ShiftEntity): Promise<void> {
        if (this.shiftEmployees.length < 1) {
            message.error(`Smena nema zadne zamestnance`);
            this.setShiftEditResult('error');
            this.setIsShiftSubmitted(true);
            return;
        }
        if (this.shift.id) {
            const employeeIDs = this.shiftEmployees.map((emp) => emp.id);
            const shift: ShiftDto = { ...updatedShift, employeeIDs };
            try {
                await updateShift(this.shift.id, shift);
                this.clearShift();
                this.setShiftEditResult('success');
            } catch (e) {
                message.error('Smenu se nepodarilo aktualizovat');
                this.setShiftEditResult('error');
            }
            this.setIsShiftSubmitted(true);
        } else {
            this.shift.employeeIDs = this.shiftEmployees.map((emp) => emp.id);
            runInAction(() => {
                this.rootStore.calendarStore.isEditOpen = false;
            });
            try {
                await createShift(this.shift);
                this.clearShift();
                this.setShiftEditResult('success');
            } catch (e) {
                message.error('Smenu se nepodarilo vytvorit');
                this.setShiftEditResult('error');
            }
            this.setIsShiftSubmitted(true);
        }
    }

    setEmployees(employees: EmployeeEntity[]): void {
        this.availableEmployees = employees;
    }

    addEmployee(employee: EmployeeEntity): void {
        this.availableEmployees.push(employee);
    }

    removeEmployee(index: number): void {
        this.availableEmployees.splice(index, 1);
    }

    async loadShiftEmployees(shiftId: number): Promise<void> {
        const loadedEmployees = await getEmployeeListForShift(shiftId);
        runInAction(() => {
            this.shiftEmployees = loadedEmployees;
        });
    }

    async loadAvailableEmployees(): Promise<void> {
        await this.rootStore.employeeStore.fetchAllEmployees(this.shift.companyID);
        /** DONT SHOW EMPLOYEES THAT ARE ALREADY IN THE CURRENTLY EDITED SHIFT **/
        this.setEmployees(
            [...this.rootStore.employeeStore.employees].filter((emp) => !this.shift.employeeIDs?.includes(emp.id)),
        );
    }

    async deleteShift(shiftId: number, companyId: number): Promise<void> {
        try {
            await deleteShift(shiftId);
        } catch (e) {
            message.error('Nepodarilo se smazat smenu');
        } finally {
            await this.loadShiftList(companyId);
            this.rootStore.shiftStore.setShiftsForDate(this.rootStore.calendarStore.stringDate);
        }
    }

    addShift(time: ShiftTypeEnum, companyId: number): void {
        this.shiftEmployees = [];
        this.shift.time = time;
        this.shift.date = this.rootStore.calendarStore.stringDate;
        this.shift.companyID = companyId;
    }

    setShiftEditResult(result: 'success' | 'error'): void {
        runInAction(() => {
            this.shiftEditResult = result;
        });
    }

    setIsShiftSubmitted(submitted: boolean): void {
        runInAction(() => {
            this.isSubmitted = submitted;
        });
    }
}
