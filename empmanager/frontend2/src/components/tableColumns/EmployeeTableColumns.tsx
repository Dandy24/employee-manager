import { ColumnsType } from 'antd/lib/table/interface';
import { EmployeeStore } from '../../stores/employee-store';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { CompanyStore } from '../../stores/company-store';
import { EmployeeEntity } from '../../models/entities/employee-entity';

export function EmployeeTableColumns(
    employeeStore: EmployeeStore,
    companyStore: CompanyStore,
    onEmployeeDelete: (arg0: number) => void,
): ColumnsType<EmployeeEntity> {
    return [
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
            key: 'last_name',
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
            render: (row) => {
                return <p>{row?.id && companyStore.companies[row.id] ? companyStore.companies[row.id].name : ''}</p>;
            },
            //render: (text: string, row: { company: number; }) => <p> {getCompanyName(row.company)} </p>
        },
        {
            title: 'Aktivní',
            dataIndex: 'active',
            key: 'active',
            render: (text: string, row: { active: boolean }) => <p> {row.active ? 'Ano' : 'Ne'} </p>,
        },
        {
            title: 'Akce',
            key: 'action',
            render: (record: EmployeeEntity) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            employeeStore.openToEdit(record);
                        }}
                    >
                        Upravit
                    </Button>
                    <Button
                        onClick={async () => {
                            await onEmployeeDelete(record.id);
                        }}
                    >
                        Smazat
                    </Button>
                    <Link to={`/monthly-output/${record.id}`}>
                        <Button>kok</Button>
                    </Link>
                </Space>
            ),
        },
    ];
}
