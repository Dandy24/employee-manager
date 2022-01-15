import { ShiftStore } from '../stores/shift-store';
import { DropResult } from 'react-beautiful-dnd';
import { message } from 'antd';

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
        message.error(`Zamestnanec se v tento den jiz nachazi na smene ${employee.time}`);
        return false;
    }
    /** Check whether the selected employee isnt inactive **/
    if (!store.availableEmployees[sourceDroppableId]?.active) {
        message.error(`Zamestnanec je neaktivni`);
        return false;
    }

    /** CHECK IF SELECTED EMPLOYEE ISNT ALREADY IN THE CURRENT SHIFT **/
    if (store.shiftEmployees?.includes(store.availableEmployees[sourceDroppableId])) {
        message.error(`Tento zamestnanec uz na teto smene je`);
        return false;
    }
    /** TODO IF IS MAXIMUM SHIFT CAPATITY REACHED???? CONSIDER ADDING ATTRIBUTE TO THE TABLE **/

    return true;
};

export const dragEndHandler = (event: DropResult, store: ShiftStore): void => {
    if (event.destination) {
        if (event.destination.droppableId !== event.source.droppableId) {
            if (event.destination.droppableId === 'shift-table' && event.source.droppableId === 'employee-table') {
                if (isValid(event.source.index, event.destination.index, store)) {
                    store.addToShift(store.availableEmployees[event.source.index]);
                    store.removeEmployee(event.source.index);
                }
            } else {
                store.addEmployee(store.shiftEmployees[event.source.index]);
                store.removeFromShift(event.source.index);
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
