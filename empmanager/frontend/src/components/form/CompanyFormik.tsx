import {Formik} from "formik";
import React from "react";

export interface CompanyFormikProps{
    onSubmit: (values: any) => void
    initialName: string,
    initialPhone: number,
    initialAddress: string,
    children: any
}

export function CompanyFormik(props: CompanyFormikProps): JSX.Element {

    const { initialName, initialPhone, initialAddress, onSubmit } = props

    return(
        <Formik
            initialValues={{
                nazev: initialName ,
                //telefon: initialPhone,
                adresa: initialAddress

            }}

            onSubmit={onSubmit}>

            {props.children}

        </Formik>
    )

}
