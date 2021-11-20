import { observer } from 'mobx-react-lite';
import React from 'react';

export interface TableWrapperProps {
    children: React.ReactNode;
}

export const TableWrapper: React.FC<TableWrapperProps> = observer((props: TableWrapperProps): JSX.Element => {
    return (
        <div className="ant-table-wrapper">
            <div className="ant-table">
                <div className="ant-table-container">
                    <div className="ant-table-content">{props.children}</div>
                </div>
            </div>
        </div>
    );
});
