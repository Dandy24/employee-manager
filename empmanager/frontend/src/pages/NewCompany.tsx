import { message } from 'antd';
import React from 'react';
import { CompanyForm } from '../components/form/CompanyForm';
import { CompanyFormik } from '../components/form/CompanyFormik';
import { useHistory } from 'react-router-dom';
import { RootStore } from '../stores/root-store';

interface NewCompanyProps {
    rootStore: RootStore;
}

export function NewCompanyPage(props: NewCompanyProps): JSX.Element {
    const history = useHistory();

    const { rootStore } = props;

    const submitHandler = async (values: any): Promise<void> => {
        const companyData = {
            name: values.name,
            phone: values.phone,
            address: values.address,
        };

        await rootStore.companyStore
            .saveCompany(companyData)
            .then(() => {
                history.replace('');
                message.success('Společnost byla úspěšně přidána');
            })
            .catch((error: string) => {
                message.error('Společnost se nepodařilo vytvořit.');
                console.log(error);
            });
    };

    return (
        <CompanyFormik onSubmit={submitHandler} initialValues={{}}>
            <CompanyForm
                companyName="name"
                companyPhone="phone"
                companyAddress="address"
                companyNameLabel="Název firmy"
                companyPhoneLabel="Telefon"
                companyAddressLabel="Adresa"
            />
        </CompanyFormik>
    );
}
