import { observer } from 'mobx-react-lite';
import { Col, Progress, Row, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { MonthlyOutputEntity } from '../../models/entities/monthly-output-entity';
import { useRootStore } from '../../stores/root-store-provider';

export interface DashboardOverviewProps {
    type: 'general' | 'employee';
    data: MonthlyOutputEntity;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = observer((props: DashboardOverviewProps) => {
    const { type, data } = props;
    const rootStore = useRootStore();

    return (
        <Row style={{ marginBottom: '3%' }}>
            <Col span={3} offset={1}>
                <Statistic
                    title={type === 'general' ? 'Pocet zamestnancu' : 'Pocet odpracovaných hodin'}
                    value={type === 'employee' ? data?.working_hours : rootStore.employeeStore.employees.length}
                    style={{ marginTop: '20%' }}
                />
            </Col>
            <Col span={3}>
                <Statistic
                    title={type === 'general' ? 'Pocet firem' : 'Pocet nepracovanych hodin'}
                    value={
                        type === 'employee'
                            ? parseFloat(data?.sick_hours) + parseFloat(data?.vacation_hours)
                            : rootStore.companyStore.companies.length
                    }
                    style={{ marginTop: '20%' }}
                />
            </Col>
            <Col span={3}>
                <Statistic
                    title={type === 'general' ? 'Pocet hodin' : 'Pocet prescasu'}
                    value={type === 'employee' ? data?.overtime : 'TODO'}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    style={{ marginTop: '20%' }}
                />
            </Col>
            <Col span={3} offset={5}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    {type === 'general' ? 'Efektivita zamestnancu' : 'Efektivita zamestnance'}
                </Title>
                <Progress type="circle" percent={type === 'employee' ? data?.effectivity : 75} strokeColor="green" />
            </Col>
            <Col span={3}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    Kapacita ubytovny
                </Title>
                <Progress type="circle" percent={65} strokeColor="orange" />
            </Col>
            <Col span={3}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    Kapacita ubytovny
                </Title>
                <Progress type="circle" percent={15} strokeColor="red" />
            </Col>
        </Row>
    );
});
