import {Space} from "antd";

export function FormWrapper(props: {children: any}): JSX.Element{
    return(
        <Space direction='vertical' size='large'>
            {props.children}
        </Space>
    )
}