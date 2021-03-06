import React from 'react';
import { observer } from 'mobx-react-lite';
import { Droppable } from 'react-beautiful-dnd';
import { useTable, useBlockLayout } from 'react-table';
import { useRootStore } from '../../stores/root-store-provider';
import { EmployeeTableColumns } from './tableColumns/EmployeeTableColumns';
import { TableHeader } from './elements/table-header';
import { TableBody } from './elements/table-body';
import { TableWrapper } from './elements/table-wrapper';

export const EmpTable: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    const data = [...rootStore.shiftStore.availableEmployees];

    const cols = EmployeeTableColumns(rootStore.employeeStore, rootStore.companyStore, null);

    const columns = React.useMemo(
        () =>
            cols
                .map((col) => ({ ...col, accessor: col.key, Header: col.title }))
                .filter((col) => col.key !== 'action' && col.key !== 'company'),
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
            <table {...getTableProps()} data-testid={'employee-table'} style={{ tableLayout: 'auto' }}>
                <TableHeader headerGroups={headerGroups} type="employee-table" />

                <Droppable droppableId="employee-table">
                    {(provided) => (
                        <TableBody
                            providedDroppable={provided}
                            tableBodyProps={getTableBodyProps()}
                            rows={rows}
                            prepareRow={prepareRow}
                            type="employee-table"
                        />
                    )}
                </Droppable>
            </table>
        </TableWrapper>
    );
});
