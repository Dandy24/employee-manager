import { CompanyEntity } from '../models/entities/company-entity';
import { CompanyDto } from '../models/dtos/company-dto';
import { EmployeeEntity } from '../models/entities/employee-entity';
import { EmployeeDto } from '../models/dtos/employee-dto';
import { ShiftDto } from '../models/dtos/shift-dto';
import { ShiftEntity } from '../models/entities/shift-entity';
import { MonthlyOutputEntity } from '../models/entities/monthly-output-entity';
import { MonthlyOutputDto } from '../models/dtos/monthly-output-dto';

const API_URL = process.env.REACT_APP_API_URL;

export async function getEmployeeList(): Promise<EmployeeEntity[]> {
    const response = await fetch(`${API_URL}/employee-list`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load list of employees');
        return Promise.reject(error);
    }
}

export async function getEmployeeListForCompany(companyId: number): Promise<EmployeeEntity[]> {
    const response = await fetch(`${API_URL}/employee-list/${companyId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load list of employees');
        return Promise.reject(error);
    }
}

export async function getEmployeeListForShift(shiftId: number): Promise<EmployeeEntity[]> {
    const response = await fetch(`${API_URL}/employee-list-shift/${shiftId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load list of employees');
        return Promise.reject(error);
    }
}

//Employee detail

export async function createEmployee(employee: EmployeeDto): Promise<EmployeeEntity> {
    const response = await fetch(`${API_URL}/employee-create`, {
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

    const response = await fetch(`${API_URL}/employee-update/${editedID}`, {
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
    const response = await fetch(`${API_URL}/employee-delete/${id}`, {
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

export async function getCompanyList(): Promise<CompanyEntity[]> {
    const response = await fetch(`${API_URL}/company-list`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to load companies');
        return Promise.reject(error);
    }
}

export function getCompanyById(companyId: number): Promise<CompanyEntity[]> {
    return fetch(`${API_URL}/company-detail/${companyId}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export async function createCompany(company: CompanyDto): Promise<CompanyEntity> {
    const response = await fetch(`${API_URL}/company-create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(company),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to create company');
        return Promise.reject(error);
    }
}

export async function updateCompany(updatedCompany: CompanyDto, updatedID: number): Promise<CompanyEntity> {
    const response = await fetch(`${API_URL}/company-update/${updatedID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedCompany),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to update company');
        return Promise.reject(error);
    }
}

export async function deleteCompany(id: number): Promise<Response> {
    const response = await fetch(`${API_URL}/company-delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to delete company');
        return Promise.reject(error);
    }
}

export async function createShift(shift: ShiftDto): Promise<ShiftEntity> {
    const response = await fetch(`${API_URL}/shift-create`, {
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
    const response = await fetch(`${API_URL}/shift-update/${shiftID}`, {
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
    return fetch(`${API_URL}/shift-delete/${shiftId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export async function getShiftListForCompany(companyId: number): Promise<ShiftEntity[]> {
    const response = await fetch(`${API_URL}/shift-list-company/${companyId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error(`Unable to load shift list for company ${companyId}`);
        return Promise.reject(error);
    }
}

export async function deleteCompanyTable(): Promise<Response> {
    return fetch(`${API_URL}/company-table-delete`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export async function deleteAllShifts(): Promise<void> {
    await fetch(`${API_URL}/delete-shift-table`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export async function getEmployeeMonthlyOutput(employeeId: number): Promise<MonthlyOutputEntity> {
    const response = await fetch(`${API_URL}/employee-monthly-output/${employeeId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error(`Unable to load monthly output for employee ${employeeId}`);
        return Promise.reject(error);
    }
}

export async function createMonthlyOutput(output: MonthlyOutputDto): Promise<MonthlyOutputEntity> {
    const response = await fetch(`${API_URL}/employee-monthly-output-create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(output),
    });
    if (response.ok) {
        return await response.json();
    } else {
        const error = new Error('Unable to create monthly output');
        return Promise.reject(error);
    }
}
