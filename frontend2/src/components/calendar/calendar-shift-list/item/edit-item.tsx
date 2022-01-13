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
            <List.Item>
                <Row justify="space-between" style={{ width: '100%' }} data-testid={`shift-${item.time}`}>
                    <Col span={21}>
                        <Link
                            data-testid={`shift-${item.time}-link`}
                            onClick={onLinkClick}
                            to={`/shift-manager/${item.id}`}
                        >
                            <Title level={5}>
                                <a>{item.time}</a>
                            </Title>
                        </Link>
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
