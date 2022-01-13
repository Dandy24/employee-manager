import { observer } from 'mobx-react-lite';
import { Col, Progress, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { EmployeeMonthlyOutputEntity } from '../../models/entities/employee-monthly-output-entity';
import { useRootStore } from '../../stores/root-store-provider';

export interface DashboardOverviewProps {
    type: 'general' | 'employee';
    data: EmployeeMonthlyOutputEntity[];
}

//TODO refactor to use data prop (overallStats)

export const DashboardOverview: React.FC<DashboardOverviewProps> = observer((props: DashboardOverviewProps) => {
    const { type, data } = props;
    const rootStore = useRootStore();

    return (
        <Row style={{ marginBottom: '3%' }}>
            <Col span={4} offset={1} data-testid="overview-working_hours-stat">
                {type === 'employee' ? (
                    <>
                        <Statistic
                            title={'Jméno zaměstnance'}
                            data-testid="overview-employee-name"
                            value={`${rootStore.employeeStore.employee.first_name} ${rootStore.employeeStore.employee.last_name}`}
                            style={{ marginTop: '5%' }}
                        />
                        <Statistic
                            title={'Pocet odpracovaných hodin'}
                            data-testid="overview-working_hours-stat-marker"
                            value={data[0]?.working_hours}
                            style={{ marginTop: '10%' }}
                            valueStyle={{ color: data[0]?.working_hours > data[1]?.working_hours ? '#3f8600' : 'red' }}
                            prefix={
                                data[0]?.working_hours > data[1]?.working_hours ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                        />
                    </>
                ) : (
                    <Statistic
                        title={'Pocet zamestnancu'}
                        data-testid={'overview-employee_count-stat'}
                        value={rootStore.employeeStore.employees.length}
                        style={{ marginTop: '20%' }}
                        // valueStyle={{ color: '#3f8600' }}
                        // prefix={
                        //     type === 'employee' && data[0]?.working_hours > data[1]?.working_hours ? (
                        //         <ArrowUpOutlined />
                        //     ) : null
                        // }
                    />
                )}
            </Col>
            <Col span={4} data-testid="overview-company_name-stat">
                {type === 'employee' ? (
                    <>
                        <Statistic
                            title={'Firma'}
                            data-testid="overview-employee-company"
                            value={
                                rootStore.companyStore.companies.find(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    (comp) => comp.id === rootStore.employeeStore.employee.company,
                                ).name
                            }
                            style={{ marginTop: '5%' }}
                        />
                        <Statistic
                            title={'Pocet nepracovanych hodin'}
                            value={data[0]?.sick_hours + data[0]?.vacation_hours}
                            style={{ marginTop: '10%' }}
                        />
                    </>
                ) : (
                    <Statistic
                        title={'Pocet firem'}
                        value={rootStore.companyStore.companies.length}
                        style={{ marginTop: '20%' }}
                    />
                )}
            </Col>
            <Col span={3}>
                {type === 'employee' ? (
                    <>
                        <div style={{ marginTop: '20%' }}></div>

                        <Statistic
                            title={'Pocet hodin prescas'}
                            value={data[0]?.overtime_hours ? data[0]?.overtime_hours : 0}
                            // valueStyle={{ color: '#3f8600' }}
                            // prefix={<ArrowUpOutlined />}
                            style={{ marginTop: '54%' }}
                        />
                    </>
                ) : (
                    <Statistic
                        title={'Pocet hodin'}
                        value={rootStore.dashboardStore.overallWorkingDaysGraphData[0]?.work}
                        valueStyle={{
                            color:
                                rootStore.dashboardStore.overallWorkingDaysGraphData[0]?.work >
                                rootStore.dashboardStore.overallWorkingDaysGraphData[1]?.work
                                    ? '#3f8600'
                                    : 'red',
                        }}
                        prefix={
                            rootStore.dashboardStore.overallWorkingDaysGraphData[0]?.work >
                            rootStore.dashboardStore.overallWorkingDaysGraphData[1]?.work ? (
                                <ArrowUpOutlined />
                            ) : (
                                <ArrowDownOutlined />
                            )
                        }
                        style={{ marginTop: '20%' }}
                    />
                )}
            </Col>

            {type === 'general' ? (
                <Col span={3} offset={3} data-testid="overview-effectivity-stat" style={{ textAlign: 'center' }}>
                    <Title level={5} style={{ textAlign: 'center' }}>
                        {'Efektivita zamestnancu'}
                    </Title>
                    <Progress
                        data-testid="overview-effectivity-stat-circle"
                        type="circle"
                        percent={rootStore.dashboardStore.overallEffectivity.at(-1)?.value}
                        strokeColor={
                            rootStore.dashboardStore.overallEffectivity.at(-1)?.value < 50
                                ? 'red'
                                : rootStore.dashboardStore.overallEffectivity.at(-1)?.value < 75
                                ? 'orange'
                                : 'green'
                        }
                    />
                </Col>
            ) : (
                <Col span={3} offset={3} data-testid="overview-effectivity-stat" style={{ textAlign: 'center' }}>
                    <Title level={5} style={{ textAlign: 'center' }}>
                        {'Efektivita zamestnance'}
                    </Title>
                    <Progress
                        data-testid="overview-effectivity-stat-circle"
                        type="circle"
                        percent={data[0]?.effectivity}
                        strokeColor={data[0]?.effectivity < 50 ? 'red' : data[0]?.effectivity < 75 ? 'orange' : 'green'}
                    />
                </Col>
            )}

            <Col span={3} style={{ textAlign: 'center' }}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    Kapacita ubytovny
                </Title>
                <Progress
                    type="circle"
                    percent={rootStore.dashboardStore.housingCapacity}
                    strokeColor={
                        rootStore.dashboardStore.housingCapacity < 60
                            ? 'green'
                            : rootStore.dashboardStore.housingCapacity < 80
                            ? 'orange'
                            : 'red'
                    }
                />
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    TODO
                </Title>
                <Progress type="circle" percent={15} strokeColor="red" />
            </Col>
        </Row>
    );
});
