import {Form} from "formik";
import {TextInput} from "./elements/TextInput";
import {NumberInput} from "./elements/NumberInput";
import {Button, Space} from "antd";
import React from "react";
import {FormWrapper} from "../layout/form/FormWrapper";

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
            <FormWrapper>
                <div>
                    <TextInput label={companyNameLabel} spacesize='large' name={companyName} />

                    <NumberInput label={companyPhoneLabel} spacesize='large' name={companyPhone} />

                    <TextInput label={companyAddressLabel} spacesize='large' name={companyAddress} />
                </div>

                <Button type="primary" htmlType="submit">Uložit</Button>
            </FormWrapper>

        </Form>
    )

}
