import { RootStore } from './root-store';
import { action, computed, makeObservable, observable } from 'mobx';
import moment, { Moment } from 'moment';

export class CalendarStore {
    selectedDate: moment.Moment;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            selectedDate: observable,
            setSelectedDate: action,

            // formattedDate: computed,
            // stringDate: computed,
        });

        // this.selectedDate = moment().format('YYYY-MM-DD');
    }

    setSelectedDate(date: moment.Moment): void {
        if (date) {
            // this.selectedDate = moment(date).format('YYYY-MM-DD');
            this.selectedDate = date;
        }
    }

    get formattedDate() {
        const day = this.selectedDate?.format('dddd');
        const date = this.selectedDate?.format('LL');
        return `${day} ${date}`;
    }

    get stringDate() {
        return moment(this.selectedDate).format('YYYY-MM-DD');
    }
}
