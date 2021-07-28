import {Button, message, Modal, Space, Spin, Table} from "antd";
import React, {useEffect, useState} from "react";
import {ExclamationCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import {EditDrawer} from "../components/EditDrawer";

export function EmployeeListPage(): JSX.Element{

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const { confirm } = Modal;

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEmployeesList, setLoadedEmployeesList] = useState<any[]>([])  //TODO Typescript
    //const [loadedCompaniesList, setLoadedCompaniesList] = useState<any[]>([])  //TODO Typescript

    const columns = [
        {
            title: 'ID zaměstnance',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Jméno',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Příjmení',
            dataIndex: 'last_name',
            key: 'first_name',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Firma',
            dataIndex: 'company',
            key: 'company',
            //render: (text: string, row: { company: number; }) => <p> {getCompanyName(row.company)} </p>
        },
        {
            title: 'Aktivní',
            dataIndex: 'active',
            key: 'active',
            render: (text: string, row: { active: boolean; }) => <p> {row.active ? 'Ano' : 'Ne'} </p>
        },
        {
            title: 'Akce',
            key: 'action',
            render: (record: { id: number }) => (
                <Space size="middle">
                    <Button onClick={(e) =>{}}>Upravit</Button>
                    <Button onClick={(e) =>{onEmployeeDelete(record.id)}}>Smazat</Button>
                </Space>
            ),
        },
    ]

    useEffect( () =>
    {
        /*fetch('http://localhost:8000/api/company-list')
            .then(response => response.json())
            .then(data =>
                {
                    setLoadedCompaniesList(data);
                    setIsLoading(false);
                }
            )*/

        fetch('http://localhost:8000/api/employee-list')
            .then(response => response.json())
            .then(data =>
                {
                    setLoadedEmployeesList(data);
                    setIsLoading(false);
                }
            )

    }, [isLoading])

    function onEmployeeDelete(id: number){
        confirm({
            title: 'Opravdu chcete smazat toho zaměstnance?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tuto akci nelze vrátit zpět',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            onOk() {
                deleteHandler(id)
                message.success("Zaměstnanec byl smazán.")
            },
        });
    }

    function deleteHandler(id: number){
        fetch(`http://localhost:8000/api/employee-delete/${id}`),
            {
                method: 'DELETE',
                headers: {
                    'Content-type' : 'application/json',
                }
            }
        setIsLoading(true)
    }

    /*function getCompanyName(id:number) {

        fetch(`http://localhost:8000/api/company-detail/${id}`)
            .then(response => response.json())
            .then(data =>
                {
                    return data.name;
                }
            )
    }*/

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin spinning indicator={antIcon}>Načítá se seznam firem</Spin>
            </div>
        );
    }

    return (

        <>

        <Table columns={columns} dataSource={loadedEmployeesList} ></Table>

        </>

    )

}
