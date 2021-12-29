import React from 'react';
import { observer } from 'mobx-react-lite';
import { Droppable } from 'react-beautiful-dnd';
import { useTable } from 'react-table';
import { useRootStore } from '../../stores/root-store-provider';
import { EmployeeTableColumns } from '../../components/table/tableColumns/EmployeeTableColumns';
import { TableHeader } from './elements/table-header';
import { TableBody } from './elements/table-body';

export const ShiftTable: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    const data = [...rootStore.shiftStore.shiftEmployees];

    const cols = EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore);

    const columns = React.useMemo(() => cols.map((col) => ({ ...col, accessor: col.key, Header: col.title })), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data,
        //initialState: [],
    });

    return (
        <Droppable droppableId="shift-table">
            {(provided, snapshot) => (
                <table
                    {...getTableProps()}
                    data-testid={'shift-table'}
                    style={{ border: 'solid 1px blue', backgroundColor: snapshot.isDraggingOver ? 'lightblue' : null }}
                >
                    <TableHeader headerGroups={headerGroups} type="shift-table" />
                    {/*<thead>*/}
                    {/*    {headerGroups.map((headerGroup, index) => (*/}
                    {/*        <tr {...headerGroup.getHeaderGroupProps()} key={`shift-table-thead-tr-${index}`}>*/}
                    {/*            {headerGroup.headers.map((column, index) => (*/}
                    {/*                <th*/}
                    {/*                    key={`shift-table-thead-th-${index}`}*/}
                    {/*                    {...column.getHeaderProps()}*/}
                    {/*                    style={{*/}
                    {/*                        borderBottom: 'solid 3px red',*/}
                    {/*                        background: 'aliceblue',*/}
                    {/*                        color: 'black',*/}
                    {/*                        fontWeight: 'bold',*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    {column.render('Header')}*/}
                    {/*                </th>*/}
                    {/*            ))}*/}
                    {/*        </tr>*/}
                    {/*    ))}*/}
                    {/*</thead>*/}

                    <TableBody
                        providedDroppable={provided}
                        tableBodyProps={getTableBodyProps()}
                        rows={rows}
                        prepareRow={prepareRow}
                        type="shift-table"
                    />

                    {/*<tbody {...getTableBodyProps()} ref={provided.innerRef} {...provided.droppableProps}>*/}
                    {/*    {rows.map((row, index) => {*/}
                    {/*        prepareRow(row);*/}
                    {/*        return (*/}
                    {/*            <Draggable*/}
                    {/*                draggableId={'shift-table-' + row.id.toString()}*/}
                    {/*                key={row.id}*/}
                    {/*                index={row.index}*/}
                    {/*            >*/}
                    {/*                {(provided, snapshot) => {*/}
                    {/*                    return (*/}
                    {/*                        <tr*/}
                    {/*                            key={`shift-table-tbody-tr-${index}`}*/}
                    {/*                            {...row.getRowProps()}*/}
                    {/*                            {...provided.draggableProps}*/}
                    {/*                            {...provided.dragHandleProps}*/}
                    {/*                            ref={provided.innerRef}*/}
                    {/*                        >*/}
                    {/*                            {row.cells.map((cell, index) => {*/}
                    {/*                                return (*/}
                    {/*                                    <td*/}
                    {/*                                        key={`shift-table-tbody-td-${index}`}*/}
                    {/*                                        {...cell.getCellProps()}*/}
                    {/*                                        style={{*/}
                    {/*                                            padding: '10px',*/}
                    {/*                                            border: 'solid 1px gray',*/}
                    {/*                                            background: 'papayawhip',*/}
                    {/*                                        }}*/}
                    {/*                                    >*/}
                    {/*                                        {cell.render('Cell')}*/}
                    {/*                                    </td>*/}
                    {/*                                );*/}
                    {/*                            })}*/}
                    {/*                        </tr>*/}
                    {/*                    );*/}
                    {/*                }}*/}
                    {/*            </Draggable>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*    {provided.placeholder}*/}
                    {/*</tbody>*/}
                </table>
            )}
        </Droppable>
    );
});
