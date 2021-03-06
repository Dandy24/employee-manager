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

    const COLORS = ['rgb(136, 132, 216)', '#FFBB28', '#FF8042', 'rgb(130, 202, 157)'];

    return (
        <>
            <Row justify="center" style={{ marginBottom: '2%' }}>
                {!rootStore.dashboardStore.employeeMode ? (
                    <Col span={13}>
                        <SearchComponent type="employee" options={toJS(rootStore.searchStore.searchableEmployees)} />
                    </Col>
                ) : (
                    <Col style={{ textAlign: 'center' }} span={5}>
                        <Button
                            onClick={() => {
                                rootStore.dashboardStore.switchMode();
                            }}
                            type="primary"
                        >
                            Zp??t na obecn?? p??ehled
                        </Button>
                    </Col>
                )}
            </Row>

            <Card
                title={
                    <h4 data-testid={'dashboard-card-title'} style={{ marginBottom: '0' }}>
                        {rootStore.dashboardStore.employeeMode
                            ? 'M??s????n?? p??ehled zam??stnance'
                            : 'Obecn?? m??s????n?? p??ehled'}
                    </h4>
                }
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
                            title="V??voj pracovn??ho nasazen??"
                            data={rootStore.dashboardStore.workingDaysGraphData}
                            dataKey1="work"
                            dataKey2="vac"
                            dataName1="V pr??ci"
                            dataName2="Dovolen??"
                            xAxisKey="name"
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput && (
                            <MyLineChart
                                title="V??voj pracovn??ho nasazen??"
                                data={[...rootStore.dashboardStore.overallWorkingDaysGraphData].reverse()}
                                dataKey1="work"
                                dataKey2="vac"
                                dataName1="V pr??ci"
                                dataName2="Dovolen??"
                                xAxisKey="name"
                            />
                        )
                    )}

                    {rootStore.dashboardStore.employeeOutput && rootStore.dashboardStore.employeeMode ? (
                        <MyPieChart
                            title="Rozlo??en?? hodin"
                            data={rootStore.dashboardStore.hoursDistributionGraphData}
                            dataKey="value"
                            dataName="name"
                            colors={COLORS}
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput &&
                        rootStore.dashboardStore.companyHours && (
                            <MyPieChart
                                title="Rozlo??en?? hodin"
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
                            dataName1="Efektivita"
                            title="V??voj efektivity"
                        />
                    ) : (
                        rootStore.dashboardStore.overallOutput && (
                            <MyAreaChart
                                data={rootStore.dashboardStore.overallEffectivity}
                                xAxisKey="name"
                                dataKey1="value"
                                dataName1="Efektivita"
                                title="V??voj efektivity"
                            />
                        )
                    )}

                    {rootStore.dashboardStore.employeeMode ? (
                        <MyBarChart
                            title="Nejlep???? m??s??ce podle v??konu"
                            data={rootStore.dashboardStore.employeeTopMonthsOutputsData}
                            dataKey1="work"
                            dataName1="V pr??ci"
                            dataKey2="vac"
                            dataName2="Volno"
                            dataKey3="sick"
                            dataName3="Nemocensk??"
                            dataKey4="overtime"
                            dataName4="P??es??as"
                            xAxisKey="name"
                        />
                    ) : (
                        <MyBarChart
                            title="Nejlep???? zam??stnanci m??s??ce"
                            data={rootStore.dashboardStore.topEmployeeOutputsData}
                            dataKey1="work"
                            dataName1="V pr??ci"
                            dataKey2="vac"
                            dataName2="Volno"
                            dataKey3="sick"
                            dataName3="Nemocensk??"
                            dataKey4="overtime"
                            dataName4="P??es??as"
                            xAxisKey="name"
                            clickable
                        />
                    )}
                </Row>
            </Card>
        </>
    );
});
