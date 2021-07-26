import {LoadingOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Descriptions, Space, Spin, Table} from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";

export function CompanyList(): JSX.Element {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const [isLoading, setIsLoading] = useState(true);
    const [loadedCompaniesList, setLoadedCompaniesList] = useState<any[]>([])

    const columns = [
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
        }]

    useEffect( () =>
    {
        fetch('http://localhost:8000/api/company-list')
            .then(response => response.json())
            .then(data =>
                {
                    /*console.log(data);
                    const companies: { id: number; name: string; phone: number; address: string; }[] = []

                     data.forEach( (element: { id: number; name: string; phone: number; address: string; }) => {
                         const company = {
                             id: element.id,
                             name: element.name,
                             phone: element.phone,
                             address: element.address
                         }
                         companies.push(company)
                     })*/

                    //console.log(companies)
                    setLoadedCompaniesList(data);
                    setIsLoading(false);
                }
            )
    }, [])

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin spinning indicator={antIcon}>Načítá se seznam firem</Spin>
            </div>
        );
    }

    return (
        <Table columns={columns} dataSource={loadedCompaniesList} />
    )

}
