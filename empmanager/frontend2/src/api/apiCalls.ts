import { toJS } from 'mobx';
import { CompanyEntity } from '../models/entities/company-entity';
import { CompanyDto } from '../models/dtos/company-dto';
import { EmployeeEntity } from '../models/entities/employee-entity';
import { EmployeeDto } from '../models/dtos/employee-dto';

export function getEmployeeList(): Promise<EmployeeEntity[]> {
    return fetch('http://localhost:8000/api/employee-list').then((response) => response.json());
}

//Employee detail

export function createEmployee(employee: EmployeeDto): Promise<EmployeeEntity> {
    return fetch('http://localhost:8000/api/employee-create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
}

export function updateEmployee(editedID: number, updatedEmployee: EmployeeDto): Promise<EmployeeEntity> {
    //TODO fix editedID

    return fetch(`http://localhost:8000/api/employee-update/${editedID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
}

export function deleteEmployee(id: number): Promise<Response> {
    return fetch(`http://localhost:8000/api/employee-delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export function getCompanyList(): Promise<CompanyEntity[]> {
    return fetch('http://localhost:8000/api/company-list')
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export function createCompany(company: CompanyDto): Promise<CompanyEntity> {
    return fetch('http://localhost:8000/api/company-create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(company),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
}

export function updateCompany(updatedCompany: CompanyDto, updatedID: number): Promise<CompanyEntity> {
    return fetch(`http://localhost:8000/api/company-update/${updatedID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedCompany),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
}

export function deleteCompany(id: number): Promise<Response> {
    return fetch(`http://localhost:8000/api/company-delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export function getMonthlyOutput(id: number) {
    return fetch(`http://localhost:8000/api/monthly-output-list/${id}`).then((response) => response.json());
}
