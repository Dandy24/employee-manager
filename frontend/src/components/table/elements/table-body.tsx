import { observer } from 'mobx-react-lite';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import React from 'react';
import { Row, TableBodyProps } from 'react-table';
import { newIsValid, showErrorTooltip } from '../../../utils/drag-end-handler';
import { useRootStore } from '../../../stores/root-store-provider';
import { Tooltip } from 'antd';

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

    const { shiftStore } = useRootStore();

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
                    <Draggable
                        draggableId={`${type}-'${row.id.toString()}`}
                        key={row.id}
                        index={row.index}
                        isDragDisabled={type === 'employee-table' && !newIsValid(row.values, shiftStore)}
                    >
                        {(provided) => {
                            const content = (
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
                                                style={{
                                                    width: '100%',
                                                    backgroundColor:
                                                        type === 'employee-table' && !newIsValid(row.values, shiftStore)
                                                            ? 'rgba(245, 34, 45, .4)'
                                                            : 'white',
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );

                            return type === 'employee-table' && !newIsValid(row.values, shiftStore) ? (
                                <Tooltip
                                    id={'invalid-message-tooltip'}
                                    title={() => showErrorTooltip(row.values, shiftStore)}
                                >
                                    {content}
                                </Tooltip>
                            ) : (
                                content
                            );
                        }}
                    </Draggable>
                );
            })}
            {providedDroppable.placeholder}
        </tbody>
    );
});
