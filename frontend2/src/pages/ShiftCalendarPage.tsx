import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Calendar } from 'antd';
import React from 'react';
import { RootStore } from '../stores/root-store';

export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    console.log(companyId);
    return <Calendar />;
});
