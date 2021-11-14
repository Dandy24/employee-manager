import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Calendar, Empty, List, Modal } from 'antd';
import React, { useEffect } from 'react';
import { RootStore } from '../stores/root-store';
import moment from 'moment';
import { ShiftTypeEnum } from '../models/enums/shift-type-enum';
import { CalendarDateCell } from '../components/calendar/calendar-date-cell/calendar-date-cell';
import { ModalFooter } from '../components/calendar/modal-footer/modal-footer';
import { CalendarShiftListItemEdit } from '../components/calendar/calendar-shift-list/item/edit-item';
import { CalendarShiftListItemAdd } from '../components/calendar/calendar-shift-list/item/add-item';
export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

/** TODO REFACTOR !!! **/

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    const { rootStore } = props;

    useEffect(() => {
        rootStore.shiftStore.loadShiftList(parseInt(companyId));
    }, []);

    const selectShiftHandler = (): void => {
        // rootStore.calendarStore.setSelectedDate(value);
        rootStore.calendarStore.setShiftSelectOpen(true);
    };

    const selectDateHandler = (date: moment.Moment) => {
        rootStore.calendarStore.setSelectedDate(date);
    };

    const handleDelete = async (shiftId: number) => {
        await rootStore.shiftStore.deleteShift(shiftId);
    };

    const getCalendarDateCell = (date: moment.Moment): React.ReactNode => {
        return CalendarDateCell(date, rootStore.shiftStore, selectShiftHandler);
    };

    return (
        <>
            <Calendar dateFullCellRender={getCalendarDateCell} onSelect={selectDateHandler} />
            <Modal
                visible={rootStore.calendarStore.isShiftSelectOpen}
                title={`Seznam smen pro ${rootStore.calendarStore.formattedDate}`}
                centered
                footer={<ModalFooter store={rootStore} showIcon />}
                onOk={() => rootStore.calendarStore.setShiftSelectOpen(false)}
                onCancel={() => {
                    rootStore.calendarStore.setShiftSelectOpen(false);
                    rootStore.calendarStore.setShiftEditOpen(false);
                }}
            >
                {!rootStore.calendarStore.isEditOpen ? (
                    <List
                        locale={{
                            emptyText: (
                                <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />
                            ),
                        }}
                        dataSource={rootStore.shiftStore.getShiftsForDate(rootStore.calendarStore.stringDate)}
                        renderItem={(item) => (
                            <CalendarShiftListItemEdit item={item} rootStore={rootStore} handleDelete={handleDelete} />
                        )}
                    />
                ) : (
                    <List
                        locale={{
                            emptyText: (
                                <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />
                            ),
                        }}
                        dataSource={Object.entries(ShiftTypeEnum)}
                        renderItem={(item) => (
                            <CalendarShiftListItemAdd item={item} rootStore={rootStore} companyId={companyId} />
                        )}
                    />
                )}
            </Modal>
        </>
    );
});
