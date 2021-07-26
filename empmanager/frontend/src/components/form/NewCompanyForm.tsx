import {Form, Formik} from "formik";
import {TextInput} from "./TextInput";
import {NumberInput} from "./NumberInput";
import {Button} from "antd";
import React from "react";

export interface NewCompanyFormProps{
    onSubmit: (values: any) => void
}

export function NewCompanyForm(props: NewCompanyFormProps): JSX.Element {

    return(
        <Formik
            initialValues={{
                nazev: '',
                telefon: 0,
                adresa: ''

            }}

            onSubmit={props.onSubmit}>

            <Form>
                <TextInput label='Název firmy' spacesize='large' name="nazev" />

                <NumberInput label='Telefon' spacesize='large' name="telefon" />

                <TextInput label='Adresa' spacesize='large' name="adresa" />

                <Button type="primary" htmlType="submit">Přidat</Button>
            </Form>

        </Formik>
    )

}
