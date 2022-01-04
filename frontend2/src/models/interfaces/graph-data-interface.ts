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
    name: string;
    work: number;
    vac: number;
    sick: number;
    overtime?: number;
}
