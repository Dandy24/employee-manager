import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Col, List, Row, Tree } from 'antd';
import { RootStore } from '../stores/root-store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface ShiftManagerPageProps {
    rootStore: RootStore;
}

export const ShiftManagerPage: React.FC<ShiftManagerPageProps> = observer(
    (props: ShiftManagerPageProps): JSX.Element => {
        const data = [
            {
                id: 1,
                title: 'Ant Design Title 1',
            },
            {
                id: 2,
                title: 'Ant Design Title 2',
            },
            {
                id: 3,
                title: 'Ant Design Title 3',
            },
            {
                id: 4,
                title: 'Ant Design Title 4',
            },
        ];

        const [listData, updateListData] = useState(data);

        const treeData = [
            {
                title: 'parent 1',
                key: '0-0',
                children: [
                    {
                        title: 'parent 1-0',
                        key: '0-0-0',
                        disabled: true,
                        children: [
                            {
                                title: 'leaf',
                                key: '0-0-0-0',
                                disableCheckbox: true,
                            },
                            {
                                title: 'leaf',
                                key: '0-0-0-1',
                            },
                        ],
                    },
                    {
                        title: 'parent 1-1',
                        key: '0-0-1',
                        children: [
                            {
                                title: (
                                    <span
                                        style={{
                                            color: '#1890ff',
                                        }}
                                    >
                                        sss
                                    </span>
                                ),
                                key: '0-0-1-0',
                            },
                        ],
                    },
                ],
            },
        ];

        const onSelect = (selectedKeys: any, info: any) => {
            console.log('selected', selectedKeys, info);
        };

        const onCheck = (checkedKeys: any, info: any) => {
            console.log('onCheck', checkedKeys, info);
        };

        const kok = (event: any) => {
            console.log(event);

            if (event.destination) {
                const items = [...listData];

                const [reorderedItem] = items.splice(event.source.index, 1);
                items.splice(event.destination.index, 0, reorderedItem);

                updateListData(items);
            }
        };

        return (
            <Row justify="space-between">
                <Col span={10}>
                    <Tree
                        checkable
                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={onSelect}
                        onCheck={onCheck}
                        treeData={treeData}
                    />
                </Col>
                <Col span={10}>
                    <DragDropContext onDragEnd={kok}>
                        <Droppable droppableId="shift-list">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <List
                                        itemLayout="horizontal"
                                        rowKey="id"
                                        dataSource={listData}
                                        renderItem={(item, index) => (
                                            <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                                                }
                                                                title={<a href="https://ant.design">{item.title}</a>}
                                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                            />
                                                        </List.Item>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Col>
            </Row>
        );
    },
);
