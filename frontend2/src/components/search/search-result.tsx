import { Avatar, Divider, Image, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { CompanyEntity } from '../../models/entities/company-entity';

// export interface SearchResultItemProps {
//     row: CompanyEntity; //| EmployeeEntity;
// }

export const SearchResultItem = (row: CompanyEntity): JSX.Element => {
    // const { row } = props;

    return (
        <Row>
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
