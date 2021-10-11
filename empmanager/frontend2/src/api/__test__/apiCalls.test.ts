import { createEmployee, getEmployeeList, updateEmployee } from '../apiCalls';
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

test('Get empty list of employees', async () => {
    const employees: EmployeeEntity[] = [];

    fetchMock.mockResponseOnce(JSON.stringify(employees), { status: 200 });

    const responseEmployees = await getEmployeeList();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/employee-list');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.Response().status).toEqual(200);
    expect(fetch.Response().statusText).toEqual('OK');
    expect(responseEmployees).toEqual([]);
    expect(responseEmployees).toHaveLength(0);
    //expect(employees[0]).toBeInstanceOf(EmployeeEntity);
    //expect(responseEmployees).toBeInstanceOf(Array);
});

test('Fail getting list of employees', async () => {
    fetchMock.mockReject(() => Promise.reject('Unable to load list of employees'));

    const responseEmployees = await getEmployeeList();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/employee-list');
    expect(fetch).toHaveBeenCalledTimes(1);
    //expect(fetch.Response().status).not.toEqual(200);

    //TODO find out why no Error is thrown
    //expect(fetch).toThrowError('Unable to load list of employees');
    //expect(fetch.Response().errors).not.toBeNull();

    //expect(responseEmployees).toHaveErrorMessage('Unable to load list of employees');
    //expect(responseEmployees.message).toBe('Unable to load list of employees');
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

test('Fail creating employee', async () => {
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

    //fetchMock.mockResponseOnce(JSON.stringify(createdEmp), { status: 200 });
    fetchMock.mockReject(() => Promise.reject('Unable to create employee'));

    const createdEmployee = await createEmployee(employee);

    console.log(createdEmployee);

    expect(fetch).toThrowError();
});

test('Update employee', async () => {
    const referenceEmp: EmployeeEntity = {
        id: 19,
        first_name: 'Dan',
        last_name: 'Godula',
        email: 'dan@seznam.cz',
        phone: 987654321,
        health_limitations: '',
        active: false,
        working_category: WorkingCategoryEnum.A,
        med_exam_date: moment('2021-09-16').toDate(),
        job_assign_date: moment('2021-09-21').toDate(),
        company: null,
    };

    const editedEmp: EmployeeDto = {
        first_name: 'Dan',
        last_name: 'Godula',
        email: 'dan@gmail.com',
        phone: 987654321,
        health_limitations: 'Špatný zrak',
        active: true,
        working_category: WorkingCategoryEnum.C,
        med_exam_date: '2021-09-16',
        job_assign_date: '2021-09-21',
        company: null,
    };

    fetchMock.mockResponseOnce(JSON.stringify(editedEmp), { status: 200 });

    const editedResponse = await updateEmployee(19, editedEmp);
    console.log(editedResponse);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/employee-update/19', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(editedEmp),
    });

    expect(editedResponse.working_category).not.toEqual(referenceEmp.working_category);
    //expect(editedResponse.med_exam_date).toBe(referenceEmp.med_exam_date); // TODO zkontrolovat rozdil v typech string a Date
    expect(editedResponse.company).toBeNull();
    expect(editedResponse.id).toBeDefined(); //ID se tvori na BE... Testovat zde?
});
