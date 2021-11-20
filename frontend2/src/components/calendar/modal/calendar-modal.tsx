import React from 'react';
import { observer } from 'mobx-react-lite';
import { ModalFooter } from './modal-footer/modal-footer';
import { Modal } from 'antd';
import { CalendarStore } from '../../../stores/calendar-store';

interface CalendarModalProps {
    store: CalendarStore;
    children: React.ReactNode;
}

export const CalendarModal: React.FC<CalendarModalProps> = observer((props: CalendarModalProps) => {
    const { store, children } = props;

    return (
        <Modal
            visible={store.isShiftSelectOpen}
            title={`Seznam smen pro ${store.formattedDate}`}
            centered
            footer={<ModalFooter store={store} showIcon />}
            onOk={() => store.setShiftSelectOpen(false)}
            onCancel={() => {
                store.setShiftSelectOpen(false);
                store.setShiftEditOpen(false);
            }}
        >
            {children}
        </Modal>
    );
});
