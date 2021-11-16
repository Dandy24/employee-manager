import { observer } from 'mobx-react-lite';
import { Button, Col, Row, Space } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { RootStore } from '../../../stores/root-store';

export interface ModalFooterProps {
    showIcon: boolean;
    store: RootStore;
}

export const ModalFooter: React.FC<ModalFooterProps> = observer((props: ModalFooterProps) => {
    const { showIcon, store } = props;

    const handleNewShift = () => {
        store.shiftStore.openToAdd();
    };

    const handleCancel = () => {
        store.calendarStore.setShiftSelectOpen(false);
    };

    const goBack = () => {
        store.calendarStore.setShiftEditOpen(false);
    };

    return (
        <Row justify="space-between">
            <Col>
                {!store.calendarStore.isEditOpen ? (
                    <Button
                        icon={showIcon ? <PlusOutlined /> : null}
                        type="primary"
                        size="large"
                        onClick={handleNewShift}
                    >
                        Pridat smenu
                    </Button>
                ) : (
                    <Button icon={showIcon ? <ArrowLeftOutlined /> : null} type="primary" size="large" onClick={goBack}>
                        Zpet
                    </Button>
                )}
            </Col>

            <Col>
                <Button size="large" onClick={handleCancel}>
                    Zavrit
                </Button>
            </Col>
        </Row>
    );
});
