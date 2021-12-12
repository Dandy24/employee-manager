import { observer } from 'mobx-react-lite';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import React from 'react';
import { Row } from 'react-table';

export interface TableBodyProps {
    // providedDraggable: DraggableProvided;
    providedDroppable: DroppableProvided;
    tableBodyProps: any; //TableBodyProps;
    rows: Row<object>[];
    prepareRow: (row: Row<any>) => void;
    type: 'shift-table' | 'employee-table';
}

export const TableBody: React.FC<TableBodyProps> = observer((props: TableBodyProps) => {
    const { providedDroppable, tableBodyProps, rows, prepareRow, type } = props;

    /** TODO spread to more logical independent components **/

    /** FIXME table height style -- table must have height for d&d tests to work **/

    return (
        <tbody
            {...tableBodyProps}
            ref={providedDroppable.innerRef}
            {...providedDroppable.droppableProps}
            className="ant-table-tbody"
            data-testid={`${type}-body`} /** TODO make variable after merging to one component with shift table **/
            style={{ height: type === 'shift-table' ? '300px' : null }}
        >
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
                                    className="ant-table-row ant-table-row-level-0"
                                    data-testid={`${type}-row-${index}`}
                                >
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <td
                                                key={`${type}-tbody-td-${index}`}
                                                {...cell.getCellProps()}
                                                // style={{
                                                //     padding: '10px',
                                                //     border: 'solid 1px gray',
                                                //     background: 'papayawhip',
                                                // }}
                                                className="ant-table-cell"
                                                style={{ width: '100%' }}
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
