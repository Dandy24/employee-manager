import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoComplete, Input } from 'antd';
import { SearchableCompanyEntity } from '../../models/entities/searchable-company-entity';
import { EmptyResults } from './empty-results';
import { useRootStore } from '../../stores/root-store-provider';

export interface SearchComponentProps {
    options: SearchableCompanyEntity[]; // | SearchableEmployeeEntity[];
}

export const SearchComponent: React.FC<SearchComponentProps> = observer((props: SearchComponentProps) => {
    const { options } = props;

    const rootStore = useRootStore();

    const searchHandler = async (value, option?) => {
        //TODO make component not call BE fetch on every search. Use and filter already fetched data instead (make a copy of array and pass it as options?)
        await rootStore.companyStore.fetchAllCompanies(value, undefined);
    };

    const selectHandler = async (value, option) => {
        //TODO make component not call BE fetch on every search. Use and filter already fetched data instead (make a copy of array and pass it as options?)
        await rootStore.companyStore.fetchAllCompanies(undefined, option);
    };

    const resetHandler = async () => {
        await rootStore.companyStore.fetchAllCompanies();
    };

    return (
        <>
            <AutoComplete
                style={{
                    width: 600,
                }}
                data-testid="search-bar"
                options={options}
                notFoundContent={<EmptyResults />}
                placeholder="Vyhledejte firmu"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={selectHandler}
                allowClear
                onClear={resetHandler}
            >
                <Input.Search size="large" onSearch={searchHandler} enterButton />
            </AutoComplete>
        </>
    );
});
