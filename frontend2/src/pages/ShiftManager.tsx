import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Breadcrumb, Button, Col, Modal, PageHeader, Row, Tag } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { EmpTable } from './tables/employee-table';
import { ShiftTable } from './tables/shift-table';
import { Redirect, useParams } from 'react-router-dom';
import { dragEndHandler } from '../services/drag-end-handler';
import {
    CalendarOutlined,
    ExclamationCircleOutlined,
    HomeOutlined,
    SwapOutlined,
    UserOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { CompanyEntity } from '../models/entities/company-entity';

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

        const company = rootStore.companyStore.companies.find(
            (comp) => comp.id === rootStore.shiftStore.shift?.companyID,
        );

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
                    await rootStore.shiftStore.deleteShift(rootStore.shiftStore.shift.id, company.id);
                    window.location.pathname = `/shift-calendar/${company?.id}`;
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
                            <Breadcrumb.Item href={`/shift-calendar/${company?.id}`}>
                                <CalendarOutlined />
                                <span>{`Kalendar smen`}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{`Smena c. ${rootStore.shiftStore.shift?.id}`}</Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    title={company?.name}
                    subTitle={moment(rootStore.shiftStore.shift?.date).format('MMMM Do YYYY')}
                    tags={<Tag color="blue">{rootStore.shiftStore.shift?.time}</Tag>}
                    ghost={false}
                    extra={[
                        <Button onClick={saveShift} type="primary">
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
            </div>
        );
    },
);
