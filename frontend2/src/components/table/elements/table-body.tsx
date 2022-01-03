import { observer } from 'mobx-react-lite';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import React from 'react';
import { Row, TableBodyProps } from 'react-table';

export interface MyTableBodyProps {
    providedDroppable: DroppableProvided;
    tableBodyProps: TableBodyProps; //TableBodyProps;
    // eslint-disable-next-line @typescript-eslint/ban-types
    rows: Row<object>[];
    // eslint-disable-next-line @typescript-eslint/ban-types
    prepareRow: (row: Row<object>) => void;
    type: 'shift-table' | 'employee-table';
}

export const TableBody: React.FC<MyTableBodyProps> = observer((props: MyTableBodyProps) => {
    const { providedDroppable, tableBodyProps, rows, prepareRow, type } = props;

    return (
        <tbody
            {...tableBodyProps}
            ref={providedDroppable.innerRef}
            {...providedDroppable.droppableProps}
            className="ant-table-tbody"
            data-testid={`${type}-body`}
            style={{ height: type === 'shift-table' && rows.length <= 0 ? '300px' : null }}
        >
            {rows.map((row, index) => {
                prepareRow(row);
                return (
                    <Draggable draggableId={`${type}-'${row.id.toString()}`} key={row.id} index={row.index}>
                        {(provided) => {
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
