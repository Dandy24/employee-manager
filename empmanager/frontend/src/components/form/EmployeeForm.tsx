import {Form} from "formik";
import React from "react";
import {TextInput} from "./elements/TextInput";
import {NumberInput} from "./elements/NumberInput";
import {Button} from "antd";
import {CategorySelectList} from "./elements/SelectList";
import {DateSelector} from "./elements/DateSelector";
import {TextArea} from "./elements/TextArea";
import { Switch, Select } from "formik-antd";
import {CompanySelectList} from "./elements/CompanySelectList";

export interface EmployeeFormProps{
    /*fname: string,
    fnameLabel: string,
    lname: string,
    lnameLabel: string,
    phone: string,
    phoneLabel: string,
    email: string,
    emailLabel: string,
    ,*/

    categories: any[]  //TODO fix type
    activeEdit?: boolean
    companyEdit?: boolean
    companiesList?: any[]  //TODO fix type
}

export function EmployeeForm(props: EmployeeFormProps): JSX.Element{

    const { categories, activeEdit, companyEdit, companiesList } = props

    return (

            <Form>
                <TextInput label='Jméno' spacesize='large' name='first_name' />

                <TextInput label='Příjmení' spacesize='large' name='last_name' />

                <NumberInput label='Telefon' spacesize='large' name='phone'/>

                <TextInput label='Email' spacesize='large' name='email' />

                <CategorySelectList categories={categories} name='category'
                                    label='Kategorizace práce' spacesize='large'/>

                <DateSelector name='med_exam' label='Datum vstupní prohlídky' spacesize='large'/>

                <DateSelector name='job_assign' label='Datum nástupu do práce' spacesize='large'/>

                <TextArea name='health_limits' label='Zdravotní omezení' spacesize='large' rows={3} textareaSize='large' />

                {activeEdit ? <Switch name='active'/> : null}

                {companyEdit && companiesList ? <CompanySelectList companies={companiesList} name='company' label="Firma" spacesize='large'/>: null}

                <Button type="primary" htmlType="submit">Přidat</Button>
            </Form>

    )

}
