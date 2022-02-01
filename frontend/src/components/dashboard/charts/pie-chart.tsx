import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Col } from 'antd';
import React from 'react';
import { GraphDataInterface } from '../../../models/interfaces/graph-data-interface';

export interface PieChartProps {
    title: string;
    data: GraphDataInterface[];
    dataKey: string;
    dataName: string;
    colors: string[];
}

export const MyPieChart: React.FC<PieChartProps> = observer((props: PieChartProps) => {
    const { title, data, dataKey, dataName, colors } = props;

    return (
        <Col span={10} offset={1} style={{ height: '90%' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                {title}
            </Title>
            <ResponsiveContainer width="100%" height="85%" id={'pie-chart'}>
                <PieChart width={300} height={200} margin={{ top: 0, right: 0, bottom: 50, left: 0 }}>
                    <Pie
                        data={data}
                        cy={130}
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey={dataKey}
                        nameKey={dataName}
                        isAnimationActive={false}
                        label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                id={`pie-chart-${entry.name.toLowerCase().replace(' ', '-')}-sector`}
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Legend wrapperStyle={{ bottom: '8%' }} id={'pie-chart-legend'} />
                    <Tooltip formatter={(amount) => `${amount} hours`} />
                </PieChart>
            </ResponsiveContainer>
        </Col>
    );
});
