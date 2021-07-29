import {Space} from "antd";
import {Switch} from "formik-antd";
import React from "react";
import {NumberInputProps} from "./NumberInput";

export function CustomSwitch(props:NumberInputProps): JSX.Element{

    const { spacesize, name, label } = props

    return (
        <div>
            <Space size={spacesize}>
                <label htmlFor={name}>{label}</label>
                <Switch name='active'/>
            </Space>
        </div>
    )
}

