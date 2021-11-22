import { observer } from 'mobx-react-lite';
import { Col, List, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import React from 'react';
import { RootStore } from '../../../../stores/root-store';
import Text from 'antd/lib/typography/Text';
import { ShiftTypeEnum } from '../../../../models/enums/shift-type-enum';

export interface CalendarShiftListItemAddProps {
    item: [string, ShiftTypeEnum]; //FIXME
    rootStore: RootStore;
    companyId?: string;
}

export const CalendarShiftListItemAdd: React.FC<CalendarShiftListItemAddProps> = observer(
    (props: CalendarShiftListItemAddProps) => {
        const { item, rootStore, companyId } = props;

        const onLinkClick = () => {
            rootStore.shiftStore.addShift(item[1], parseInt(companyId));
            rootStore.calendarStore.setShiftEditOpen(false);
            rootStore.calendarStore.setShiftSelectOpen(false);
        };

        return (
            <List.Item>
                <Row justify="space-between" style={{ width: '100%' }}>
                    {rootStore.shiftStore.shiftList.find(
                        (shift) => shift.time === item[1] && shift.date === rootStore.calendarStore.stringDate,
                    ) ? (
                        <Col span={20} flex="auto">
                            <Title level={5}>
                                <Text data-testid={`new-shift-${item[0]}`} disabled>
                                    {item[0]}
                                </Text>
                            </Title>
                        </Col>
                    ) : (
                        <Col span={20} flex="auto">
                            <Title level={5}>
                                <Link to={`/shift-manager`} data-testid={`new-shift-${item[0]}`} onClick={onLinkClick}>
                                    {item[0]}
                                </Link>
                            </Title>
                        </Col>
                    )}
                </Row>
            </List.Item>
        );
    },
);
