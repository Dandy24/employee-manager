import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Form, Formik} from 'formik'
import {TextInput} from "./form/TextInput";
import {NumberInput} from "./form/NumberInput";
import {Button, Descriptions, List, Space, Spin} from "antd";
import DescriptionsItem from 'antd/lib/descriptions/Item';
import {CompanyList} from "./CompanyList";

function App(){


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

        console.log(values)

        const companyData = {
            name: values.nazev,
            phone: values.telefon,
            address: values.adresa
        }

        console.log(companyData)

        createCompany(companyData)

    }

        return (
            <>
                <h1>ReactApp</h1>

                <CompanyList />

                <Formik
                    initialValues={{
                          nazev: '',
                          telefon: 0,
                          adresa: ''

                        }}

                    onSubmit={submitHandler}>

                    <Form>
                        <TextInput label='Název firmy' spacesize='large' name="nazev" />

                        <NumberInput label='Telefon' spacesize='large' name="telefon" />

                        <TextInput label='Adresa' spacesize='large' name="adresa" />

                        <Button type="primary" htmlType="submit">Přidat</Button>
                    </Form>

                </Formik>
            </>
        )
}
export default App;
