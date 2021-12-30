import { Avatar, Divider, Image, Row } from 'antd';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { CompanyEntity } from '../../models/entities/company-entity';
import { RootStore } from '../../stores/root-store';

interface SearchRow {
    name?: string;
    first_name?: string;
    last_name?: string;
    phone: number;
    company?: CompanyEntity;
    address?: string;
}

export const SearchResultItem = (row: SearchRow, index: number, rootStore: RootStore): JSX.Element => {
    return (
        <Row data-testid={`search-item-${index}`}>
            <Avatar
                src={
                    <Image
                        src="https://joeschmoe.io/api/v1/random"
                        style={{
                            width: 32,
                        }}
                    />
                }
            />
            <Divider type="vertical" />
            <Title level={5}>
                <>
                    {row.first_name ? row.first_name : row.name} {row.last_name}
                    <Divider type={'vertical'} /> {row.phone} <Divider type={'vertical'} />{' '}
                    {row.company
                        ? rootStore.companyStore.companies.find((comp) => comp.id === parseInt(row.company.name))
                        : row.address}
                </>
            </Title>
        </Row>
    );
};
