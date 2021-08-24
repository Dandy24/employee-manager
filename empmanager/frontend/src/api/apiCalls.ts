import { toJS } from 'mobx';

export function getEmployeeList() {
    return fetch('http://localhost:8000/api/employee-list').then((response) => response.json());
}

//Employee detail

export function createEmployee(employee: any): Promise<Response> {
    return fetch('http://localhost:8000/api/employee-create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(employee),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    });
}

export function updateEmployee(editedID: any, updatedEmployee: any) {
    //TODO fix editedID

    return fetch(`http://localhost:8000/api/employee-update/${editedID}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    });
}

export function deleteEmployee(id: number) {
    return fetch(`http://localhost:8000/api/employee-delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    });
}

export function getCompanyList() {
    return fetch('http://localhost:8000/api/company-list').then((response) => response.json());
}

export function createCompany(company: any) {
    return fetch('http://localhost:8000/api/company-create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(company),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    });
}

export function updateCompany(updatedCompany: any, updatedID: number) {
    return fetch(`http://localhost:8000/api/company-update/${updatedID}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedCompany),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    });
}

export function deleteCompany(id: number) {
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
