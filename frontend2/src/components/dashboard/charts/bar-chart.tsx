import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Col } from 'antd';
import React from 'react';
import { HoursTypeGraphDataInterface } from '../../../models/interfaces/graph-data-interface';
import { useRootStore } from '../../../stores/root-store-provider';

export interface BarChartProps {
    title: string;
    data: HoursTypeGraphDataInterface[];
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
            <ResponsiveContainer width="100%" height="85%">
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
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey={dataKey1}
                        stackId="a"
                        name={dataName1}
                        fill="#8884d8"
                        onClick={clickable ? clickAction : null}
                    />
                    <Bar
                        dataKey={dataKey4}
                        stackId="a"
                        name={dataName4}
                        fill="#ff8346"
                        onClick={clickable ? clickAction : null}
                    />
                    <Bar dataKey={dataKey2} name={dataName2} fill="#82ca9d" onClick={clickable ? clickAction : null} />
                    {dataKey3 && (
                        <Bar
                            dataKey={dataKey3}
                            name={dataName3}
                            fill="#ffbd37"
                            onClick={clickable ? clickAction : null}
                        />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </Col>
    );
});
