import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Col } from 'antd';
import React from 'react';
import { ExtendedHoursTypeGraphDataInterface } from '../../../models/interfaces/graph-data-interface';
import { useRootStore } from '../../../stores/root-store-provider';

export interface BarChartProps {
    title: string;
    data: ExtendedHoursTypeGraphDataInterface[];
    dataKey1: string;
    dataName1: string;
    dataKey2: string;
    dataName2: string;
    dataKey3?: string;
    dataName3?: string;
    dataKey4?: string;
    dataName4?: string;
    xAxisKey: string;
    clickable?: boolean;
}

export const MyBarChart: React.FC<BarChartProps> = observer((props: BarChartProps) => {
    const {
        title,
        data,
        dataKey1,
        dataName1,
        dataKey2,
        dataName2,
        dataKey3,
        dataName3,
        dataKey4,
        dataName4,
        xAxisKey,
        clickable,
    } = props;

    const rootStore = useRootStore();

    const clickAction = async (chart) => {
        await rootStore.employeeStore.fetchAllEmployees(undefined, undefined, chart.payload.id);
        rootStore.dashboardStore.switchMode();
    };

    return (
        <Col style={{ width: '50%', height: '108%' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                {title}
            </Title>
            <ResponsiveContainer width="100%" height="85%" id={'bar-chart'}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    id={'bar-chart'}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey={xAxisKey} tickFormatter={(name, place) => `${place + 1}. ${name}`} />
                    <YAxis />
                    <Tooltip filterNull={true} formatter={(amount) => `${amount} hod`} />
                    <Legend />
                    <Bar
                        dataKey={dataKey1}
                        stackId="a"
                        name={dataName1}
                        fill="#8884d8"
                        onClick={clickable ? clickAction : null}
                        role={`bar-chart-${dataKey1}-bar`}
                    />
                    <Bar
                        dataKey={dataKey4}
                        stackId="a"
                        name={dataName4}
                        fill="#ff8346"
                        onClick={clickable ? clickAction : null}
                        role={`bar-chart-${dataKey4}-bar`}
                    />
                    {dataKey2 && (
                        <Bar
                            dataKey={dataKey2}
                            name={dataName2}
                            fill="#82ca9d"
                            onClick={clickable ? clickAction : null}
                            role={`bar-chart-${dataKey2}-bar`}
                        />
                    )}
                    {dataKey3 && (
                        <Bar
                            dataKey={dataKey3}
                            name={dataName3}
                            fill="#ffbd37"
                            onClick={clickable ? clickAction : null}
                            role={`bar-chart-${dataKey3}-bar`}
                        />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </Col>
    );
});
