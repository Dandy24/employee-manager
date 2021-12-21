import React, { useEffect } from 'react';
import { Col, Modal, Row, Table } from 'antd';
import { CompanyForm } from '../components/form/CompanyForm';
import { CompanyFormik } from '../components/form/CompanyFormik';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EditDrawer } from '../components/EditDrawer';
import { RootStore } from '../stores/root-store';
import { observer } from 'mobx-react-lite';
import { CompanyTableColumns } from '../components/table/tableColumns/CompanyTableColumns';
import { CompanyEntity } from '../models/entities/company-entity';
import { CompanyDto } from '../models/dtos/company-dto';
import { SearchComponent } from '../components/search/search-component';
import { toJS } from 'mobx';
import { EmptyTable } from '../components/table/empty-table';
import { MyTable } from '../components/table/table';

interface CompanyListProps {
    rootStore: RootStore;
}

export const CompanyListPage: React.FC<CompanyListProps> = observer((props: CompanyListProps): JSX.Element => {
    const { rootStore } = props;
    const { companyStore } = rootStore;

    const { confirm } = Modal;

    rootStore.setActivePage('company-list');

    const columns = CompanyTableColumns(companyStore, onCompanyDelete);

    async function onCompanyDelete(company: CompanyEntity) {
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

    async function updateHandler(values: CompanyDto) {
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
            rootStore.searchStore.createSearchableCompanies();
        })();
    }, []);

    return (
        <>
            <Row justify="center" style={{ marginTop: '1%', marginBottom: '2%' }}>
                <Col>
                    <SearchComponent options={toJS(rootStore.searchStore.searchableCompanies)} />
                </Col>
            </Row>

            <MyTable
                loading={companyStore.loadingCompanies}
                columns={columns}
                rows={companyStore.companies}
                type="company"
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
