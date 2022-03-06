import { ShiftStore } from '../stores/shift-store';
import { DropResult } from 'react-beautiful-dnd';

//FIXME any u employee: Record

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const isInvalid = (employee: Record<string, any>, store: ShiftStore): string | boolean => {
    /** Check whether the employee is in the different shift on the same day **/
    if (
        store.shiftListForDay.find(
            (shift) => shift.employeeIDs.includes(employee.id) && shift.time !== store.shift.time,
        )
    ) {
        const foundEmp = store.availableEmployees.find((emp) => emp.id === employee.id);

        if (foundEmp) {
            const employee2 = store.shiftListForDay.find((shift) => shift.employeeIDs.includes(foundEmp.id));
            return `Zaměstnanec se v tento den již nachází na směně ${employee2.time}`;
        }
    }
    /** Check whether the selected employee isnt inactive **/
    if (store.availableEmployees.find((emp) => emp.id === employee.id && !employee.active)) {
        return `Zaměstnanec je neaktivní`;
    }
    /** TODO IF IS MAXIMUM SHIFT CAPACITY REACHED???? CONSIDER ADDING ATTRIBUTE TO THE DJANGO MODEL **/
    return false;
};

export const dragEndHandler = (event: DropResult, store: ShiftStore): void => {
    if (event.destination) {
        if (event.destination.droppableId !== event.source.droppableId) {
            if (event.destination.droppableId === 'shift-table' && event.source.droppableId === 'employee-table') {
                store.addToShift(store.availableEmployees[event.source.index]);
                store.removeEmployee(event.source.index);
                store.saveShiftToLocalStorage();
            } else {
                store.addEmployee(store.shiftEmployees[event.source.index]);
                store.removeFromShift(event.source.index);
                store.saveShiftToLocalStorage();
            }
        } else {
            // FIXME nejsou oba ify to same? :)
            if (event.destination.droppableId === 'shift-table') {
                const items = [...store.shiftEmployees];

                const [reorderedItem] = items.splice(event.source.index, 1);
                items.splice(event.destination.index, 0, reorderedItem);

                store.setShiftEmployees(items);
            }
            if (event.source.droppableId === 'employee-table') {
                const items = [...store.availableEmployees];

                const [reorderedItem] = items.splice(event.source.index, 1);
                items.splice(event.destination.index, 0, reorderedItem);

                store.setEmployees(items);
            }
        }
    }
};
