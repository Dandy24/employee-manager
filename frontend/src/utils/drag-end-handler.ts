import { ShiftStore } from '../stores/shift-store';
import { DropResult } from 'react-beautiful-dnd';
import { message } from 'antd';

//FIXME any u employee: Record

export const isValid = (sourceDroppableId: number, destinationDroppableId: number, store: ShiftStore): boolean => {
    /** Check whether the employee is in the different shift on the same day **/
    if (
        store.shiftListForDay.find(
            (shift) =>
                shift.employeeIDs.includes(store.availableEmployees[sourceDroppableId]?.id) &&
                shift.time !== store.shift.time,
        )
    ) {
        const employee = store.shiftListForDay.find((shift) =>
            shift.employeeIDs.includes(store.availableEmployees[sourceDroppableId]?.id),
        );
        message.error(`Zaměstnanec se v tento den již nachází na směně ${employee.time}`);
        return false;
    }
    /** Check whether the selected employee isnt inactive **/
    if (!store.availableEmployees[sourceDroppableId]?.active) {
        message.error(`Zaměstnanec je neaktivní`);
        return false;
    }

    /** CHECK IF SELECTED EMPLOYEE ISNT ALREADY IN THE CURRENT SHIFT **/
    if (store.shiftEmployees?.includes(store.availableEmployees[sourceDroppableId])) {
        message.error(`Tento zaměstnanec už na této směně je`);
        return false;
    }
    /** TODO IF IS MAXIMUM SHIFT CAPATITY REACHED???? CONSIDER ADDING ATTRIBUTE TO THE DJANGO MODEL **/
    return true;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const showErrorTooltip = (employee: Record<string, any>, store: ShiftStore): string => {
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
    /** TODO IF IS MAXIMUM SHIFT CAPATITY REACHED???? CONSIDER ADDING ATTRIBUTE TO THE DJANGO MODEL **/
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const newIsValid = (employee: Record<string, any>, store: ShiftStore): boolean => {
    /** Check whether the employee is in the different shift on the same day **/
    if (
        store.shiftListForDay.find(
            (shift) => shift.employeeIDs.includes(employee.id) && shift.time !== store.shift.time,
        )
    ) {
        return false;
    }
    /** Check whether the selected employee isnt inactive **/
    if (store.availableEmployees.find((emp) => emp.id === employee.id && !employee.active)) {
        return false;
    }
    /** TODO IF IS MAXIMUM SHIFT CAPACITY REACHED???? CONSIDER ADDING ATTRIBUTE TO THE DJANGO MODEL **/
    return true;
};

export const dragEndHandler = (event: DropResult, store: ShiftStore): void => {
    if (event.destination) {
        if (event.destination.droppableId !== event.source.droppableId) {
            if (event.destination.droppableId === 'shift-table' && event.source.droppableId === 'employee-table') {
                if (isValid(event.source.index, event.destination.index, store)) {
                    store.addToShift(store.availableEmployees[event.source.index]);
                    store.removeEmployee(event.source.index);
                    store.saveShiftToLocalStorage();
                }
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
