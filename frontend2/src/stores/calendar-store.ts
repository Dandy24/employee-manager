import { RootStore } from './root-store';
import { action, computed, makeObservable, observable } from 'mobx';
import moment from 'moment';

/** TODO REFACTOR !!! **/

export class CalendarStore {
    selectedDate: moment.Moment;

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

            selectedDate: observable,
            setSelectedDate: action,

            formattedDate: computed,
            stringDate: computed,
        });
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
}
