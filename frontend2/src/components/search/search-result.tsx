import { Avatar, Divider, Image, Row } from 'antd';
import React from 'react';
import { CompanyEntity } from '../../models/entities/company-entity';
import Title from 'antd/lib/typography/Title';
import { EmployeeEntity } from '../../models/entities/employee-entity';

export const SearchResultItem = (row: CompanyEntity | EmployeeEntity, index: number): JSX.Element => {
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
                {row instanceof CompanyEntity ? (
                    <>
                        {row.name} <Divider type={'vertical'} /> {row.phone} <Divider type={'vertical'} /> {row.address}
                    </>
                ) : (
                    <>
                        {row.first_name} {row.last_name}
                        <Divider type={'vertical'} /> {row.phone} <Divider type={'vertical'} /> {row.company}
                    </>
                )}
            </Title>
        </Row>
    );
};
