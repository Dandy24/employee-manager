import { CalendarStore } from '../calendar-store';
import { RootStore } from '../root-store';
import moment from 'moment';

test('Gets correctly formatted date', async () => {
    const store = new CalendarStore(new RootStore());
    store.setSelectedDate(moment('2022-01-15 22:45'));
    expect(typeof store.formattedDate).toBe('string');
    expect(store.formattedDate).toEqual('sobota 15. leden 2022');
});
