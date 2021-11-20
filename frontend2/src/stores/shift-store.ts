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

    private rootStore: RootStore;

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

    addToShift(employee: EmployeeEntity, sourceIndex?: number, destinationIndex?: number): void {
        // if (this.shiftEmployees.length === 0) {
        this.shiftEmployees.push(employee);
        // } else {

        // console.log(sourceIndex, destinationIndex);
        // const items = [...this.shiftEmployees];
        //
        // const [reorderedItem] = items.splice(destinationIndex, 1);
        // items.splice(destinationIndex + 1, 0, reorderedItem);
        //
        // this.setShiftEmployees(items);
        // // }
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

    async saveShift(updatedShift: ShiftEntity): Promise<void> {
        if (this.shift.id) {
            const employeeIDs = this.shiftEmployees.map((emp) => emp.id);
            const shift: ShiftDto = { ...updatedShift, employeeIDs };
            console.log(shift);
            await updateShift(this.shift.id, updatedShift);
        } else {
            this.shift.employeeIDs = this.shiftEmployees.map((emp) => emp.id);
            runInAction(() => {
                this.rootStore.calendarStore.isEditOpen = false;
            });
            await createShift(this.shift);
        }

        this.clearShift(); //TODO trigger this only if createShift was successfull (Exception wasnt thrown)
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
        this.setEmployees([...this.rootStore.employeeStore.employees]);
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
        this.shift.time = time;
        this.shift.date = this.rootStore.calendarStore.stringDate;
        this.shift.companyID = companyId;
    }
}
