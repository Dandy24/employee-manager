import { DisconnectOutlined } from '@ant-design/icons';
import React from 'react';

export interface EmptyResultsProps {
    type: 'company' | 'employee';
}

export const EmptyResults: React.FC<EmptyResultsProps> = (props: EmptyResultsProps): JSX.Element => {
    const { type } = props;

    return (
        <div style={{ textAlign: 'center' }} data-testid="empty-autocomplete-list">
            <DisconnectOutlined style={{ fontSize: '3rem' }} />
            <p>{type === 'company' ? `Firma nebyla nalezena` : 'Zameestnanec nebyl nalezen'}</p>
        </div>
    );
};
