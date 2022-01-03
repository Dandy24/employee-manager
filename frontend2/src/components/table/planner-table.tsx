import { observer } from 'mobx-react-lite';
import React from 'react';
import { useBlockLayout, useTable } from 'react-table';
import { TableWrapper } from './elements/table-wrapper';
import { Droppable } from 'react-beautiful-dnd';
import { TableHeader } from './elements/table-header';
import { TableBody } from './elements/table-body';
import { EmployeeEntity } from '../../models/entities/employee-entity';
import { TableColumns } from '../../models/interfaces/table-columns';

export interface PlannerTableProps {
    tableData: EmployeeEntity[];
    tableCols: TableColumns[];
    type: 'shift' | 'employee';
}

export const PlannerTable: React.FC<PlannerTableProps> = observer((props: PlannerTableProps) => {
    const { tableCols, tableData, type } = props;

    const data = [...tableData];

    const columns = React.useMemo(
        () =>
            tableCols
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
            <Droppable droppableId={`${type}-table`}>
                {(provided, snapshot) => (
                    <table
                        {...getTableProps()}
                        data-testid={`${type}-table`}
                        style={{
                            backgroundColor: type === 'shift' && snapshot.isDraggingOver ? 'lightblue' : null,
                            tableLayout: 'auto',
                        }}
                    >
                        <TableHeader headerGroups={headerGroups} type={`${type}-table`} />

                        <TableBody
                            providedDroppable={provided}
                            tableBodyProps={getTableBodyProps()}
                            rows={rows}
                            prepareRow={prepareRow}
                            type={`${type}-table`}
                        />
                    </table>
                )}
            </Droppable>
        </TableWrapper>
    );
});
