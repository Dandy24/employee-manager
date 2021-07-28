import {Form} from "formik";
import {TextInput} from "./elements/TextInput";
import {NumberInput} from "./elements/NumberInput";
import {Button} from "antd";
import React from "react";

export interface CompanyFormProps{
    companyName: string,
    companyPhone: string,
    companyAddress: string,
    companyNameLabel: string,
    companyPhoneLabel: string,
    companyAddressLabel: string,
}

export function CompanyForm(props: CompanyFormProps): JSX.Element {

    const { companyName, companyPhone, companyAddress, companyAddressLabel, companyNameLabel, companyPhoneLabel} = props

    return(
        <Form>
            <TextInput label={companyNameLabel} spacesize='large' name={companyName} />

            <NumberInput label={companyPhoneLabel} spacesize='large' name={companyPhone} />

            <TextInput label={companyAddressLabel} spacesize='large' name={companyAddress} />

            <Button type="primary" htmlType="submit">Přidat</Button>
        </Form>
    )

}
