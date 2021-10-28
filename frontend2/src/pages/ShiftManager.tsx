import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Col, List, Row } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTable } from 'react-table';
import { useRootStore } from '../stores/root-store-provider';
import { EmpTable } from './tables/employee-table';
import { ShiftTable } from './tables/shift-table';

interface ShiftManagerPageProps {
    rootStore: RootStore;
}

export const ShiftManagerPage: React.FC<ShiftManagerPageProps> = observer(
    (props: ShiftManagerPageProps): JSX.Element => {
        const rootStore = useRootStore();

        const data = [
            {
                id: 1,
                col1: 'Hello',
                col2: 'World',
            },
            {
                id: 2,
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                id: 3,
                col1: 'whatever',
                col2: 'you want',
            },
        ];

        const columns = React.useMemo(
            () => [
                {
                    Header: 'ID',
                    accessor: 'id', // accessor is the "key" in the data
                },
                {
                    Header: 'Column 1',
                    accessor: 'col1',
                },
                {
                    Header: 'Column 2',
                    accessor: 'col2',
                },
            ],
            [],
        );

        //console.log(rootStore.shiftStore.employees);

        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
            columns,
            data: rootStore.shiftStore.employees,
            initialState: data,
        });

        const kok = (event: any) => {
            console.log(event);

            if (event.destination) {
                if (event.destination.droppableId !== event.source.droppableId) {
                    rootStore.shiftStore.addToShift(rootStore.shiftStore.employees[event.source.index]);
                    rootStore.shiftStore.removeEmployee(event.source.index);
                } else {
                    const items = [...rootStore.shiftStore.employees];

                    const [reorderedItem] = items.splice(event.source.index, 1);
                    items.splice(event.destination.index, 0, reorderedItem);

                    rootStore.shiftStore.setEmployees(items);
                }
            }
        };

        return (
            // <Row justify="space-between">
            //     <Col span={10}>
            <>
                <DragDropContext onDragEnd={kok}>
                    <EmpTable />
                    <ShiftTable />
                </DragDropContext>
                {/*// </Col>*/}
                {/* <Col span={10}>*/}
                {/*<DragDropContext onDragEnd={kok}>*/}
                {/*    <Droppable droppableId="shift-list">*/}
                {/*        {(provided) => (*/}
                {/*            <div ref={provided.innerRef} {...provided.droppableProps}>*/}
                {/*                <List*/}
                {/*                    itemLayout="horizontal"*/}
                {/*                    rowKey="id"*/}
                {/*                    dataSource={listData}*/}
                {/*                    renderItem={(item, index) => (*/}
                {/*                        <Draggable draggableId={item.id.toString()} index={index} key={item.id}>*/}
                {/*                            {(provided) => (*/}
                {/*                                <div*/}
                {/*                                    ref={provided.innerRef}*/}
                {/*                                    {...provided.draggableProps}*/}
                {/*                                    {...provided.dragHandleProps}*/}
                {/*                                >*/}
                {/*                                    <List.Item>*/}
                {/*                                        <List.Item.Meta*/}
                {/*                                            avatar={*/}
                {/*                                                <Avatar src="https://joeschmoe.io/api/v1/random" />*/}
                {/*                                            }*/}
                {/*                                            // title={<a href="https://ant.design">{item.title}</a>}*/}
                {/*                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"*/}
                {/*                                        />*/}
                {/*                                    </List.Item>*/}
                {/*                                </div>*/}
                {/*                            )}*/}
                {/*                        </Draggable>*/}
                {/*                    )}*/}
                {/*                />*/}
                {/*                {provided.placeholder}*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </Droppable>*/}
                {/*</DragDropContext>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </>
        );
    },
);
