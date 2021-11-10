import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Calendar, Col, Empty, List, Modal, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { RootStore } from '../stores/root-store';
import moment from 'moment';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    const { rootStore } = props;

    useEffect(() => {
        rootStore.shiftStore.loadShiftList(parseInt(companyId));
    }, [rootStore.shiftStore, rootStore.shiftStore.shiftList]);

    const dateCellRender = (value: moment.Moment) => {
        const date = moment(value).format('YYYY-MM-DD');
        const day = moment(value).format('DD');
        const todayShift = rootStore.shiftStore.getShiftsForDate(date);
        return (
            <div className="ant-picker-cell-inner ant-picker-calendar-date" onDoubleClick={selectShiftHandler}>
                <div className="ant-picker-calendar-date-value">{day}</div>
                <div className="ant-picker-calendar-date-content">
                    <ul style={{ listStyle: 'none' }}>
                        {todayShift?.map((shift) => (
                            <li key={`shift-${shift.date}-${shift.time}`}>
                                <Badge status={'error'} text={shift.companyID} />
                                {shift.time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    const selectShiftHandler = (value) => {
        // rootStore.calendarStore.setSelectedDate(value);
        rootStore.shiftStore.setShiftSelectOpen(true);
    };

    const handleNewShift = (e) => {
        // console.log(rootStore.calendarStore.selectedDate);
    };

    const selectDateHandler = (date: moment.Moment) => {
        rootStore.calendarStore.setSelectedDate(date);
    };

    const handleDelete = async (shiftId: number) => {
        await rootStore.shiftStore.deleteShift(shiftId);
        // rootStore.shiftStore.setShiftSelectOpen(true);
    };

    return (
        <>
            <Calendar dateFullCellRender={dateCellRender} onSelect={selectDateHandler} />
            <Modal
                visible={rootStore.shiftStore.isShiftSelectOpen}
                title={`Seznam smen pro ${rootStore.calendarStore.formattedDate}`}
                centered
                footer={
                    <Space>
                        <Button icon={<PlusOutlined />} type="primary" size="large" onClick={handleNewShift}>
                            Pridat smenu
                        </Button>
                        <Button size="large" onClick={() => rootStore.shiftStore.setShiftSelectOpen(false)}>
                            Zavrit
                        </Button>
                    </Space>
                }
                onOk={() => rootStore.shiftStore.setShiftSelectOpen(false)}
                onCancel={() => rootStore.shiftStore.setShiftSelectOpen(false)}
            >
                <List
                    locale={{
                        emptyText: <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />,
                    }}
                    dataSource={rootStore.shiftStore.getShiftsForDate(rootStore.calendarStore.stringDate)}
                    renderItem={(item) => (
                        <List.Item>
                            <Row justify="space-between">
                                <Col span={20} flex="auto">
                                    <Title level={5}>
                                        <Link to={`/shift-manager/${item.id}`}>{item.time}</Link>
                                    </Title>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        size="large"
                                        icon={<DeleteOutlined />}
                                        type="primary"
                                        danger
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
});
