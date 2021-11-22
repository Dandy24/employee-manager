import { CompanyEntity } from '../models/entities/company-entity';
import { CompanyDto } from '../models/dtos/company-dto';
import { EmployeeEntity } from '../models/entities/employee-entity';
import { EmployeeDto } from '../models/dtos/employee-dto';
import { ShiftDto } from '../models/dtos/shift-dto';
import { ShiftEntity } from '../models/entities/shift-entity';

export async function getEmployeeList(): Promise<EmployeeEntity[]> {
    const response = await fetch(`http://localhost:8000/api/employee-list`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load list of employees');
        return Promise.reject(error);
    }
}

export async function getEmployeeListForCompany(companyId: number): Promise<EmployeeEntity[]> {
    const response = await fetch(`http://localhost:8000/api/employee-list/${companyId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load list of employees');
        return Promise.reject(error);
    }
}

export async function getEmployeeListForShift(shiftId: number): Promise<EmployeeEntity[]> {
    const response = await fetch(`http://localhost:8000/api/employee-list-shift/${shiftId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load list of employees');
        return Promise.reject(error);
    }
}

//Employee detail

export async function createEmployee(employee: EmployeeDto): Promise<EmployeeEntity> {
    const response = await fetch(`http://localhost:8000/api/employee-create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(employee),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to create employee');
        return Promise.reject(error);
    }
}

export async function updateEmployee(editedID: number, updatedEmployee: EmployeeDto): Promise<EmployeeEntity> {
    //TODO fix editedID

    const response = await fetch(`http://localhost:8000/api/employee-update/${editedID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to edit employee');
        return Promise.reject(error);
    }
}

export async function deleteEmployee(id: number): Promise<Response> {
    const response = await fetch(`http://localhost:8000/api/employee-delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
    if (response.ok) {
        return response;
    } else {
        const error = new Error('Unable to delete employee');
        return Promise.reject(error);
    }
}

export function getCompanyList(): Promise<CompanyEntity[]> {
    return fetch(`http://localhost:8000/api/company-list`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export function createCompany(company: CompanyDto): Promise<CompanyEntity> {
    return fetch(`http://localhost:8000/api/company-create`, {
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

export async function createShift(shift: ShiftDto): Promise<ShiftEntity> {
    console.log(shift);
    const response = await fetch(`http://localhost:8000/api/shift-create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(shift),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to create shift');
        return Promise.reject(error);
    }
}

export async function updateShift(shiftID: number, updatedShift: ShiftDto): Promise<ShiftEntity> {
    const response = await fetch(`http://localhost:8000/api/shift-update/${shiftID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedShift),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to update shift');
        return Promise.reject(error);
    }
}

export function deleteShift(shiftId: number): Promise<Response> {
    return fetch(`http://localhost:8000/api/shift-delete/${shiftId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export async function getShiftListForCompany(companyId: number): Promise<ShiftEntity[]> {
    const response = await fetch(`http://localhost:8000/api/shift-list-company/${companyId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error(`Unable to load shift list for company ${companyId}`);
        return Promise.reject(error);
    }
}

export async function deleteCompanyTable(): Promise<Response> {
    return fetch(`http://localhost:8000/api/company-table-delete`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}
