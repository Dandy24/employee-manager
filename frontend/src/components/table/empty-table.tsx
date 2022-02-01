import React from 'react';
import { Empty } from 'antd';
import Title from 'antd/lib/typography/Title';

export interface EmptyTableProps {
    type: 'employee' | 'company';
    loading?: boolean;
}

export const EmptyTable: React.FC<EmptyTableProps> = (props: EmptyTableProps) => {
    const { type, loading } = props;

    return !loading ? (
        <Empty
            imageStyle={{
                height: 150,
            }}
            description={
                <span>
                    <Title level={5}>{`Tabulku ${
                        type === 'company' ? 'firem' : 'zaměstnanců'
                    } se nepodařilo načíst.`}</Title>
                </span>
            }
        />
    ) : (
        <div style={{ height: 150 }}></div>
    );
};
