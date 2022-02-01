import { EmployeeStore } from '../../../stores/employee-store';
import { Avatar, Button, Space, Tag, Image } from 'antd';
import React, { useMemo } from 'react';
import { CompanyStore } from '../../../stores/company-store';
import { EmployeeEntity } from '../../../models/entities/employee-entity';
import { TableColumns } from '../../../models/interfaces/table-columns';
import { sort } from '../../../utils/table-sorter';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export function EmployeeTableColumns(
    employeeStore: EmployeeStore,
    companyStore: CompanyStore,
    onEmployeeDelete?: (arg0: number) => void,
): TableColumns[] {
    return [
        {
            title: '',
            dataIndex: 'profile_picture',
            key: 'profile_picture',
            width: 65,
            render: (text, record: EmployeeEntity) => {
                return record.profile_picture?.length > 1 ? (
                    <Avatar
                        src={
                            <Image
                                src={useMemo(() => `http://localhost:8000${record.profile_picture}`, [])}
                                style={{
                                    width: 32,
                                }}
                            />
                        }
                    />
                ) : (
                    <Avatar>
                        {record.first_name.charAt(0)}
                        {record.last_name.charAt(0)}
                    </Avatar>
                );
            },
            Cell: ({ row }) => {
                return row.values.profile_picture?.length > 1 ? (
                    <Avatar
                        src={
                            <Image
                                src={useMemo(() => `http://localhost:8000${row.values.profile_picture}`, [])}
                                style={{
                                    width: 32,
                                }}
                            />
                        }
                    />
                ) : (
                    <Avatar>
                        {row.values.first_name.charAt(0)}
                        {row.values.last_name.charAt(0)}
                    </Avatar>
                );
            },
        },
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
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            employeeStore.openToEdit(record);
                        }}
                        data-testid={`employee-${record.id}-edit-button`}
                    >
                        Upravit
                    </Button>
                    <Button
                        type="primary"
                        icon={<DeleteOutlined />}
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
