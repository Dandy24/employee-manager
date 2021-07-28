import {Form, Formik} from "formik";
import {TextInput} from "../components/form/TextInput";
import {NumberInput} from "../components/form/NumberInput";
import {Button} from "antd";
import React from "react";
import {CompanyForm} from "../components/form/CompanyForm";
import {CompanyFormik} from "../components/form/CompanyFormik";

export function NewCompanyPage(){

    function createCompany(company: any): Promise<Response> {
        return fetch('http://localhost:8000/api/company-create',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(company),
            });
    }

    const submitHandler = (values: any): void => {

        const companyData = {
            name: values.nazev,
            phone: values.telefon,
            address: values.adresa
        }

        createCompany(companyData)
    }

    return(

        <CompanyFormik onSubmit={submitHandler} initialName='' initialAddress='' initialPhone={0}>
            <CompanyForm companyName='nazev' companyPhone='telefon' companyAddress='adresa'
                         companyNameLabel='Název firmy' companyPhoneLabel='Telefon' companyAddressLabel='Adresa'/>
            </CompanyFormik>

    )

}
