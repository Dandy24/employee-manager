import { observer } from 'mobx-react-lite';
import { EmptyTable } from './empty-table';
import { Table } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { EmployeeEntity } from '../../models/entities/employee-entity';
import { CompanyEntity } from '../../models/entities/company-entity';

export interface GeneralTableProps {
    loading: boolean;
    columns: ColumnsType<EmployeeEntity | CompanyEntity>;
    rows: CompanyEntity[] | EmployeeEntity[];
    type: 'employee' | 'company';
}

export const GeneralTable: React.FC<GeneralTableProps> = observer((props: GeneralTableProps) => {
    const { loading, type, columns, rows } = props;

    return (
        <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={rows}
            data-testid={`${type}-table`}
            locale={{ emptyText: <EmptyTable type={type} loading={loading} /> }}
            pagination={{
                showSizeChanger: rows.length > 10,
                pageSizeOptions: ['15', '30', '50'],
                position: ['bottomCenter'],
                defaultPageSize: 15,
            }}
            scroll={{ y: '60rem' }}
        />
    );
});
