import React from 'react';
import { EmployeeForm } from '../components/form/EmployeeForm';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { EmployeeFormik } from '../components/form/EmployeeFormik';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../stores/root-store';
import { EmployeeDto } from '../models/dtos/employee-dto';

interface NewEmployeePageProps {
    rootStore: RootStore;
}

export const NewEmployeePage: React.FC<NewEmployeePageProps> = observer((props: NewEmployeePageProps): JSX.Element => {
    const { rootStore } = props;

    const { employeeStore } = rootStore;

    const history = useHistory();

<<<<<<< Updated upstream:empmanager/frontend/src/pages/NewEmployee.tsx
    const submitHandler = async (values: EmployeeDto): Promise<void> => {
=======
<<<<<<< Updated upstream:empmanager/frontend/src/pages/NewEmployee.tsx
    const categoryOptions = ['A', 'B', 'C'];

    const submitHandler = async (values: any): Promise<void> => {
=======
    rootStore.setActivePage('employee-create');

    const submitHandler = async (values: EmployeeDto): Promise<void> => {
>>>>>>> Stashed changes:empmanager/frontend2/src/pages/NewEmployee.tsx
>>>>>>> Stashed changes:empmanager/frontend2/src/pages/NewEmployee.tsx
        const employeeData = {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            email: values.email,
            active: values.active,
            working_category: values.working_category,
            health_limitations: values.health_limitations,
            med_exam_date: moment(values.med_exam_date).format('YYYY-MM-DD'),
            job_assign_date: moment(values.job_assign_date).format('YYYY-MM-DD'),
            company: null,
        };

        await employeeStore.addEmployee(employeeData).then(() => {
            history.replace('employee-list');
        });
    };

    return (
        <EmployeeFormik onSubmit={submitHandler} initialValues={new EmployeeDto()}>
            <EmployeeForm submitText="Přidat" />
        </EmployeeFormik>
    );
});
