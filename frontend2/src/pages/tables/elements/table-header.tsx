import { observer } from 'mobx-react-lite';
import React from 'react';
import { HeaderGroup } from 'react-table';

export interface TableHeaderProps {
    headerGroups: Array<HeaderGroup>;
    type: 'employee-table' | 'shift-table';
}

export const TableHeader: React.FC<TableHeaderProps> = observer((props: TableHeaderProps) => {
    const { headerGroups, type } = props;

    /** TODO spread to more logical independent components **/

    return (
        <thead>
            {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={`${type}-thead-tr-${index}`}>
                    {headerGroup.headers.map((column) => (
                        <th
                            key={`${type}-thead-th-${index}`}
                            {...column.getHeaderProps()}
                            style={{
                                borderBottom: 'solid 3px red',
                                background: 'aliceblue',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
});
