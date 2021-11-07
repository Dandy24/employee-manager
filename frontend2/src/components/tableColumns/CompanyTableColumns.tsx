import { Button, Space } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { CompanyStore } from '../../stores/company-store';
import { CompanyEntity } from '../../models/entities/company-entity';
import { Link } from 'react-router-dom';

export function CompanyTableColumns(
    companyStore: CompanyStore,
    onCompanyDelete: (arg0: CompanyEntity) => void,
): ColumnsType<CompanyEntity> {
    return [
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
            render: (record: CompanyEntity) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            companyStore.openToEdit(record);
                        }}
                    >
                        Upravit
                    </Button>
                    <Button
                        onClick={async () => {
                            await onCompanyDelete(record);
                        }}
                    >
                        Smazat
                    </Button>
                    <Link to={`/shift-calendar/${record.id}`}>
                        <Button>Kalendář směn</Button>
                    </Link>
                </Space>
            ),
        },
    ];
}
