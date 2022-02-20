import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Calendar, Empty, List, Modal, PageHeader } from 'antd';
import React, { useEffect } from 'react';
import { RootStore } from '../stores/root-store';
import moment from 'moment';
import { ShiftTypeEnum } from '../models/enums/shift-type-enum';
import { CalendarDateCell } from '../components/calendar/calendar-date-cell/calendar-date-cell';
import { CalendarShiftListItemEdit } from '../components/calendar/calendar-shift-list/item/edit-item';
import { CalendarShiftListItemAdd } from '../components/calendar/calendar-shift-list/item/add-item';
import { CalendarModal } from '../components/calendar/modal/calendar-modal';
import { CalendarOutlined, ExclamationCircleOutlined, HomeOutlined } from '@ant-design/icons';
export interface ShiftCalendarPageProps {
    rootStore: RootStore;
}

/** TODO REFACTOR !!! **/

export const ShiftCalendarPage: React.FC<ShiftCalendarPageProps> = observer((props: ShiftCalendarPageProps) => {
    const { companyId } = useParams<{ companyId: string }>();
    const { rootStore } = props;

    const { confirm } = Modal;

    rootStore.calendarStore.setActiveCompanyId(parseInt(companyId));

    useEffect(() => {
        (async () => {
            await rootStore.shiftStore.loadShiftList(rootStore.calendarStore.activeCompanyId);
            if (rootStore.companyStore.companies.length > 1) {
                localStorage.setItem(
                    'company',
                    JSON.stringify(rootStore.companyStore.companies.find((comp) => comp.id === parseInt(companyId))),
                );
            } else {
                rootStore.companyStore.getCompaniesFromStorage();
            }
        })();
    }, []);

    const selectShiftHandler = (date): void => {
        rootStore.shiftStore.setShiftsForDate(date);
        rootStore.calendarStore.setShiftSelectOpen(true);
    };

    const selectDateHandler = (date: moment.Moment) => {
        rootStore.calendarStore.setSelectedDate(date);
    };

    const handleDelete = async (shiftId: number) => {
        confirm({
            title: 'Opravdu chcete smazat tuto směnu?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tuto akci nelze vrátit zpět',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            async onOk() {
                await rootStore.shiftStore.deleteShift(shiftId, rootStore.calendarStore.activeCompanyId);
            },
        });
    };

    const getCalendarDateCell = (date: moment.Moment): React.ReactNode => {
        return CalendarDateCell(date, rootStore.shiftStore, selectShiftHandler);
    };

    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/'}>
                                <HomeOutlined />
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <CalendarOutlined />
                            <span>{`Kalendář směn`}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
                title={
                    <div data-testid="header-company-name">
                        {
                            rootStore.companyStore.companies.find(
                                (comp) => comp.id === rootStore.calendarStore.activeCompanyId,
                            )?.name
                        }
                    </div>
                }
                //subTitle={moment(rootStore.shiftStore.shift?.date).format('MMMM Do YYYY')}
                //tags={<Tag color="blue">{rootStore.shiftStore.shift?.time}</Tag>}
                ghost={false}
                // extra={[
                //     <Button onClick={saveShift} type="primary">
                //         Uložit
                //     </Button>,
                //     <Button onClick={handleDelete} danger type="primary">
                //         Smazat
                //     </Button>,
                // ]}
            />
            <div style={{ padding: '1.5%' }}></div>
            <Calendar
                data-testid="shift-calendar"
                dateFullCellRender={rootStore.shiftStore.shiftList ? getCalendarDateCell : null}
                onSelect={selectDateHandler}
            />
            <CalendarModal store={rootStore.calendarStore}>
                {!rootStore.calendarStore.isEditOpen ? (
                    <List
                        locale={{
                            emptyText: (
                                <Empty description="Replace this text" image="https://joeschmoe.io/api/v1/random" />
                            ),
                        }}
                        dataSource={rootStore.shiftStore.shiftListForDay}
                        renderItem={(item) => (
                            <CalendarShiftListItemEdit item={item} rootStore={rootStore} handleDelete={handleDelete} />
                        )}
                    />
                ) : (
                    <List
                        data-testid="create-shift-list"
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
            </CalendarModal>
        </>
    );
});
