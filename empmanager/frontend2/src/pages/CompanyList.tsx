import React, { useEffect } from 'react';
import { Modal, Table } from 'antd';
import { CompanyForm } from '../components/form/CompanyForm';
import { CompanyFormik } from '../components/form/CompanyFormik';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EditDrawer } from '../components/EditDrawer';
import { RootStore } from '../stores/root-store';
import { observer } from 'mobx-react-lite';
import { CompanyTableColumns } from '../components/tableColumns/CompanyTableColumns';

interface CompanyListProps {
    rootStore: RootStore;
}

export const CompanyListPage: React.FC<CompanyListProps> = observer((props: CompanyListProps): JSX.Element => {
    const { rootStore } = props;
    const { companyStore } = rootStore;

    const { confirm } = Modal;

    rootStore.setActivePage('company-list');

    const columns = CompanyTableColumns(companyStore, onCompanyDelete);

    async function onCompanyDelete(company: any) {
        confirm({
            title: 'Opravdu chcete smazat tuto firmu?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tuto akci nelze vrátit zpět',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            async onOk() {
                await companyStore.deleteCompany(company);
            },
        });
    }

    async function updateHandler(values: any) {
        const updatedCompany = {
            name: values.name,
            phone: values.phone,
            address: values.address,
        };

        await companyStore.editCompany(updatedCompany);
    }

    useEffect(() => {
        (async () => {
            await companyStore.fetchAllCompanies();
        })();
    }, []);

    // if (companyStore.loadingCompanies) {
    //     return <LoadingSpinner text="Načítá se seznam firem" />;
    // }

    return (
        <>
            <Table
                rowKey="id"
                loading={companyStore.loadingCompanies}
                columns={columns}
                dataSource={companyStore.companies}
            />

            <EditDrawer
                title="Upravit firmu"
                onClose={() => {
                    companyStore.closeModal();
                }}
                visible={companyStore.isEditOpen}
                cancelOnClick={() => {
                    companyStore.closeModal();
                }}
                cancelButtonText="Zavřít okno"
            >
                <CompanyFormik onSubmit={updateHandler} initialValues={companyStore.company}>
                    <CompanyForm
                        companyName="name"
                        companyPhone="phone"
                        companyAddress="address"
                        companyNameLabel="Název firmy"
                        companyPhoneLabel="Telefon"
                        companyAddressLabel="Adresa"
                    />
                </CompanyFormik>
            </EditDrawer>
        </>
    );
});
