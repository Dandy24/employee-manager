import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Button, Descriptions, Space, Spin, Table} from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";

export function CompanyListPage(): JSX.Element {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const [isLoading, setIsLoading] = useState(true);
    const [loadedCompaniesList, setLoadedCompaniesList] = useState<any[]>([])  //TODO Typescript

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
    }, [isLoading])

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin spinning indicator={antIcon}>Načítá se seznam firem</Spin>
            </div>
        );
    }

    return (
        <Table columns={columns} dataSource={loadedCompaniesList}/>
    )

}
