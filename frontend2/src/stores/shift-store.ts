import { RootStore } from './root-store';
import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
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
import moment from 'moment';
import { ShiftTypeEnum } from '../models/enums/shift-type-enum';
import { message } from 'antd';

/** TODO REFACTOR !!! **/

export class ShiftStore {
    availableEmployees: EmployeeEntity[] = [];
    shiftEmployees: EmployeeEntity[];
    shift: ShiftEntity;
    shiftList: ShiftEntity[];
    shiftListForDay: ShiftEntity[];
    isEditOpen = false;

    isShiftSelectOpen = false;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            isShiftSelectOpen: observable,
            setShiftSelectOpen: action,

            isEditOpen: observable,

            availableEmployees: observable,
            shiftEmployees: observable,
            shiftList: observable,
            shiftListForDay: observable,

            loadShiftList: action,
            getShiftById: action,
            getShiftsForDate: action,
            // getShiftForDateTime: action,
            addToShift: action,
            removeFromShift: action,
            clearShift: action,
            addShift: action,
            saveShift: action,
            setShiftEmployees: action,

            openToAdd: action,

            setEmployees: action,
            addEmployee: action,
            removeEmployee: action,
        });

        //this.availableEmployees = [...rootStore.employeeStore.employees];

        this.shiftEmployees = [];
    }

    setShiftSelectOpen(open: boolean): void {
        this.isShiftSelectOpen = open;
    }

    setShift(shiftId: number): void {
        this.shift = this.shiftList.find((shift) => shift.id === shiftId);
    }

    // getShiftForDateTime(date: string, time: any): ShiftEntity {
    //     return this.shiftList?.find((shift) => shift.date === date && shift.time == time);
    // }

    getShiftsForDate(date: string): ShiftEntity[] {
        this.shiftListForDay = this.shiftList?.filter((shift) => shift.date === date);
        return this.shiftList?.filter((shift) => shift.date === date);
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
        // await this.rootStore.companyStore.fetchAllCompanies(); //TODO vyhodit to idealne a to radeji zkusit loadnout v useEffectu
        if (this.shift.id) {
            const employeeIDs = this.shiftEmployees.map((emp) => emp.id);
            const shift: ShiftDto = { ...updatedShift, employeeIDs };
            console.log(shift);
            // await updateShift(this.shift.id, updatedShift);
            await updateShift(this.shift.id, updatedShift);
        } else {
            // const shift = new ShiftDto();
            // shift.time = ShiftTypeEnum.Rano;
            // shift.date = moment().format('YYYY-MM-DD');
            // shift.companyID = toJS(this.shift.companyID);
            this.shift.employeeIDs = this.shiftEmployees.map((emp) => emp.id);
            runInAction(() => {
                this.isEditOpen = false;
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

    async deleteShift(shiftId: number): Promise<void> {
        try {
            await deleteShift(shiftId);
        } catch (e) {
            message.error('Nepodarilo se smazat smenu');
        } finally {
            // this.rootStore.shiftStore.getShiftsForDate(this.rootStore.calendarStore.stringDate);
        }
    }

    openToAdd(): void {
        this.shift = new ShiftEntity();
        this.isEditOpen = true;
    }

    addShift(time: any, companyId: number) {
        this.shift.time = time;
        this.shift.date = this.rootStore.calendarStore.stringDate;
        this.shift.companyID = companyId;
    }
}
