import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Calendar, Col, Empty, List, Modal, Row, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { RootStore } from '../stores/root-store';
import moment from 'moment';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { ShiftTypeEnum } from '../models/enums/shift-type-enum';
import Text from 'antd/lib/typography/Text';
export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

/** TODO REFACTOR !!! **/

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    const { rootStore } = props;

    // useEffect(() => {
    //     rootStore.shiftStore.loadShiftList(parseInt(companyId));
    // }, [rootStore.shiftStore, rootStore.shiftStore.shiftList]);

    useEffect(() => {
        rootStore.shiftStore.loadShiftList(parseInt(companyId));
    }, []);

    const dateCellRender = (value: moment.Moment) => {
        const date = moment(value).format('YYYY-MM-DD');
        const day = moment(value).format('DD');
        const todayShift = rootStore.shiftStore.getShiftsForDate(date);
        return (
            <div className="ant-picker-cell-inner ant-picker-calendar-date" onDoubleClick={selectShiftHandler}>
                <div className="ant-picker-calendar-date-value">{day}</div>
                <div className="ant-picker-calendar-date-content">
                    <ul style={{ listStyle: 'none' }}>
                        {todayShift?.map((shift) => (
                            <li key={`shift-${shift.date}-${shift.time}`}>
                                <Badge status={'error'} />
                                {shift.time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    const selectShiftHandler = (value) => {
        // rootStore.calendarStore.setSelectedDate(value);
        rootStore.shiftStore.setShiftSelectOpen(true);
    };

    const handleNewShift = (e) => {
        rootStore.shiftStore.openToAdd();
    };

    const selectDateHandler = (date: moment.Moment) => {
        rootStore.calendarStore.setSelectedDate(date);
    };

    const handleDelete = async (shiftId: number) => {
        await rootStore.shiftStore.deleteShift(shiftId);
        // rootStore.shiftStore.setShiftSelectOpen(true);
    };

    return (
        <>
            <Calendar dateFullCellRender={dateCellRender} onSelect={selectDateHandler} />
            <Modal
                visible={rootStore.shiftStore.isShiftSelectOpen}
                title={`Seznam smen pro ${rootStore.calendarStore.formattedDate}`}
                centered
                footer={
                    <Space>
                        <Button icon={<PlusOutlined />} type="primary" size="large" onClick={handleNewShift}>
                            Pridat smenu
                        </Button>
                        <Button size="large" onClick={() => rootStore.shiftStore.setShiftSelectOpen(false)}>
                            Zavrit
                        </Button>
                    </Space>
                }
                onOk={() => rootStore.shiftStore.setShiftSelectOpen(false)}
                onCancel={() => rootStore.shiftStore.setShiftSelectOpen(false)}
            >
                {!rootStore.shiftStore.isEditOpen && (
                    <List
                        locale={{
                            emptyText: (
                                <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />
                            ),
                        }}
                        dataSource={rootStore.shiftStore.getShiftsForDate(rootStore.calendarStore.stringDate)}
                        renderItem={(item) => (
                            <List.Item>
                                <Row justify="space-between">
                                    <Col span={20} flex="auto">
                                        <Title level={5}>
                                            <Link to={`/shift-manager/${item.id}`}>{item.time}</Link>
                                        </Title>
                                    </Col>
                                    <Col span={4}>
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
                        )}
                    />
                )}

                {console.log(rootStore.shiftStore.shiftList)}

                {rootStore.shiftStore.isEditOpen && (
                    <List
                        locale={{
                            emptyText: (
                                <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />
                            ),
                        }}
                        dataSource={Object.entries(ShiftTypeEnum)}
                        renderItem={(item) => (
                            <List.Item>
                                <Row justify="space-between">
                                    {rootStore.shiftStore.shiftList.find(
                                        (shift) =>
                                            shift.time === item[1] && shift.date === rootStore.calendarStore.stringDate,
                                    ) ? (
                                        <Col span={20} flex="auto">
                                            <Title level={5}>
                                                <Text disabled>{item[0]}</Text>
                                            </Title>
                                        </Col>
                                    ) : (
                                        <Col span={20} flex="auto">
                                            <Title level={5}>
                                                <Link
                                                    to={`/shift-manager`}
                                                    onClick={() =>
                                                        rootStore.shiftStore.addShift(item[1], parseInt(companyId))
                                                    }
                                                >
                                                    {item[0]}
                                                </Link>
                                            </Title>
                                        </Col>
                                    )}

                                    {/*<Col span={4}>*/}
                                    {/*    <Button*/}
                                    {/*        size="large"*/}
                                    {/*        icon={<DeleteOutlined />}*/}
                                    {/*        type="primary"*/}
                                    {/*        danger*/}
                                    {/*        onClick={() => handleDelete(1)}*/}
                                    {/*    />*/}
                                    {/*</Col>*/}
                                </Row>
                            </List.Item>
                        )}
                    />
                )}
            </Modal>
        </>
    );
});
