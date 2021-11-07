import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoComplete, Button } from 'antd';
import { SearchableCompanyEntity } from '../../models/entities/searchable-company-entity';
import { DisconnectOutlined } from '@ant-design/icons';
import { EmptyResults } from './empty-results';
import { useRootStore } from '../../stores/root-store-provider';

export interface SearchComponentProps {
    options: SearchableCompanyEntity[]; // | SearchableEmployeeEntity[];
}

export const SearchComponent: React.FC<SearchComponentProps> = observer((props: SearchComponentProps) => {
    const { options } = props;

    const rootStore = useRootStore();

    const searchHandler = async (value, option) => {
        // rootStore.searchStore.setSelectedCompany(option);
        // console.log(option);
        await rootStore.companyStore.fetchAllCompanies(option); //TODO make component not call BE fetch on every search. Use and filter already fetched data instead
    };

    return (
        <>
            <AutoComplete
                style={{
                    width: 400,
                }}
                data-testid="search-bar"
                options={options}
                notFoundContent={<EmptyResults />}
                placeholder="Vyhledejte firmu"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={searchHandler}
            />
        </>
    );
});
