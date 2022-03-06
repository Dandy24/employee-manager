import moment from 'moment';
import { Badge } from 'antd';
import React from 'react';
import { ShiftStore } from '../../../stores/shift-store';
import { ShiftTypeEnum } from '../../../models/enums/shift-type-enum';

export function CalendarDateCell(
    selectedDate: moment.Moment,
    store: ShiftStore,
    shiftSelectHandler: (date: string) => void,
): React.ReactNode {
    const date = moment(selectedDate).format('YYYY-MM-DD');
    const day = moment(date).format('DD');
    const todayShift = store.shiftList?.filter((shift) => shift.date === date);
    return (
        <div className="ant-picker-cell-inner ant-picker-calendar-date" onDoubleClick={() => shiftSelectHandler(date)}>
            <div className="ant-picker-calendar-date-value">{day}</div>
            <div className="ant-picker-calendar-date-content">
                <ul style={{ listStyle: 'none' }} data-testid={`shift-list-for-${date}`}>
                    {todayShift?.map((shift) => (
                        <li key={`shift-${shift.date}-${shift.time}`}>
                            <Badge
                                data-testid={`shift-${shift.date}-${shift.time}-badge`}
                                status={
                                    shift.time === ShiftTypeEnum.Rano
                                        ? 'warning'
                                        : shift.time === ShiftTypeEnum.Odpoledne
                                        ? 'success'
                                        : 'error'
                                }
                            />
                            {shift.time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
