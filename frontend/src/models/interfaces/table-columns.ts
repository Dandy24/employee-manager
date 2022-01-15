import { EmployeeEntity } from '../entities/employee-entity';

export interface TableColumns {
    title: string;
    dataIndex?: string;
    key: string;
    width?: string | number;
    render?(text: string | number, row?: EmployeeEntity): JSX.Element;

    sorter?: SorterProperties;
    Cell?(arg0: ColumnRenderCell): JSX.Element;
}

export interface ColumnRenderCell {
    value: any;
    row: any;
}

export interface SorterProperties {
    compare(param1: any, param2: any): number;
}
