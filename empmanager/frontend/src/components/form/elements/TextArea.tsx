import React from "react";
import {Input} from "formik-antd";
import {SpaceSize} from "antd/es/space";
import {Space} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {InputWrapper} from "../../layout/form/InputWrapper";

export interface TextAreaProps{
    name: string
    label: string
    spacesize: SpaceSize
    textareaSize: SizeType
    rows: number
}

export function TextArea(props: TextAreaProps): JSX.Element{

    const { name, label, spacesize, rows, textareaSize} = props

    const {TextArea} = Input

    return(

        <InputWrapper>
                <label htmlFor={name}>{label}</label>
                <TextArea name={name} rows={rows} size={textareaSize}/>
        </InputWrapper>

    )



}
