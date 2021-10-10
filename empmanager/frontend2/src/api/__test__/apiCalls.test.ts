import { createEmployee, getEmployeeList } from '../apiCalls';
import { EmployeeEntity } from '../../models/entities/employee-entity';
import { WorkingCategoryEnum } from '../../models/enums/working-category-enum';
import moment from 'moment';
import { EmployeeDto } from '../../models/dtos/employee-dto';
jest.mock('../../models/dtos/employee-dto');
jest.mock('../../models/entities/employee-entity');

beforeEach(() => {
    fetchMock.resetMocks();
    EmployeeEntity.mockClear();
});

/* Test GETing list of employees */

test('Get list of employees correctly', async () => {
    const employees = [
        {
            id: 2,
            first_name: 'Jan',
            last_name: 'Novák',
            email: 'novak.j@gmail.com',
            phone: 123456789,
            health_limitations: 'Zlomena ruka',
            active: true,
            working_category: 'C',
            med_exam_date: '2021-09-28',
            job_assign_date: '2021-09-31',
            company: null,
        },
        {
            id: 19,
            first_name: 'Dan',
            last_name: 'Godula',
            email: 'dan@seznam.cz',
            phone: 987654321,
            health_limitations: null,
            active: false,
            working_category: 'A',
            med_exam_date: '2021-09-16',
            job_assign_date: '2021-09-21',
            company: null,
        },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(employees), { status: 200 });

    const responseEmployees = await getEmployeeList();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/employee-list');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.Response().status).toEqual(200);
    expect(fetch.Response().statusText).toEqual('OK');
    expect(responseEmployees).toEqual(employees);
    expect(responseEmployees).toHaveLength(2);
    //expect(employees[0]).toBeInstanceOf(EmployeeEntity);
    //expect(responseEmployees).toBeInstanceOf(Array);
});

test('Fail getting list of employees', async () => {
    const employees = [
        {
            id: 2,
            first_name: 'Jan',
            last_name: 'Novák',
            email: 'novak.j@gmail.com',
            phone: 123456789,
            health_limitations: 'Zlomena ruka',
            active: true,
            working_category: 'C',
            med_exam_date: '2021-09-28',
            job_assign_date: '2021-09-31',
            company: null,
        },
        {
            id: 19,
            first_name: 'Dan',
            last_name: 'Godula',
            email: 'dan@seznam.cz',
            phone: 987654321,
            health_limitations: null,
            active: false,
            working_category: 'A',
            med_exam_date: '2021-09-16',
            job_assign_date: '2021-09-21',
            company: null,
        },
    ];

    fetchMock.mockReject(Error('Unable to load list of employees'));

    const responseEmployees = await getEmployeeList();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/employee-list');
    expect(fetch).toHaveBeenCalledTimes(1);
    //expect(fetch.Response().status).not.toEqual(200);
    expect(responseEmployees).toBeInstanceOf(Error);
    expect(responseEmployees.message).toBe('Unable to load list of employees');

    // expect(fetch.Response().statusText).toEqual('OK');
});

/* Test POSTing (creating) a new employee */

test('Add a new employee to the list', async () => {
    const employee: EmployeeDto = {
        first_name: 'Jan',
        last_name: 'Novák',
        email: 'novak.j@gmail.com',
        phone: 123456789,
        health_limitations: 'Zlomena ruka',
        active: true,
        working_category: WorkingCategoryEnum.C,
        med_exam_date: '2021-01-01',
        job_assign_date: '2021-02-02',
        company: null,
    };

    const createdEmp: EmployeeEntity = {
        id: 1,
        first_name: 'Jan',
        last_name: 'Novák',
        email: 'novak.j@gmail.com',
        phone: 123456789,
        health_limitations: 'Zlomena ruka',
        active: true,
        working_category: WorkingCategoryEnum.C,
        med_exam_date: moment('2021-01-01').toDate(),
        job_assign_date: moment('2021-02-02').toDate(),
        company: null,
    };

    fetchMock.mockResponseOnce(JSON.stringify(createdEmp), { status: 200 });

    const createdEmployee = await createEmployee(employee);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/employee-create', {
        body: JSON.stringify(employee),
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(createdEmployee.id).toBeDefined();
    expect(fetch.Response().status).toEqual(200);

    //expect(createdEmployee).toBe(createdEmp);
    //expect(createdEmployee).toBeInstanceOf(EmployeeEntity);
});
