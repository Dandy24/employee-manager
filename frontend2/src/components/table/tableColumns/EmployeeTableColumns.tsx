import { EmployeeStore } from '../../../stores/employee-store';
import { Button, Space, Tag } from 'antd';
import React from 'react';
import { CompanyStore } from '../../../stores/company-store';
import { EmployeeEntity } from '../../../models/entities/employee-entity';
import { TableColumns } from '../../../models/interfaces/table-columns';
import { sort } from '../../../utils/table-sorter';

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
            width: 180,
            sorter: {
                compare: (a, b) => sort.NUMBER(a.id, b.id),
            },
        },
        {
            title: 'Jméno',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: {
                compare: (a, b) => sort.STRING(a.first_name, b.first_name),
            },
        },
        {
            title: 'Příjmení',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter: {
                compare: (a, b) => sort.STRING(a.last_name, b.last_name),
            },
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
            width: 180,
            render: (text, record: EmployeeEntity) => <p>{`+${record.phone}`}</p>,
            sorter: {
                compare: (a, b) => sort.NUMBER(a.phone, b.phone),
            },
        },
        {
            title: 'Firma',
            dataIndex: 'company',
            key: 'company',
            render: (text) => {
                return <p>{companyStore.companies.find((comp) => comp.id === text)?.name}</p>;
            },
            Cell: ({ value }) => <p>{companyStore.companies.find((comp) => comp.id === value)?.name}</p>,
            // sorter: {
            //     compare: (a, b) => sort.STRING(a.company, b.company),
            // },
        },
        {
            title: 'Aktivní',
            dataIndex: 'active',
            key: 'active',
            width: 160,
            render: (value, row) => (
                <Tag
                    style={{ width: '75%', textAlign: 'center' }}
                    color={value ? '#87d068' : '#f50'}
                    data-testid={value ? `employee-${row.id}-active-tag` : `employee-${row.id}-inactive-tag`}
                >
                    {value ? 'Ano' : 'Ne'}
                </Tag>
            ),
            Cell: ({ value, row }) => (
                <Tag
                    style={{ width: '75%', textAlign: 'center' }}
                    color={value ? '#87d068' : '#f50'}
                    data-testid={value ? `employee-${row.index}-active-tag` : `employee-${row.index}-inactive-tag`}
                >
                    {value ? 'Ano' : 'Ne'}
                </Tag>
            ),
            sorter: {
                compare: (a, b) => sort.NUMBER(a.active, b.active),
            },
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
