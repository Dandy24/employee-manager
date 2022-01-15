export const sortString = (param1: string, param2: string): number => {
    return param1.localeCompare(param2);
};

export const sortNumber = (param1: number, param2: number): number => {
    return param1 - param2;
};

export const sort = {
    STRING: sortString,
    NUMBER: sortNumber,
};
