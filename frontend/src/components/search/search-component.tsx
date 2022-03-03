import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoComplete, Input } from 'antd';
import { SearchableCompanyEntity } from '../../models/entities/searchable-company-entity';
import { EmptyResults } from './empty-results';
import { useRootStore } from '../../stores/root-store-provider';
import { SearchableEmployeeEntity } from '../../models/entities/searchable-employee-entity';

export interface SearchComponentProps {
    options: SearchableCompanyEntity[] | SearchableEmployeeEntity[];
    type: 'employee' | 'company';
}

export const SearchComponent: React.FC<SearchComponentProps> = observer((props: SearchComponentProps) => {
    const { options, type } = props;

    const rootStore = useRootStore();

    const searchHandler = async (value) => {
        //TODO make component not call BE fetch on every search. Use and filter already fetched data instead (make a copy of array and pass it as options?)
        // FIXME proc se tady neposila string na BE a tam se nepouziva filter (WHERE atd.) bylo by to jednodussi i efektivnejsi
        if (type === 'company') {
            await rootStore.companyStore.fetchAllCompanies(value, undefined);
        }
        if (type === 'employee') {
            await rootStore.employeeStore.fetchAllEmployees(undefined, value, undefined);
        }
    };

    const selectHandler = async (value, option) => {
        //TODO make component not call BE fetch on every search. Use and filter already fetched data instead (make a copy of array and pass it as options?)
        // FIXME proc se tady neposila string na BE a tam se nepouziva filter (WHERE atd.) bylo by to jednodussi i efektivnejsi
        if (type === 'employee') {
            await rootStore.employeeStore.fetchAllEmployees(undefined, undefined, option);
            if (rootStore.activePage === 'dashboard') {
                rootStore.dashboardStore.switchMode();
            }
        }
        if (type === 'company') {
            await rootStore.companyStore.fetchAllCompanies(undefined, option);
        }
    };

    const resetHandler = async () => {
        if (type === 'employee') {
            await rootStore.employeeStore.fetchAllEmployees();
            if (rootStore.activePage === 'dashboard') {
                rootStore.dashboardStore.switchMode();
            }
        }
        if (type === 'company') {
            await rootStore.companyStore.fetchAllCompanies();
        }
    };

    return (
        <>
            <AutoComplete
                style={{
                    width: '85%',
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
                    placeholder={type === 'company' ? `Vyhledejte firmu` : 'Vyhledejte zaměstnance'}
                    onSearch={searchHandler}
                    enterButton
                    style={{ width: '108%' }}
                    data-testid={'search-button'}
                />
            </AutoComplete>
        </>
    );
});
