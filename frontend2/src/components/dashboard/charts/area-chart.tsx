import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Col } from 'antd';
import React from 'react';
import { GraphDataInterface } from '../../../models/interfaces/graph-data-interface';
import moment from 'moment';

export interface AreaChartProps {
    title: string;
    data: GraphDataInterface[];
    dataKey1: string;
    dataName1: string;
    xAxisKey: string;
}

export const MyAreaChart: React.FC<AreaChartProps> = observer((props: AreaChartProps) => {
    const { title, data, dataKey1, dataName1, xAxisKey } = props;

    return (
        <Col style={{ width: '50%', height: '100%' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                {title}
            </Title>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis
                        dataKey={xAxisKey}
                        tickMargin={10}
                        tickFormatter={(value) => moment(value, 'YYYY-MM-DD').format('MMMM YY')}
                    />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => `${value}%`}
                        labelFormatter={(label: string) => <p>{moment(label, 'YYYY-MM-DD').format('MMMM YY')}</p>}
                    />
                    <Area type="monotone" dataKey={dataKey1} name={dataName1} stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </Col>
    );
});
