import React from 'react';
import { CompanyForm } from '../components/form/CompanyForm';
import { CompanyFormik } from '../components/form/CompanyFormik';
import { useHistory } from 'react-router-dom';
import { RootStore } from '../stores/root-store';
import { observer } from 'mobx-react-lite';

interface NewCompanyProps {
    rootStore: RootStore;
}

export const NewCompanyPage: React.FC<NewCompanyProps> = observer((props: NewCompanyProps): JSX.Element => {
    const history = useHistory();

    const { rootStore } = props;

    const submitHandler = async (values: any): Promise<void> => {
        const companyData = {
            name: values.name,
            phone: values.phone,
            address: values.address,
        };

        await rootStore.companyStore.addCompany(companyData).then(() => {
            history.replace('');
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
});
