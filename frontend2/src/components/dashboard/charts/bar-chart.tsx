import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Col } from 'antd';
import React from 'react';
import { HoursTypeGraphDataInterface } from '../../../models/interfaces/graph-data-interface';

export interface BarChartProps {
    title: string;
    data: HoursTypeGraphDataInterface[];
    dataKey1: string;
    dataName1: string;
    dataKey2: string;
    dataName2: string;
    xAxisKey: string;
}

export const MyBarChart: React.FC<BarChartProps> = observer((props: BarChartProps) => {
    const { title, data, dataKey1, dataName1, dataKey2, dataName2, xAxisKey } = props;

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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={dataKey1} name={dataName1} fill="#8884d8" />
                    <Bar dataKey={dataKey2} name={dataName2} fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Col>
    );
});