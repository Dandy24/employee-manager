import { Button, Space } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { CompanyStore } from '../../../stores/company-store';
import { CompanyEntity } from '../../../models/entities/company-entity';
import { Link } from 'react-router-dom';
import { sort } from '../../../utils/table-sorter';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

export function CompanyTableColumns(
    companyStore: CompanyStore,
    onCompanyDelete: (arg0: CompanyEntity) => void,
): ColumnsType<CompanyEntity> {
    return [
        {
            title: 'ID společnosti',
            dataIndex: 'id',
            key: 'id',
            width: 180,
            sorter: {
                compare: (a, b) => sort.NUMBER(a.id, b.id),
            },
        },
        {
            title: 'Název společnosti',
            dataIndex: 'name',
            key: 'name',
            width: 350,
            sorter: {
                compare: (a, b) => sort.STRING(a.name, b.name),
            },
        },
        {
            title: 'Telefonní číslo',
            dataIndex: 'phone',
            key: 'phone',
            width: 180,
            render: (text, record: CompanyEntity) => <p>{`+${record.phone}`}</p>,
            sorter: {
                compare: (a, b) => sort.NUMBER(a.phone, b.phone),
            },
        },
        {
            title: 'Adresa sídla společnosti',
            dataIndex: 'address',
            key: 'address',
            sorter: {
                compare: (a, b) => sort.STRING(a.address, b.address),
            },
        },
        {
            title: 'Akce',
            key: 'action',
            render: (record: CompanyEntity) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            companyStore.openToEdit(record);
                        }}
                    >
                        Upravit
                    </Button>
                    <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={async () => {
                            await onCompanyDelete(record);
                        }}
                    >
                        Smazat
                    </Button>
                    <Link data-testid={`company-calendar-button-${record.id}`} to={`/shift-calendar/${record.id}`}>
                        <Button type="primary" icon={<CalendarOutlined />}>
                            Kalendář směn
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];
}
