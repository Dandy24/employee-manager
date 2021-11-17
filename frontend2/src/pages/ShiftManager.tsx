import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Row } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { EmpTable } from './tables/employee-table';
import { ShiftTable } from './tables/shift-table';
import { useParams } from 'react-router-dom';
import { dragEndHandler } from '../services/drag-end-handler';
import { SwapOutlined } from '@ant-design/icons';

interface ShiftManagerPageProps {
    rootStore: RootStore;
}

export const ShiftManagerPage: React.FC<ShiftManagerPageProps> = observer(
    (props: ShiftManagerPageProps): JSX.Element => {
        const { id } = useParams<{ id: string }>();
        const shiftId = parseInt(id);
        const { rootStore } = props;

        rootStore.setActivePage('shift-manager');

        useEffect(() => {
            (async () => {
                if (shiftId) {
                    rootStore.shiftStore.setShift(shiftId);
                    await rootStore.shiftStore.loadShiftEmployees(shiftId);
                }

                await rootStore.shiftStore.loadAvailableEmployees();
            })();
        }, []);

        const saveShift = async () => {
            await rootStore.shiftStore.saveShift(rootStore.shiftStore.shift);
        };

        const onDragEnd = (event: DropResult, provided: ResponderProvided) => {
            dragEndHandler(event, rootStore.shiftStore);
        };

        return (
            <>
                <Row justify="space-between">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Col span={11}>
                            <EmpTable />
                        </Col>

                        <Col style={{ marginTop: '10%' }}>
                            <SwapOutlined />
                        </Col>

                        <Col span={11}>
                            <ShiftTable />
                        </Col>
                    </DragDropContext>
                </Row>
                <Row>
                    <Button onClick={saveShift}>Ulozit</Button>
                </Row>
            </>
        );
    },
);
