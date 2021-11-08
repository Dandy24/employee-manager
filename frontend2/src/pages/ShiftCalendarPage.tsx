import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Calendar, List, Modal, Typography } from 'antd';
import React, { useEffect } from 'react';
import { RootStore } from '../stores/root-store';
import moment from 'moment';

export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    const { rootStore } = props;
    //console.log(companyId);

    useEffect(() => {
        rootStore.shiftStore.loadShiftList(parseInt(companyId));
    }, []);

    const dateCellRender = (value) => {
        const date = moment(value).format('YYYY-MM-DD');
        const todayShift = rootStore.shiftStore.getShiftsForDate(date);
        return (
            <ul style={{ listStyle: 'none' }} onDoubleClick={selectShiftHandler}>
                {todayShift?.map((shift) => (
                    <li key={`shift-${shift.date}-${shift.time}`}>
                        <Badge status={'error'} text={shift.companyID} />
                        {shift.time}
                    </li>
                ))}
            </ul>
        );
    };

    const selectShiftHandler = (value) => {
        rootStore.shiftStore.setShiftSelectOpen(true);
        // console.log(value);
    };

    return (
        <>
            <Calendar dateCellRender={dateCellRender} />
            <Modal
                visible={rootStore.shiftStore.isShiftSelectOpen}
                title="Vertically centered modal dialog"
                centered
                onOk={() => rootStore.shiftStore.setShiftSelectOpen(false)}
                onCancel={() => rootStore.shiftStore.setShiftSelectOpen(false)}
            >
                <List
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    // bordered
                    // dataSource={rootStore.shiftStore.shiftList}
                    dataSource={rootStore.shiftStore.shiftList}
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
