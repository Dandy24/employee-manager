import { Avatar, Divider, Image, Row } from 'antd';
import React from 'react';
import { CompanyEntity } from '../../models/entities/company-entity';
import Title from 'antd/lib/typography/Title';

// export interface SearchResultItemProps {
//     row: CompanyEntity; //| EmployeeEntity;
// }

export const SearchResultItem = (row: CompanyEntity, index: number): JSX.Element => {
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
            <Title level={5}>{row.name}</Title>
            {/*  TODO add some more info  */}
        </Row>
    );
};
