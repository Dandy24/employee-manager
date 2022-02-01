export class OverallMonthlyOutputDto {
    working_hours: number; //FixME django rest returns decimals as string in JSON
    sick_hours: number; //FIXME find a way to store it as a number type
    vacation_hours: number;
    start_date: string;
    end_date: string;
    // effectivity: number;
    housing_capacity: number;
}
