import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Col } from 'antd';
import React from 'react';
import { HoursTypeGraphDataInterface } from '../../../models/interfaces/graph-data-interface';
import moment from 'moment';

export interface LineChartProps {
    title: string;
    data: HoursTypeGraphDataInterface[];
    dataKey1: string;
    dataKey2: string;
    dataName1: string;
    dataName2: string;
    xAxisKey: string;
}

export const MyLineChart: React.FC<LineChartProps> = observer((props: LineChartProps) => {
    const { title, data, dataKey1, dataName1, dataKey2, dataName2, xAxisKey } = props;

    return (
        <Col span={12} style={{ height: '90%' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                {title}
            </Title>
            <ResponsiveContainer id={'line-chart'} width="100%" height="90%">
                <LineChart width={600} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis
                        dataKey={xAxisKey}
                        tickMargin={10}
                        tickFormatter={(value) => moment(value, 'YYYY-MM-DD').format('MMMM YY')}
                    />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(label: string) => <p>{moment(label, 'YYYY-MM-DD').format('MMMM YY')}</p>}
                        formatter={(amount) => `${amount} hod`}
                    />
                    <Legend id={'line-chart-legend'} />
                    <Line
                        type="monotone"
                        dataKey={dataKey1}
                        name={dataName1}
                        stroke="#8884d8"
                        id={`line-chart-${dataKey1}-line`}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey2}
                        name={dataName2}
                        stroke="#82ca9d"
                        id={`line-chart-${dataKey2}-line`}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Col>
    );
});
