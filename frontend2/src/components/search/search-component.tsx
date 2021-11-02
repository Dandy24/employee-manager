import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoComplete } from 'antd';

export interface SearchComponentProps {
    options: any; // EmployeeEntity[] | CompanyEntity[];
}

export const SearchComponent: React.FC<SearchComponentProps> = observer((props: SearchComponentProps) => {
    const { options } = props;

    const searchHandler = (value, option) => {
        console.log(option);
    };

    return (
        <>
            {console.log(options)}
            <AutoComplete
                style={{
                    width: 400,
                }}
                options={options}
                placeholder="Vyhledejte firmu"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onChange={searchHandler}
            />
        </>
    );
});
