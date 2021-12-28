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

export const DashboardOverview: React.FC<DashboardOverviewProps> = observer((props: DashboardOverviewProps) => {
    const { type, data } = props;
    const rootStore = useRootStore();

    return (
        <Row style={{ marginBottom: '3%' }}>
            <Col span={3} offset={1}>
                {type === 'employee' ? (
                    <Statistic
                        title={'Pocet odpracovaných hodin'}
                        value={data[0]?.working_hours}
                        style={{ marginTop: '20%' }}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={data[0]?.working_hours > data[1]?.working_hours ? <ArrowUpOutlined /> : null}
                    />
                ) : (
                    <Statistic
                        title={'Pocet zamestnancu'}
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
            <Col span={3}>
                {type === 'employee' ? (
                    <Statistic
                        title={'Pocet nepracovanych hodin'}
                        value={data[0]?.sick_hours + data[0]?.vacation_hours}
                        style={{ marginTop: '20%' }}
                    />
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
                    <Statistic
                        title={'Pocet hodin prescas'}
                        value={data[0]?.overtime}
                        // valueStyle={{ color: '#3f8600' }}
                        // prefix={<ArrowUpOutlined />}
                        style={{ marginTop: '20%' }}
                    />
                ) : (
                    <Statistic
                        title={'Pocet hodin'}
                        value={rootStore.dashboardStore.overallWorkingHours}
                        // valueStyle={{ color: '#3f8600' }}
                        // prefix={<ArrowUpOutlined />}
                        style={{ marginTop: '20%' }}
                    />
                )}
            </Col>
            <Col span={3} offset={5}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    {type === 'general' ? 'Efektivita zamestnancu' : 'Efektivita zamestnance'}
                </Title>
                <Progress
                    type="circle"
                    percent={
                        type === 'employee'
                            ? data[0]?.effectivity
                            : rootStore.dashboardStore.overallEffectivity[0]?.effectivity
                    }
                    strokeColor={
                        rootStore.dashboardStore.overallEffectivity[0]?.effectivity < 50
                            ? 'red'
                            : rootStore.dashboardStore.overallEffectivity[0]?.effectivity < 75
                            ? 'orange'
                            : 'green'
                    }
                />
            </Col>
            <Col span={3}>
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
            <Col span={3}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    TODO
                </Title>
                <Progress type="circle" percent={15} strokeColor="red" />
            </Col>
        </Row>
    );
});
