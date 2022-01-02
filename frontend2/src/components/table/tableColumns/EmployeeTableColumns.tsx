import { EmployeeStore } from '../../../stores/employee-store';
import { Button, Space, Tag } from 'antd';
import React from 'react';
import { CompanyStore } from '../../../stores/company-store';
import { EmployeeEntity } from '../../../models/entities/employee-entity';
import { TableColumns } from '../../../models/interfaces/table-columns';

export function EmployeeTableColumns(
    employeeStore: EmployeeStore,
    companyStore: CompanyStore,
    onEmployeeDelete?: (arg0: number) => void,
): TableColumns[] {
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
            render: (text) => {
                return <p>{companyStore.companies.find((comp) => comp.id === text)?.name}</p>;
            },
            Cell: ({ value }) => <p>{companyStore.companies.find((comp) => comp.id === value)?.name}</p>,
        },
        {
            title: 'Aktivní',
            dataIndex: 'active',
            key: 'active',
            render: (text: string, row: { active: boolean }) => <p> {row.active ? 'Ano' : 'Ne'} </p>,
            Cell: ({ value, row }) => (
                <Tag
                    style={{ width: '75%', textAlign: 'center' }}
                    color={value ? '#87d068' : '#f50'}
                    data-testid={value ? `employee-${row.index}-active-tag` : `employee-${row.index}-inactive-tag`}
                >
                    {value ? 'Ano' : 'Ne'}
                </Tag>
            ),
        },
        {
            title: 'Akce',
            key: 'action',
            render: (text, record: EmployeeEntity) => (
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
                </Space>
            ),
        },
    ];
}
