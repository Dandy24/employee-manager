import { observer } from 'mobx-react-lite';
import { Button, Col, List, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { ShiftEntity } from '../../../../models/entities/shift-entity';
import { RootStore } from '../../../../stores/root-store';

export interface CalendarShiftListItemProps {
    item: ShiftEntity;
    handleDelete?: (any) => void;
    rootStore: RootStore;
}

export const CalendarShiftListItemEdit: React.FC<CalendarShiftListItemProps> = observer(
    (props: CalendarShiftListItemProps) => {
        const { item, handleDelete, rootStore } = props;

        const onLinkClick = () => {
            rootStore.calendarStore.setShiftEditOpen(false);
            rootStore.calendarStore.setShiftSelectOpen(false);
            rootStore.shiftStore.setIsShiftSubmitted(false);
        };

        return (
            <List.Item data-testid={`shift-${item.time}`}>
                <Row justify="space-between" style={{ width: '100%' }}>
                    <Col span={10}>
                        <Title level={5}>
                            <Link onClick={onLinkClick} to={`/shift-manager/${item.id}`}>
                                {item.time}
                            </Link>
                        </Title>
                    </Col>
                    <Col>
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
        );
    },
);
