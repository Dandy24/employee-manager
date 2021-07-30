import {Space} from "antd";

export function InputWrapper(props: {children: any}): JSX.Element{

    return(
        <div style={{padding: '5px 0'}}>
            <Space size='large'>
                {props.children}
            </Space>
        </div>
    )
}

