import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { SearchComponent } from '../components/search/search-component';
import { toJS } from 'mobx';
import { RootStore } from '../stores/root-store';
import { DashboardOverview } from '../components/dashboard/dashboard-overview';
import { MyLineChart } from '../components/dashboard/charts/line-chart';
import { MyAreaChart } from '../components/dashboard/charts/area-chart';
import { MyPieChart } from '../components/dashboard/charts/pie-chart';
import { MyBarChart } from '../components/dashboard/charts/bar-chart';

interface DashboardProps {
    rootStore: RootStore;
}

export const Dashboard: React.FC<DashboardProps> = observer((props: DashboardProps) => {
    const { rootStore } = props;

    rootStore.setActivePage('dashboard');

    //FIXME console errors [mobx] Out of bounds read:

    useEffect(() => {
        (async () => {
            if (rootStore.dashboardStore.employeeMode) {
                await rootStore.dashboardStore.loadEmployeeOutput(rootStore.employeeStore.employee.id);
                await rootStore.dashboardStore.loadEmployeesTopMonthsList(rootStore.employeeStore.employee.id);
            } else {
                await rootStore.companyStore.fetchAllCompanies();
                await rootStore.employeeStore.fetchAllEmployees();
                rootStore.searchStore.createSearchableEmployees();
                await rootStore.dashboardStore.loadOverallOutput();
                await rootStore.dashboardStore.loadHoursByCompany();
                await rootStore.dashboardStore.loadTopEmployeesOutputList();
            }
        })();
    }, [rootStore.dashboardStore.employeeMode]);

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
                {/*/!*FIXME data loading*!/*/}
                {rootStore.dashboardStore.overallOutput && !rootStore.dashboardStore.employeeMode ? (
                    <DashboardOverview type={'general'} data={rootStore.dashboardStore.employeeOutput} />
                ) : (
                    rootStore.dashboardStore.employeeOutput &&
                    rootStore.dashboardStore.employeeMode && (
                        <DashboardOverview type={'employee'} data={rootStore.dashboardStore.employeeOutput} />
                    )
                )}

                <Row style={{ height: '400px' }}>
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
                                data={rootStore.dashboardStore.overallWorkingDaysGraphData.reverse()}
                                dataKey1="work"
                                dataKey2="vac"
                                dataName1="Hours worked"
                                dataName2="Hours out"
                                xAxisKey="name"
                            />
                        )
                    )}

                    {rootStore.dashboardStore.employeeOutput && rootStore.dashboardStore.employeeMode ? (
                        <MyPieChart
                            title="Rozlozeni hodin"
                            data={rootStore.dashboardStore.hoursDistributionGraphData}
                            dataKey="value"
                            dataName="name"
                            colors={COLORS}
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput &&
                        rootStore.dashboardStore.companyHours && (
                            <MyPieChart
                                title="Rozlozeni hodin"
                                data={rootStore.dashboardStore.companyHours}
                                dataKey="value"
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
                            dataKey1="value"
                            dataName1="Effectivity"
                            title="Vyvoj efektivity"
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput && (
                            <MyAreaChart
                                data={rootStore.dashboardStore.overallEffectivity}
                                xAxisKey="name"
                                dataKey1="value"
                                dataName1="Effectivity"
                                title="Vyvoj efektivity"
                            />
                        )
                    )}

                    {rootStore.dashboardStore.employeeMode ? (
                        <MyBarChart
                            title="Nejlepsi mesice podle vykonu"
                            data={rootStore.dashboardStore.employeeTopMonthsOutputsData}
                            dataKey1="work"
                            dataName1="Working hours"
                            dataKey2="vac"
                            dataName2="Vacation hours"
                            dataKey3="sick"
                            dataName3="Sick hours"
                            dataKey4="overtime"
                            dataName4="Overtime hours"
                            xAxisKey="name"
                        />
                    ) : (
                        <MyBarChart
                            title="Nejlepsi zamestnanci mesice"
                            data={rootStore.dashboardStore.topEmployeeOutputsData}
                            dataKey1="work"
                            dataName1="Working hours"
                            dataKey2="vac"
                            dataName2="Vacation hours"
                            dataKey3="sick"
                            dataName3="Sick hours"
                            dataKey4="overtime"
                            dataName4="Overtime hours"
                            xAxisKey="name"
                            clickable
                        />
                    )}
                </Row>
            </Card>
        </>
    );
});
