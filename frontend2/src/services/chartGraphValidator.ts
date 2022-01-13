import {
    ExtendedHoursTypeGraphDataInterface,
    GraphDataInterface,
    HoursTypeGraphDataInterface,
} from '../models/interfaces/graph-data-interface';

export const isChartDataValid = (
    data: GraphDataInterface[] | HoursTypeGraphDataInterface[] | ExtendedHoursTypeGraphDataInterface[],
): boolean => {
    if (data?.length <= 0) {
        return false;
    }
    if (!Array.isArray(data)) {
        return false;
    }
    if (data.some((obj) => obj.name === '' || obj.name === null || obj.name === undefined)) {
        return false;
    }
    return true;
};
