import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Button, message, Modal, Space, Spin, Table} from "antd";
import {CompanyForm} from "../components/form/CompanyForm";
import {CompanyFormik} from "../components/form/CompanyFormik";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {EditDrawer} from "../components/EditDrawer";
import {deleteCompany, getCompanyList, updateCompany} from "../api/apiCalls";

export function CompanyListPage(): JSX.Element {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const { confirm } = Modal;

    const [isLoading, setIsLoading] = useState(true);
    const [loadedCompaniesList, setLoadedCompaniesList] = useState<any[]>([])  //TODO Typescript
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [updatedID, setUpdatedID] = useState(null)

    const columns = [
        {
            title: 'ID společnosti',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Název společnosti',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Telefonní číslo',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Adresa sídla společnosti',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Akce',
            key: 'action',
            render: (record: { id: number }) => (
                <Space size="middle">
                    <Button onClick={(e) =>{showEditModal(record)}}>Upravit</Button>
                    <Button onClick={(e) =>{onCompanyDelete(record.id)}}>Smazat</Button>
                </Space>
            ),
        },]

    function onCompanyDelete(id: number){
        confirm({
            title: 'Opravdu chcete smazat tuto firmu?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tuto akci nelze vrátit zpět',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            onOk() {
                deleteHandler(id)
            },
        });
    }

    function deleteHandler(id: number){
        deleteCompany(id)
        setIsLoading(true)
    }

    function showEditModal(record: any){
        setIsEditOpen(true)
        setUpdatedID(record.id)
    }

    function updateHandler(values: any){

        const updatedCompany = {
            name: values.nazev,
            phone: values.telefon,
            address: values.adresa
        }

        updateCompany(updatedID, updatedCompany) //TODO Then?

        setIsEditOpen(false)
        setIsLoading(true)

        message.warning('Údaje o společnosti byly upraveny');
    }

    function handleModalCancel(){
        setIsEditOpen(false)
    }

    useEffect( () =>
    {
        getCompanyList()
            .then(data =>
                {
                    setLoadedCompaniesList(data);
                    setIsLoading(false);
                }
            )
    }, [isLoading, isEditOpen])

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin spinning indicator={antIcon}>Načítá se seznam firem</Spin>
            </div>
        );
    }

    return (
        <>

            <Table columns={columns} dataSource={loadedCompaniesList}/>

            <EditDrawer title="Upravit firmu" onClose={handleModalCancel} visible={isEditOpen}
                        cancelOnClick={handleModalCancel} cancelButtonText="Zavřít okno">

                <CompanyFormik onSubmit={updateHandler} initialName='' initialAddress='' initialPhone={0}>
                    <CompanyForm companyName='nazev' companyPhone='telefon' companyAddress='adresa'
                                 companyNameLabel='Název firmy' companyPhoneLabel='Telefon' companyAddressLabel='Adresa'/>
                </CompanyFormik>

            </EditDrawer>

        </>
    )

}
