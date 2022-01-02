import { EmployeeEntity } from '../entities/employee-entity';

export interface TableColumns {
    title: string;
    dataIndex?: string;
    key: string;
    render?(text: string | number, row?: EmployeeEntity): JSX.Element;

    Cell?(arg0: ColumnRenderCell): JSX.Element;
}

export interface ColumnRenderCell {
    value: any;
    row: any;
}
