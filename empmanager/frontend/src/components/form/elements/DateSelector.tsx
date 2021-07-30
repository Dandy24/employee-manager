import {DatePicker} from "formik-antd";
import React from "react";
import {SpaceSize} from "antd/es/space";
import {InputWrapper} from "../../layout/form/InputWrapper";

export interface DateSelectorProps{
    name: string,
    label: string,
    spacesize: SpaceSize
}

export function DateSelector(props: DateSelectorProps): JSX.Element{

    const { name, spacesize, label } = props

    return (
        <InputWrapper>
                <label htmlFor={name}>{label}</label>
                <DatePicker name={name}/>
        </InputWrapper>

    )

}
