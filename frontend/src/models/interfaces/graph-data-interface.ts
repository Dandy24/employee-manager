export interface GraphDataInterface {
    name: string;
    value: number;
}

export interface HoursTypeGraphDataInterface {
    name: string;
    work: number;
    vac: number;
}

export interface ExtendedHoursTypeGraphDataInterface {
    id?: number;
    name: string;
    work: number;
    vac: number;
    sick: number;
    overtime?: number;
}
