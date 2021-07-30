export function getEmployeeList(){
    return fetch('http://localhost:8000/api/employee-list')
        .then(response => response.json())
}

//Employee detail


export function createEmployee(employee: any): Promise<Response>{

    return fetch('http://localhost:8000/api/employee-create',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
}

export function updateEmployee(editedID: any, updatedEmployee:any){  //TODO fix editedID

    return  fetch(`http://localhost:8000/api/employee-update/${editedID}`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedEmployee)}
    )
}

export function deleteEmployee(id: number) {

    return fetch(`http://localhost:8000/api/employee-delete/${id}`),
        {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json',
            }
        }
}


export function getCompanyList() {

    return fetch('http://localhost:8000/api/company-list')
        .then(response => response.json())
}

export function createCompany(company: any){

    return fetch('http://localhost:8000/api/company-create',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(company),
        });
}

export function updateCompany(updatedID: any, updatedCompany: any){ //TODO fix updatedID

    return fetch(`http://localhost:8000/api/company-update/${updatedID}`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedCompany)}
    )
}

export function deleteCompany(id:number){

    return fetch(`http://localhost:8000/api/company-delete/${id}`),
        {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json',
            }
        }
}

