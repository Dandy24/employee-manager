import { RootStore } from './root-store';
import { action, computed, makeObservable, observable } from 'mobx';
import { ShiftEntity } from '../models/entities/shift-entity';

import 'moment/locale/cs';
import moment from 'moment';

moment.locale('cs');

export class CalendarStore {
    selectedDate: moment.Moment;

    activeCompanyId: number;

    isEditOpen = false;
    isShiftSelectOpen = false;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            isShiftSelectOpen: observable,
            isEditOpen: observable,
            setShiftSelectOpen: action,
            setShiftEditOpen: action,

            activeCompanyId: observable,
            setActiveCompanyId: action,

            selectedDate: observable,
            setSelectedDate: action,

            openToAdd: action,

            formattedDate: computed,
            stringDate: computed,
        });
    }

    setActiveCompanyId(companyId: number): void {
        this.activeCompanyId = companyId;
    }

    setShiftSelectOpen(open: boolean): void {
        this.isShiftSelectOpen = open;
    }

    setShiftEditOpen(open: boolean): void {
        this.isEditOpen = open;
    }

    setSelectedDate(date: moment.Moment): void {
        if (date) {
            this.selectedDate = date;
        }
    }

    get formattedDate(): string {
        const day = this.selectedDate?.format('dddd');
        const date = this.selectedDate?.format('LL');
        return `${day} ${date}`;
    }

    get stringDate(): string {
        return moment(this.selectedDate).format('YYYY-MM-DD');
    }

    openToAdd(): void {
        this.rootStore.shiftStore.shift = new ShiftEntity();
        this.isEditOpen = true;
    }
}
