import {EmployeeForm} from "../components/form/EmployeeForm";
import {message} from "antd";
import {useHistory} from "react-router-dom";
import moment from "moment";


export function NewEmployeePage(): JSX.Element{

    const history = useHistory()

    function createEmployee(employee: any): Promise<Response> {

        return fetch('http://localhost:8000/api/employee-create',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(employee),
            });
    }

    const submitHandler = (values: any): void => {

        const employeeData = {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            email: values.email,
            working_category: values.category,
            health_limits: values.health_limits,
            med_exam_date: moment(values.med_exam).format('YYYY-MM-DD'),
            job_assign_date: moment(values.job_assign).format('YYYY-MM-DD'),
        }

        createEmployee(employeeData).then(() => {
            history.replace('employee-list')
            message.success('Zaměstnanec byl úspěšně přidán');
        })
    }

    return (
        <EmployeeForm onSubmit={submitHandler}/>
    )

}
