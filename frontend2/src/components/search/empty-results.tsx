import { DisconnectOutlined } from '@ant-design/icons';
import React from 'react';

export const EmptyResults: React.FC = (): JSX.Element => {
    return (
        <div style={{ textAlign: 'center' }} data-testid="empty-autocomplete-list">
            <DisconnectOutlined style={{ fontSize: '3rem' }} />
            <p>Firma nebyla nalezena</p>
        </div>
    );
};
