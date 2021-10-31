import React from 'react';
import { observer } from 'mobx-react-lite';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTable } from 'react-table';
import { useRootStore } from '../../stores/root-store-provider';
import { EmployeeTableColumns } from '../../components/tableColumns/EmployeeTableColumns';

export const EmpTable: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    const data = [...rootStore.shiftStore.employees];

    const cols = EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore, null, true);

    const columns = React.useMemo(() => cols.map((col) => ({ ...col, accessor: col.key, Header: col.title })), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data,
        //initialState: rootStore.shiftStore.employees,
    });

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={`employee-table-thead-tr-${index}`}>
                        {headerGroup.headers.map((column) => (
                            <th
                                key={`employee-table-thead-th-${index}`}
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

            <Droppable droppableId="employee-table">
                {(provided, snapshot) => (
                    <tbody {...getTableBodyProps()} ref={provided.innerRef} {...provided.droppableProps}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <Draggable
                                    draggableId={'employee-table-' + row.id.toString()}
                                    key={row.id}
                                    index={row.index}
                                >
                                    {(provided, snapshot) => {
                                        return (
                                            <tr
                                                key={`employee-table-tbody-tr-${index}`}
                                                {...row.getRowProps()}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                {row.cells.map((cell, index) => {
                                                    return (
                                                        <td
                                                            key={`employee-table-tbody-td-${index}`}
                                                            {...cell.getCellProps()}
                                                            style={{
                                                                padding: '10px',
                                                                border: 'solid 1px gray',
                                                                background: 'papayawhip',
                                                            }}
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    }}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </tbody>
                )}
            </Droppable>
        </table>
    );
});
