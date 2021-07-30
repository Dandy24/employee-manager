import {Switch} from "formik-antd";
import React from "react";
import {NumberInputProps} from "./NumberInput";
import {InputWrapper} from "../../layout/form/InputWrapper";

export function CustomSwitch(props:NumberInputProps): JSX.Element{

    const { spacesize, name, label } = props

    return (
        <InputWrapper>
                <label htmlFor={name}>{label}</label>
                <Switch name='active'/>
        </InputWrapper>
    )
}

