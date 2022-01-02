import React from 'react';
import { observer } from 'mobx-react-lite';
import { Droppable } from 'react-beautiful-dnd';
import { useBlockLayout, useTable } from 'react-table';
import { useRootStore } from '../../stores/root-store-provider';
import { EmployeeTableColumns } from './tableColumns/EmployeeTableColumns';
import { TableHeader } from './elements/table-header';
import { TableBody } from './elements/table-body';
import { TableWrapper } from './elements/table-wrapper';

export const ShiftTable: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    const data = [...rootStore.shiftStore.shiftEmployees];

    const cols = EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore);

    const columns = React.useMemo(
        () =>
            cols.map((col) => ({ ...col, accessor: col.key, Header: col.title })).filter((col) => col.key !== 'action'),
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: data,
        },
        useBlockLayout,
    );

    return (
        <TableWrapper>
            <Droppable droppableId="shift-table">
                {(provided, snapshot) => (
                    <table
                        {...getTableProps()}
                        data-testid={'shift-table'}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? 'lightblue' : null,
                            tableLayout: 'auto',
                        }}
                    >
                        <TableHeader headerGroups={headerGroups} type="shift-table" />

                        <TableBody
                            providedDroppable={provided}
                            tableBodyProps={getTableBodyProps()}
                            rows={rows}
                            prepareRow={prepareRow}
                            type="shift-table"
                        />
                    </table>
                )}
            </Droppable>
        </TableWrapper>
    );
});
