import React, { useCallback, useReducer } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../stores/root-store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTable } from 'react-table';
import produce from 'immer';
import { useRootStore } from '../../stores/root-store-provider';
import { EmployeeTableColumns } from '../../components/tableColumns/EmployeeTableColumns';

export const EmpTable: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    const data = [...rootStore.shiftStore.employees];

    const cols = EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore);

    const columns = React.useMemo(() => cols.map((col) => ({ ...col, accessor: col.key, Header: col.title })), []);

    console.log(columns);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data,
        initialState: rootStore.shiftStore.employees,
    });

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
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
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <Draggable draggableId={row.id.toString()} key={row.id} index={row.index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
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
