import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Breadcrumb, Button, Col, Modal, PageHeader, Row, Tag } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { EmpTable } from './tables/employee-table';
import { ShiftTable } from './tables/shift-table';
import { useParams } from 'react-router-dom';
import { dragEndHandler } from '../services/drag-end-handler';
import { CalendarOutlined, ExclamationCircleOutlined, HomeOutlined, SwapOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ShiftSubmitResult } from '../components/shift-manager/shift-submit-result';

interface ShiftManagerPageProps {
    rootStore: RootStore;
}

export const ShiftManagerPage: React.FC<ShiftManagerPageProps> = observer(
    (props: ShiftManagerPageProps): JSX.Element => {
        const { id } = useParams<{ id: string }>();
        const shiftId = parseInt(id);
        const { rootStore } = props;

        const { confirm } = Modal;

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

        const handleDelete = async () => {
            confirm({
                title: 'Opravdu chcete smazat tuto smenu?',
                icon: <ExclamationCircleOutlined />,
                content: 'Tuto akci nelze vrátit zpět',
                okText: 'Ano',
                okType: 'danger',
                cancelText: 'Ne',
                async onOk() {
                    await rootStore.shiftStore.deleteShift(
                        rootStore.shiftStore.shift.id,
                        rootStore.calendarStore.activeCompanyId,
                    );
                    window.location.pathname = `/shift-calendar/${rootStore.calendarStore.activeCompanyId}`;
                },
            });
        };

        const onDragEnd = (event: DropResult, provided: ResponderProvided) => {
            dragEndHandler(event, rootStore.shiftStore);
        };

        return (
            <div>
                <PageHeader
                    breadcrumb={
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={`/shift-calendar/${rootStore.calendarStore.activeCompanyId}`}>
                                <CalendarOutlined />
                                <span>{`Kalendar smen`}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {rootStore.shiftStore.shift?.id
                                    ? 'Smena c. ' + rootStore.shiftStore.shift.id
                                    : 'Nová směna'}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    title={
                        rootStore.companyStore.companies.find(
                            (comp) => comp.id === rootStore.calendarStore.activeCompanyId,
                        )?.name
                    }
                    subTitle={moment(rootStore.shiftStore.shift?.date).format('MMMM Do YYYY')}
                    tags={<Tag color="blue">{rootStore.shiftStore.shift?.time}</Tag>}
                    ghost={false}
                    extra={[
                        <Button onClick={saveShift} type="primary" disabled={rootStore.shiftStore.isSubmitted}>
                            Uložit
                        </Button>,
                        <Button onClick={handleDelete} danger type="primary">
                            Smazat
                        </Button>,
                    ]}
                />
                <div style={{ padding: '1.5%' }}></div>
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
                {rootStore.shiftStore.isSubmitted && (
                    <Row>
                        <ShiftSubmitResult store={rootStore.shiftStore} />
                    </Row>
                )}
            </div>
        );
    },
);
