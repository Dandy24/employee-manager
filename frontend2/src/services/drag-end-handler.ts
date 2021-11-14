import { ShiftStore } from '../stores/shift-store';
import { DropResult } from 'react-beautiful-dnd';

export const dragEndHandler = (event: DropResult, store: ShiftStore): void => {
    if (event.destination) {
        if (event.destination.droppableId !== event.source.droppableId) {
            if (event.destination.droppableId === 'shift-table' && event.source.droppableId === 'employee-table') {
                store.addToShift(
                    store.availableEmployees[event.source.index],
                    event.source.index,
                    event.destination.index,
                );
                store.removeEmployee(event.source.index);
            } else {
                store.addEmployee(store.shiftEmployees[event.source.index]);
                store.removeFromShift(event.source.index);
            }
        } else {
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
