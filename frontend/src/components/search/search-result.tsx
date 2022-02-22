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
    profile_picture?: string;
}

export const SearchResultItem = (row: SearchRow, index: number, rootStore: RootStore): JSX.Element => {
    return (
        <Row data-testid={`search-item-${index}`}>
            {row.first_name && row.last_name ? (
                <Avatar
                    src={
                        row.profile_picture ? (
                            <Image
                                src={`http://localhost:8000${row.profile_picture}`}
                                style={{
                                    width: 32,
                                }}
                            />
                        ) : (
                            <Avatar>
                                {row.first_name.charAt(0)}
                                {row.last_name.charAt(0)}
                            </Avatar>
                        )
                    }
                />
            ) : (
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
            )}

            <Divider type="vertical" />
            <Title level={5}>
                <>
                    {row.first_name ? row.first_name : row.name} {row.last_name}
                    <Divider type={'vertical'} /> {row.phone} <Divider type={'vertical'} />{' '}
                    {row.company
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          rootStore.companyStore.companies.find((comp) => comp.id === parseInt(row.company))?.name
                        : row.address}
                </>
            </Title>
        </Row>
    );
};
