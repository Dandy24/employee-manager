import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoComplete, Input } from 'antd';
import { SearchableCompanyEntity } from '../../models/entities/searchable-company-entity';
import { EmptyResults } from './empty-results';
import { useRootStore } from '../../stores/root-store-provider';
import { SearchableEmployeeEntity } from '../../models/entities/searchable-employee-entity';

export interface SearchComponentProps {
    options: SearchableCompanyEntity[] | SearchableEmployeeEntity[]; // | SearchableEmployeeEntity[];
    type: 'employee' | 'company';
}

export const SearchComponent: React.FC<SearchComponentProps> = observer((props: SearchComponentProps) => {
    const { options, type } = props;

    const rootStore = useRootStore();

    const searchHandler = async (value, option?) => {
        //TODO make component not call BE fetch on every search. Use and filter already fetched data instead (make a copy of array and pass it as options?)
        if (type === 'company') {
            await rootStore.companyStore.fetchAllCompanies(value, undefined);
        }
    };

    const selectHandler = async (value, option) => {
        //TODO make component not call BE fetch on every search. Use and filter already fetched data instead (make a copy of array and pass it as options?)
        if (type === 'company') {
            await rootStore.companyStore.fetchAllCompanies(undefined, option);
        } else {
            await rootStore.employeeStore.fetchAllEmployees(undefined, undefined, option);
            rootStore.dashboardStore.switchMode();
        }
    };

    const resetHandler = async () => {
        if (type === 'company') {
            await rootStore.companyStore.fetchAllCompanies();
        } else {
            await rootStore.employeeStore.fetchAllEmployees();
            rootStore.dashboardStore.switchMode();
        }
    };

    return (
        <>
            <AutoComplete
                style={{
                    width: 600,
                }}
                data-testid="search-bar"
                options={options}
                notFoundContent={<EmptyResults type={type} />}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={selectHandler}
                allowClear
                onClear={resetHandler}
            >
                <Input.Search
                    size="large"
                    placeholder={type === 'company' ? `Vyhledejte firmu` : 'Vyhledejte zamestnance'}
                    onSearch={searchHandler}
                    enterButton
                    style={{ width: '108%' }}
                    data-testid={'search-button'}
                />
            </AutoComplete>
        </>
    );
});
