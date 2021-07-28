import {Button, Drawer} from "antd";
import React from "react";

export interface EditDrawerProps{
    title: string,
    onClose: () => void,
    visible: boolean,
    cancelOnClick: () => void,
    cancelButtonText: string,
    children: any

}

export function EditDrawer(props: EditDrawerProps): JSX.Element {

    const { title, onClose, visible, cancelOnClick, cancelButtonText } = props

    return (

        <Drawer
            title={title}
            width={720}
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

    )

}

