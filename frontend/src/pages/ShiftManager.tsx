import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Breadcrumb, Button, Col, Modal, PageHeader, Row, Tag } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import { dragEndHandler } from '../utils/drag-end-handler';
import { CalendarOutlined, ExclamationCircleOutlined, HomeOutlined, SwapOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ShiftSubmitResult } from '../components/shift-manager/shift-submit-result';
import { PlannerTable } from '../components/table/planner-table';
import { EmployeeTableColumns } from '../components/table/tableColumns/EmployeeTableColumns';

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
                if (!rootStore.shiftStore.isRedirected) {
                    await rootStore.employeeStore.fetchAllEmployees();
                }
                if (shiftId) {
                    rootStore.shiftStore.setShift(shiftId);
                    await rootStore.shiftStore.loadShiftEmployees(shiftId);
                }
                if (!rootStore.shiftStore.isRedirected) {
                    rootStore.shiftStore.setShift();
                    await rootStore.shiftStore.loadShiftEmployees();
                }
                await rootStore.shiftStore.loadShiftList(rootStore.shiftStore.shift.companyID);
                rootStore.shiftStore.setShiftsForDate(rootStore.shiftStore.shift.date);
                if (rootStore.companyStore.companies.length < 1) {
                    rootStore.companyStore.companies.push(JSON.parse(localStorage.getItem('company')));
                }

                await rootStore.shiftStore.loadAvailableEmployees();
            })();
        }, []);

        const saveShift = async () => {
            await rootStore.shiftStore.saveShift(rootStore.shiftStore.shift);
        };

        const handleDelete = async () => {
            confirm({
                title: 'Opravdu chcete smazat tuto sm??nu?',
                icon: <ExclamationCircleOutlined />,
                content: 'Tuto akci nelze vr??tit zp??t',
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

        const onDragEnd = (event: DropResult) => {
            dragEndHandler(event, rootStore.shiftStore);
        };

        return (
            <div>
                <PageHeader
                    breadcrumb={
                        <Breadcrumb data-testid="shift-manager-header-breadcrumb">
                            <Breadcrumb.Item>
                                <Link to={'/'}>
                                    <HomeOutlined />
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link
                                    to={`/shift-calendar/${
                                        rootStore.calendarStore.activeCompanyId
                                            ? rootStore.calendarStore.activeCompanyId
                                            : JSON.parse(localStorage.getItem('shift')).companyID
                                    }`}
                                >
                                    <CalendarOutlined />
                                    <span>{`Kalend???? sm??n`}</span>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {rootStore.shiftStore.shift?.id
                                    ? 'Sm??na ??. ' + rootStore.shiftStore.shift.id
                                    : 'Nov?? sm??na'}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    title={
                        rootStore.companyStore.companies.find((comp) =>
                            comp.id === rootStore.calendarStore.activeCompanyId
                                ? rootStore.calendarStore.activeCompanyId
                                : JSON.parse(localStorage.getItem('shift')).companyID,
                        )?.name
                    }
                    data-testid="shift-manager-header"
                    subTitle={moment(rootStore.shiftStore.shift?.date).format('MMMM Do YYYY')}
                    tags={<Tag color="blue">{rootStore.shiftStore.shift?.time}</Tag>}
                    ghost={false}
                    extra={[
                        <Button
                            key={'submit-shift-button'}
                            onClick={saveShift}
                            data-testid={'submit-shift-button'}
                            type="primary"
                            disabled={
                                (rootStore.shiftStore.isSubmitted &&
                                    rootStore.shiftStore.shiftEditResult === 'success') ||
                                rootStore.shiftStore.shiftEmployees.length === 0
                            }
                        >
                            Ulo??it
                        </Button>,
                        <Button
                            key={'delete-shift-button'}
                            data-testid={'delete-shift-button'}
                            onClick={handleDelete}
                            danger
                            type="primary"
                        >
                            Smazat
                        </Button>,
                    ]}
                />
                <div style={{ padding: '1.5%' }}></div>
                <Row justify="space-between" data-testid="shift-manager">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Col span={11}>
                            <PlannerTable
                                tableData={rootStore.shiftStore.availableEmployees}
                                tableCols={EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore, null)}
                                type="employee"
                            />
                        </Col>

                        <Col style={{ marginTop: '10%' }}>
                            <SwapOutlined />
                        </Col>

                        <Col span={11}>
                            <PlannerTable
                                tableData={rootStore.shiftStore.shiftEmployees}
                                tableCols={EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore)}
                                type="shift"
                            />
                        </Col>
                    </DragDropContext>
                </Row>
                {rootStore.shiftStore.isSubmitted && (
                    <Row justify="center">
                        <ShiftSubmitResult store={rootStore.shiftStore} />
                    </Row>
                )}
            </div>
        );
    },
);
