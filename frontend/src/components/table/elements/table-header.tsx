import { observer } from 'mobx-react-lite';
import React from 'react';
import { HeaderGroup } from 'react-table';

export interface TableHeaderProps {
    headerGroups: Array<HeaderGroup>;
    type: 'employee-table' | 'shift-table';
}

export const TableHeader: React.FC<TableHeaderProps> = observer((props: TableHeaderProps) => {
    const { headerGroups, type } = props;

    return (
        <thead className="ant-table-thead" data-testid={`${type}-thead`}>
            {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={`${type}-thead-tr-${index}`} style={{ width: '100%' }}>
                    {headerGroup.headers.map((column) => (
                        <th
                            key={`${type}-thead-th-${index}`}
                            {...column.getHeaderProps()}
                            className="ant-table-cell"
                            style={{ border: '2px 2px solid grey' }}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
});
