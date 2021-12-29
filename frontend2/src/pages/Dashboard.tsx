import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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

    //FIXME console errors

    useEffect(() => {
        (async () => {
            if (rootStore.dashboardStore.employeeMode) {
                await rootStore.dashboardStore.loadEmployeeOutput(rootStore.employeeStore.employee.id);
            } else {
                await rootStore.companyStore.fetchAllCompanies();
                await rootStore.employeeStore.fetchAllEmployees();
                rootStore.searchStore.createSearchableEmployees();
                await rootStore.dashboardStore.loadOverallOutput();
                await rootStore.dashboardStore.loadHoursByCompany();
            }
        })();
    }, [rootStore.dashboardStore.employeeMode]);

    const data3 = [
        { name: 'Group A', uv: 400, pv: 500 },
        { name: 'Group B', uv: 300, pv: 600 },
        { name: 'Group C', uv: 300, pv: 400 },
        { name: 'Group D', uv: 200, pv: 700 },
    ];

    const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F'];

    return (
        <>
            <Row justify="center" style={{ marginBottom: '2%' }}>
                <Col>
                    {!rootStore.dashboardStore.employeeMode ? (
                        <SearchComponent type="employee" options={toJS(rootStore.searchStore.searchableEmployees)} />
                    ) : (
                        <Button
                            onClick={() => {
                                rootStore.dashboardStore.switchMode();
                            }}
                            type="primary"
                        >
                            Zpet na obecny prehled
                        </Button>
                    )}
                </Col>
            </Row>

            <Card
                title={rootStore.dashboardStore.employeeMode ? 'Mesicni prehled zamestnance' : 'Obecny mesicni prehled'}
                headStyle={{ textAlign: 'center', fontSize: '22px' }}
            >
                {/*FIXME data loading*/}
                {rootStore.dashboardStore.employeeOutput &&
                    rootStore.dashboardStore.overallOutput &&
                    (rootStore.dashboardStore.employeeMode ? (
                        <DashboardOverview type={'employee'} data={rootStore.dashboardStore.employeeOutput} />
                    ) : (
                        <DashboardOverview type={'general'} data={rootStore.dashboardStore.employeeOutput} />
                    ))}
                <Row style={{ height: '400px' }}>
                    {/*FIXME datumy grafu jsou v opacnem poradi (graf jde ze soucasnosti do minulosti)*/}

                    {rootStore.dashboardStore.employeeMode ? (
                        <MyLineChart
                            title="Vývoj pracovního nasazení"
                            data={rootStore.dashboardStore.workingDaysGraphData}
                            dataKey1="work"
                            dataKey2="vac"
                            dataName1="Hours worked"
                            dataName2="Hours out"
                            xAxisKey="name"
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput && (
                            <MyLineChart
                                title="Vývoj pracovního nasazení"
                                data={rootStore.dashboardStore.overallWorkingDaysGraphData}
                                dataKey1="work"
                                dataKey2="vac"
                                dataName1="Hours worked"
                                dataName2="Hours out"
                                xAxisKey="name"
                            />
                        )
                    )}

                    {/*FIXME nefunguje zobrazeni hodin podle spolecnosti (companyHours)*/}
                    {rootStore.dashboardStore.employeeOutput && rootStore.dashboardStore.employeeMode ? (
                        <MyPieChart
                            title="Rozlozeni hodin"
                            data={rootStore.dashboardStore.hoursDistributionGraphData}
                            dataKey="hours"
                            dataName="name"
                            colors={COLORS}
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput &&
                        rootStore.dashboardStore.companyHours && (
                            <MyPieChart
                                title="Rozlozeni hodin"
                                data={rootStore.dashboardStore.companyHours}
                                dataKey="hours"
                                dataName="name"
                                colors={COLORS}
                            />
                        )
                    )}
                </Row>

                <Row style={{ height: '400px' }}>
                    {rootStore.dashboardStore.employeeOutput && rootStore.dashboardStore.employeeMode ? (
                        <MyAreaChart
                            data={rootStore.dashboardStore.effectivityGraphData}
                            xAxisKey="name"
                            dataKey1="effectivity"
                            dataName1="Effectivity"
                            title="Vyvoj efektivity"
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput && (
                            <MyAreaChart
                                data={rootStore.dashboardStore.overallEffectivity}
                                xAxisKey="name"
                                dataKey1="effectivity"
                                dataName1="Effectivity"
                                title="Vyvoj efektivity"
                            />
                        )
                    )}

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
