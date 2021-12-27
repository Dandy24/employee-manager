import { observer } from 'mobx-react-lite';
import Title from 'antd/lib/typography/Title';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Col } from 'antd';
import React from 'react';

export interface PieChartProps {
    title: string;
    data: any;
    dataKey: string;
    dataName: string;
    // xAxisKey: string;
    colors: string[];
}

export const MyPieChart: React.FC<PieChartProps> = observer((props: PieChartProps) => {
    const { title, data, dataKey, dataName, colors } = props;

    return (
        <Col style={{ width: '30%', height: '100%' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                {title}
            </Title>
            <ResponsiveContainer width="100%" height="85%">
                <PieChart width={300} height={200} margin={{ top: 0, right: 0, bottom: 50, left: 0 }}>
                    <Pie
                        data={data}
                        cy={160}
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey={dataKey}
                        nameKey={dataName}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Col>
    );
});
