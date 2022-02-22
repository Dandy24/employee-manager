import { observer } from 'mobx-react-lite';
import { Button, Col, Row } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { CalendarStore } from '../../../../stores/calendar-store';

export interface ModalFooterProps {
    showIcon: boolean;
    store: CalendarStore;
}

export const ModalFooter: React.FC<ModalFooterProps> = observer((props: ModalFooterProps) => {
    const { showIcon, store } = props;

    const handleNewShift = () => {
        store.openToAdd();
    };

    const handleCancel = () => {
        store.setShiftSelectOpen(false);
    };

    const goBack = () => {
        store.setShiftEditOpen(false);
    };

    return (
        <Row justify="space-between">
            <Col>
                {!store.isEditOpen ? (
                    <Button
                        icon={showIcon ? <PlusOutlined /> : null}
                        type="primary"
                        size="large"
                        onClick={handleNewShift}
                        data-testid="shift-add-button"
                    >
                        Přidat směnu
                    </Button>
                ) : (
                    <Button icon={showIcon ? <ArrowLeftOutlined /> : null} type="primary" size="large" onClick={goBack}>
                        Zpět
                    </Button>
                )}
            </Col>

            <Col>
                <Button size="large" onClick={handleCancel}>
                    Zavřít
                </Button>
            </Col>
        </Row>
    );
});
