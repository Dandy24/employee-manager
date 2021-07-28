import {DatePicker} from "formik-antd";
import React from "react";
import {Space} from "antd";
import {SpaceSize} from "antd/es/space";

export interface DateSelectorProps{
    name: string,
    label: string,
    spacesize: SpaceSize
}

export function DateSelector(props: DateSelectorProps): JSX.Element{

    const { name, spacesize, label } = props

    return (
        <div>
            <Space size={spacesize}>
                <label htmlFor={name}>{label}</label>
                <DatePicker name={name}/>
            </Space>
        </div>

    )

}
