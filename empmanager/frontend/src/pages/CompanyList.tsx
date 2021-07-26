import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Button, Descriptions, Drawer, Input, Modal, Space, Spin, Table} from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import {TextInput} from "../components/form/TextInput";
import {NumberInput} from "../components/form/NumberInput";
import {Formik, Form} from "formik";

export function CompanyListPage(): JSX.Element {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
                    <Button onClick={(e) =>{deleteHandler(record.id)}}>Smazat</Button>
                </Space>
            ),
        },]

    function deleteHandler(id: number){
        fetch(`http://localhost:8000/api/company-delete/${id}`),
            {
                method: 'DELETE',
                headers: {
                    'Content-type' : 'application/json',
                }
            }
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

        fetch(`http://localhost:8000/api/company-update/${updatedID}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(updatedCompany)}
        );

        setIsEditOpen(false)
        setIsLoading(true)
    }

    function handleModalCancel(){
        setIsEditOpen(false)
    }

    useEffect( () =>
    {
        fetch('http://localhost:8000/api/company-list')
            .then(response => response.json())
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

            <Drawer
                title="Upravit firmu"
                width={720}
                onClose={handleModalCancel}
                visible={isEditOpen}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={handleModalCancel} style={{ marginRight: 8 }}>
                            Zavřít okno
                        </Button>
                    </div>
                }
            >
                <Formik
                    initialValues={{
                        nazev: '',
                        telefon: 0,
                        adresa: ''

                    }}

                    onSubmit={updateHandler}>

                    <Form>
                        <TextInput label='Název firmy' spacesize='large' name="nazev" />

                        <NumberInput label='Telefon' spacesize='large' name="telefon" />

                        <TextInput label='Adresa' spacesize='large' name="adresa" />

                        <Button type="primary" htmlType="submit">Přidat</Button>
                    </Form>

                </Formik>

            </Drawer>

        </>
    )

}
