import { Button, Drawer } from 'antd';
import React from 'react';
import { observer } from 'mobx-react-lite';

export interface EditDrawerProps {
    title: string;
    onClose: () => void;
    visible: boolean;
    cancelOnClick: () => void;
    cancelButtonText: string;
    children: React.ReactNode;
}

export const EditDrawer: React.FC<EditDrawerProps> = observer((props: EditDrawerProps): JSX.Element => {
    const { title, onClose, visible, cancelOnClick, cancelButtonText } = props;

    return (
        <Drawer
            title={title}
            width={600}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={cancelOnClick} style={{ marginRight: 8 }}>
                        {cancelButtonText}
                    </Button>
                </div>
            }
        >
            {props.children}
        </Drawer>
    );
});
