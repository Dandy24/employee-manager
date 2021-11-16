import { observer } from 'mobx-react-lite';
import { Empty, List } from 'antd';
import React from 'react';
import { RootStore } from '../../../stores/root-store';

export interface CalendarShiftListProps {
    rootStore: RootStore;
    handleDelete?: (e) => void;
    deleteButton?: boolean;
}

export const CalendarShiftList: React.FC<CalendarShiftListProps> = observer((props: CalendarShiftListProps) => {
    const { rootStore, handleDelete, deleteButton } = props;

    return (
        <List
            locale={{
                emptyText: <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />,
            }}
            // dataSource={rootStore.shiftStore.getShiftsForDate(rootStore.calendarStore.stringDate)}
            // renderItem={(item) => (
            //     <CalendarShiftListItem
            //         item={item}
            //         deleteButton={deleteButton}
            //         handleDelete={handleDelete}
            //         rootStore={rootStore}
            //     />
            // )}
        />
    );
});
