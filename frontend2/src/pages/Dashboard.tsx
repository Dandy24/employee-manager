import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import Title from 'antd/lib/typography/Title';
import { SearchComponent } from '../components/search/search-component';
import { toJS } from 'mobx';
import { RootStore } from '../stores/root-store';
import { DashboardOverview } from '../components/dashboard/dashboard-overview';
import { MyLineChart } from '../components/dashboard/charts/line-chart';
import { MyAreaChart } from '../components/dashboard/charts/area-chart';
import { MyPieChart } from '../components/dashboard/charts/pie-chart';

interface DashboardProps {
    rootStore: RootStore;
}

export const Dashboard: React.FC<DashboardProps> = observer((props: DashboardProps) => {
    const { rootStore } = props;

    useEffect(() => {
        (async () => {
            await rootStore.companyStore.fetchAllCompanies();
            rootStore.searchStore.createSearchableCompanies();
            await rootStore.dashboardStore.loadEmployeeOutput(34);
        })();
    }, []);

    const data3 = [
        { name: 'Group A', uv: 400, pv: 500 },
        { name: 'Group B', uv: 300, pv: 600 },
        { name: 'Group C', uv: 300, pv: 400 },
        { name: 'Group D', uv: 200, pv: 700 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <>
            <Row justify="center" style={{ marginBottom: '2%' }}>
                <Col>
                    <SearchComponent options={toJS(rootStore.searchStore.searchableCompanies)} />
                </Col>
            </Row>
            <Card title="Obecny prehled" headStyle={{ textAlign: 'center', fontSize: '22px' }}>
                {/*FIXME data loading*/}
                {rootStore.dashboardStore.employeeOutput && (
                    <DashboardOverview type={'employee'} data={rootStore.dashboardStore.employeeOutput} />
                )}
                {/*<DashboardOverview type={'employee'} data={rootStore.dashboardStore.employeeOutput} />*/}
                {/*<Row style={{ marginBottom: '3%' }}>*/}
                {/*    <Col span={3} offset={1}>*/}
                {/*        <Statistic title="Pocet zamestnancu" value={112} style={{ marginTop: '20%' }} />*/}
                {/*    </Col>*/}
                {/*    <Col span={3}>*/}
                {/*        <Statistic title="Pocet firem" value={12} style={{ marginTop: '20%' }} />*/}
                {/*    </Col>*/}
                {/*    <Col span={3}>*/}
                {/*        <Statistic*/}
                {/*            title="Pocet hodin"*/}
                {/*            value={1687}*/}
                {/*            valueStyle={{ color: '#3f8600' }}*/}
                {/*            prefix={<ArrowUpOutlined />}*/}
                {/*            style={{ marginTop: '20%' }}*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*    <Col span={3} offset={5}>*/}
                {/*        <Title level={5} style={{ textAlign: 'center' }}>*/}
                {/*            Efektivita zamestnancu*/}
                {/*        </Title>*/}
                {/*        <Progress type="circle" percent={75} strokeColor="green" />*/}
                {/*    </Col>*/}
                {/*    <Col span={3}>*/}
                {/*        <Title level={5} style={{ textAlign: 'center' }}>*/}
                {/*            Kapacita ubytovny*/}
                {/*        </Title>*/}
                {/*        <Progress type="circle" percent={65} strokeColor="orange" />*/}
                {/*    </Col>*/}
                {/*    <Col span={3}>*/}
                {/*        <Title level={5} style={{ textAlign: 'center' }}>*/}
                {/*            Kapacita ubytovny*/}
                {/*        </Title>*/}
                {/*        <Progress type="circle" percent={15} strokeColor="red" />*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row style={{ height: '400px' }}>
                    {/*<Col span={16} style={{ height: '90%' }}>*/}
                    {/*    <Title level={2} style={{ textAlign: 'center' }}>*/}
                    {/*        h2. Ant Design*/}
                    {/*    </Title>*/}
                    {/*    <ResponsiveContainer width="100%" height="90%">*/}
                    {/*        <LineChart*/}
                    {/*            width={600}*/}
                    {/*            height={250}*/}
                    {/*            data={data3}*/}
                    {/*            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}*/}
                    {/*        >*/}
                    {/*            <CartesianGrid strokeDasharray="3 3" />*/}
                    {/*            <XAxis dataKey="name" />*/}
                    {/*            <YAxis />*/}
                    {/*            <Tooltip />*/}
                    {/*            <Legend />*/}
                    {/*            <Line type="monotone" dataKey="pv" stroke="#8884d8" />*/}
                    {/*            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
                    {/*        </LineChart>*/}
                    {/*    </ResponsiveContainer>*/}
                    {/*</Col>*/}

                    <MyLineChart
                        title="Vývoj pracovního nasazení"
                        data={
                            rootStore.dashboardStore.employeeOutput
                                ? rootStore.dashboardStore.workingDaysGraphData
                                : null
                        }
                        dataKey1="work"
                        dataKey2="vac"
                        dataName1="Hours worked"
                        dataName2="Hours out"
                        xAxisKey="name"
                    />

                    {rootStore.dashboardStore.employeeOutput && (
                        <MyPieChart
                            title="Rozlozeni hodin"
                            data={rootStore.dashboardStore.hoursDistributionGraphData}
                            dataKey="hours"
                            dataName="name"
                            colors={COLORS}
                        />
                    )}

                    {/*<Col style={{ width: '30%', height: '100%' }}>*/}
                    {/*    <Title level={2} style={{ textAlign: 'center' }}>*/}
                    {/*        h2. Ant Design*/}
                    {/*    </Title>*/}
                    {/*    <ResponsiveContainer width="100%" height="85%">*/}
                    {/*        <PieChart width={300} height={200} margin={{ top: 0, right: 0, bottom: 50, left: 0 }}>*/}
                    {/*            <Pie*/}
                    {/*                data={data2}*/}
                    {/*                cy={160}*/}
                    {/*                innerRadius={70}*/}
                    {/*                outerRadius={100}*/}
                    {/*                fill="#8884d8"*/}
                    {/*                paddingAngle={3}*/}
                    {/*                dataKey="value"*/}
                    {/*            >*/}
                    {/*                {data2.map((entry, index) => (*/}
                    {/*                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />*/}
                    {/*                ))}*/}
                    {/*            </Pie>*/}
                    {/*            <Legend />*/}
                    {/*            <Tooltip />*/}
                    {/*        </PieChart>*/}
                    {/*    </ResponsiveContainer>*/}
                    {/*</Col>*/}
                </Row>

                <Row style={{ height: '400px' }}>
                    {rootStore.dashboardStore.employeeOutput && (
                        <MyAreaChart
                            data={rootStore.dashboardStore.effectivityGraphData}
                            xAxisKey="name"
                            dataKey1="effectivity"
                            dataName1="Effectivity"
                            title="Vyvoj efektivity"
                        />
                    )}
                    {/*<Col style={{ width: '50%', height: '100%' }}>*/}
                    {/*    <Title level={2} style={{ textAlign: 'center' }}>*/}
                    {/*        h2. Ant Design*/}
                    {/*    </Title>*/}
                    {/*    <ResponsiveContainer width="100%" height="90%">*/}
                    {/*        <AreaChart*/}
                    {/*            width={500}*/}
                    {/*            height={400}*/}
                    {/*            data={data3}*/}
                    {/*            margin={{*/}
                    {/*                top: 10,*/}
                    {/*                right: 30,*/}
                    {/*                left: 0,*/}
                    {/*                bottom: 0,*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <CartesianGrid strokeDasharray="3 3" />*/}
                    {/*            <XAxis dataKey="name" />*/}
                    {/*            <YAxis />*/}
                    {/*            <Tooltip />*/}
                    {/*            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />*/}
                    {/*        </AreaChart>*/}
                    {/*    </ResponsiveContainer>*/}
                    {/*</Col>*/}

                    <Col style={{ width: '50%', height: '108%' }}>
                        <Title level={2} style={{ textAlign: 'center' }}>
                            h2. Ant Design
                        </Title>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data3}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Card>
        </>
    );
});
