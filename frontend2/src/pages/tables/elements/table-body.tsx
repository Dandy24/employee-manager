import { observer } from 'mobx-react-lite';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import React from 'react';
import { Row } from 'react-table';
import { EmployeeEntity } from '../../../models/entities/employee-entity';

export interface TableBodyProps {
    // providedDraggable: DraggableProvided;
    providedDroppable: DroppableProvided;
    tableBodyProps: any; //TableBodyProps;
    rows: Row<EmployeeEntity>[];
    prepareRow: (row: Row<any>) => void;
    type: 'shift-table' | 'employee-table';
}

export const TableBody: React.FC<TableBodyProps> = observer((props: TableBodyProps) => {
    const { providedDroppable, tableBodyProps, rows, prepareRow, type } = props;

    /** TODO spread to more logical independent components **/

    return (
        <tbody {...tableBodyProps} ref={providedDroppable.innerRef} {...providedDroppable.droppableProps}>
            {rows.map((row, index) => {
                prepareRow(row);
                return (
                    <Draggable draggableId={`${type}-'${row.id.toString()}`} key={row.id} index={row.index}>
                        {(provided, snapshot) => {
                            return (
                                <tr
                                    key={`${type}-tbody-tr-${index}`}
                                    {...row.getRowProps()}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <td
                                                key={`${type}-tbody-td-${index}`}
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
            {providedDroppable.placeholder}
        </tbody>
    );
});