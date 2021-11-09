import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Calendar, Empty, List, Modal, Space } from 'antd';
import React, { useEffect } from 'react';
import { RootStore } from '../stores/root-store';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    const { rootStore } = props;

    useEffect(() => {
        rootStore.shiftStore.loadShiftList(parseInt(companyId));
    }, []);

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
                            <Link to={`/shift-manager/${item.id}`}>{item.time}</Link>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
});
