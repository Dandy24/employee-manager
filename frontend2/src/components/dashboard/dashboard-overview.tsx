import { observer } from 'mobx-react-lite';
import { Col, Progress, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { MonthlyOutputEntity } from '../../models/entities/monthly-output-entity';
import { useRootStore } from '../../stores/root-store-provider';

export interface DashboardOverviewProps {
    type: 'general' | 'employee';
    data: MonthlyOutputEntity[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = observer((props: DashboardOverviewProps) => {
    const { type, data } = props;
    const rootStore = useRootStore();

    return (
        <Row style={{ marginBottom: '3%' }}>
            <Col span={3} offset={1}>
                <Statistic
                    title={type === 'general' ? 'Pocet zamestnancu' : 'Pocet odpracovaných hodin'}
                    value={type === 'employee' ? data[0]?.working_hours : rootStore.employeeStore.employees.length}
                    style={{ marginTop: '20%' }}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={
                        type === 'employee' && data[0]?.working_hours > data[1]?.working_hours ? (
                            <ArrowUpOutlined />
                        ) : null
                        //     : type === 'employee' && data[0]?.working_hours === data[1]?.working_hours ? null : (
                        //     <ArrowDownOutlined />
                        // )
                    }
                />
            </Col>
            <Col span={3}>
                <Statistic
                    title={type === 'general' ? 'Pocet firem' : 'Pocet nepracovanych hodin'}
                    value={
                        type === 'employee'
                            ? parseFloat(data[0]?.sick_hours) + parseFloat(data[0]?.vacation_hours)
                            : rootStore.companyStore.companies.length
                    }
                    style={{ marginTop: '20%' }}
                />
            </Col>
            <Col span={3}>
                <Statistic
                    title={type === 'general' ? 'Pocet hodin' : 'Pocet hodin prescas'}
                    value={type === 'employee' ? data[0]?.overtime : 'TODO'}
                    // valueStyle={{ color: '#3f8600' }}
                    // prefix={<ArrowUpOutlined />}
                    style={{ marginTop: '20%' }}
                />
            </Col>
            <Col span={3} offset={5}>
                <Title level={5} style={{ textAlign: 'center' }}>
                    {type === 'general' ? 'Efektivita zamestnancu' : 'Efektivita zamestnance'}
                </Title>
                <Progress type="circle" percent={type === 'employee' ? data[0]?.effectivity : 75} strokeColor="green" />
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
