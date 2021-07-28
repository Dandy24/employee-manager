import {Form, Formik} from "formik";
import React from "react";
import {TextInput} from "./elements/TextInput";
import {NumberInput} from "./elements/NumberInput";
import {Button} from "antd";
import {CategorySelectList} from "./elements/SelectList";
import {DateSelector} from "./elements/DateSelector";
import {TextArea} from "./elements/TextArea";

export interface EmployeeFormProps{
    onSubmit: (values: any) => void
}

export function EmployeeForm(props: EmployeeFormProps): JSX.Element{

    const categoryOptions = ['A','B','C']

    return (

        <Formik
            initialValues={{
                first_name: '' ,
                last_name: '',
                phone: 0,
                email: '@',
                category: categoryOptions[0],
                health_limits: ''
            }}

            onSubmit={props.onSubmit}>

            <Form>
                <TextInput label='Jméno' spacesize='large' name='first_name' />

                <TextInput label='Příjmení' spacesize='large' name='last_name' />

                <NumberInput label='Telefon' spacesize='large' name='phone'/>

                <TextInput label='Email' spacesize='large' name='email' />

                <CategorySelectList categories={categoryOptions} name='category'
                                    label='Kategorizace práce' spacesize='large'/>

                <DateSelector name='med_exam' label='Datum vstupní prohlídky' spacesize='large'/>

                <DateSelector name='job_assign' label='Datum nástupu do práce' spacesize='large'/>

                <TextArea name='health_limits' label='Zdravotní omezení' spacesize='large' rows={3} textareaSize='large' />

                <Button type="primary" htmlType="submit">Přidat</Button>
            </Form>

        </Formik>

    )

}
