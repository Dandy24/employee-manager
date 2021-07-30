import {Form} from "formik";
import React from "react";
import {TextInput} from "./elements/TextInput";
import {NumberInput} from "./elements/NumberInput";
import {Button} from "antd";
import {CategorySelectList} from "./elements/SelectList";
import {DateSelector} from "./elements/DateSelector";
import {TextArea} from "./elements/TextArea";
import {CompanySelectList} from "./elements/CompanySelectList";
import {CustomSwitch} from "./elements/CustomSwitch";
import {FormWrapper} from "../layout/form/FormWrapper";

export interface EmployeeFormProps{

    submitText: string,
    categories: string[]
    activeEdit?: boolean
    companyEdit?: boolean
    companiesList?: any[]  //TODO fix type
}

export function EmployeeForm(props: EmployeeFormProps): JSX.Element{

    const { categories, activeEdit, companyEdit, companiesList, submitText } = props

    return (

            <Form>
                <FormWrapper>
                    <div>
                        <TextInput label='Jméno' spacesize='large' name='first_name' />

                        <TextInput label='Příjmení' spacesize='large' name='last_name' />

                        <NumberInput label='Telefon' spacesize='large' name='phone'/>

                        <TextInput label='Email' spacesize='large' name='email' />

                        <CategorySelectList categories={categories} name='category'
                                            label='Kategorizace práce' spacesize='large'/>

                        <DateSelector name='med_exam' label='Datum vstupní prohlídky' spacesize='large'/>

                        <DateSelector name='job_assign' label='Datum nástupu do práce' spacesize='large'/>

                        <TextArea name='health_limits' label='Zdravotní omezení' spacesize='large'
                                  rows={3} textareaSize='large' />

                        {activeEdit ? <CustomSwitch label="Aktivní" name='active' spacesize='large'/> : null}

                        {companyEdit && companiesList ? <CompanySelectList
                            companies={companiesList} name='company' label="Firma"/>: null}
                    </div>

                    <Button type="primary" htmlType="submit">{submitText}</Button>
                </FormWrapper>
            </Form>

    )

}
