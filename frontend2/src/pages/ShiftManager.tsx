import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Row } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext } from 'react-beautiful-dnd';
import { EmpTable } from './tables/employee-table';
import { ShiftTable } from './tables/shift-table';

interface ShiftManagerPageProps {
    rootStore: RootStore;
}

export const ShiftManagerPage: React.FC<ShiftManagerPageProps> = observer(
    (props: ShiftManagerPageProps): JSX.Element => {
        const { rootStore } = props;

        rootStore.setActivePage('shift-manager');

        useEffect(() => {
            (async () => {
                await rootStore.employeeStore.fetchAllEmployees();
                rootStore.shiftStore.setEmployees(rootStore.employeeStore.employees);
            })();
        }, []);

        const saveShift = async () => {
            await rootStore.shiftStore.saveShift();
        };

        const dragEndHandler = (event: any) => {
            console.log(event);

            if (event.destination) {
                if (event.destination.droppableId !== event.source.droppableId) {
                    if (
                        event.destination.droppableId === 'shift-table' &&
                        event.source.droppableId === 'employee-table'
                    ) {
                        rootStore.shiftStore.addToShift(
                            rootStore.shiftStore.employees[event.source.index],
                            event.source.index,
                            event.destination.index,
                        );
                        rootStore.shiftStore.removeEmployee(event.source.index);
                    } else {
                        rootStore.shiftStore.addEmployee(rootStore.shiftStore.shiftEmployees[event.source.index]);
                        rootStore.shiftStore.removeFromShift(event.source.index);
                    }
                } else {
                    if (event.destination.droppableId === 'shift-table') {
                        const items = [...rootStore.shiftStore.shiftEmployees];

                        const [reorderedItem] = items.splice(event.source.index, 1);
                        items.splice(event.destination.index, 0, reorderedItem);

                        rootStore.shiftStore.setShiftEmployees(items);
                    }
                    if (event.source.droppableId === 'employee-table') {
                        const items = [...rootStore.shiftStore.employees];

                        const [reorderedItem] = items.splice(event.source.index, 1);
                        items.splice(event.destination.index, 0, reorderedItem);

                        rootStore.shiftStore.setEmployees(items);
                    }
                }
            }
        };

        return (
            <>
                <Row justify="space-between">
                    <DragDropContext onDragEnd={dragEndHandler}>
                        <Col span={10}>
                            <EmpTable />
                        </Col>

                        <Col span={10}>
                            <ShiftTable />
                            <Button onClick={saveShift}>Ulozit</Button>
                        </Col>
                    </DragDropContext>
                </Row>
            </>
        );
    },
);
