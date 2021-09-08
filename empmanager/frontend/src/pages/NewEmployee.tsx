import React from 'react';
import { EmployeeForm } from '../components/form/EmployeeForm';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { EmployeeFormik } from '../components/form/EmployeeFormik';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../stores/root-store';
import { WorkingCategoryEnum } from '../models/enums/working-category-enum';

interface NewEmployeePageProps {
    rootStore: RootStore;
}

export const NewEmployeePage: React.FC<NewEmployeePageProps> = observer((props: NewEmployeePageProps): JSX.Element => {
    const { rootStore } = props;

    const { employeeStore } = rootStore;

    const history = useHistory();

    const submitHandler = async (values: any): Promise<void> => {
        const employeeData = {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            email: values.email,
            working_category: values.working_category,
            health_limitations: values.health_limitations,
            med_exam_date: moment(values.med_exam_date).format('YYYY-MM-DD'),
            job_assign_date: moment(values.job_assign_date).format('YYYY-MM-DD'),
        };

        await employeeStore.addEmployee(employeeData).then(() => {
            history.replace('employee-list');
        });
    };

    return (
        <EmployeeFormik
            onSubmit={submitHandler}
            initialValues={{
                email: '@',
                category: WorkingCategoryEnum.A,
                first_name: '',
                last_name: '',
                phone: 0,
                health_limits: '',
            }}
        >
            <EmployeeForm submitText="Přidat" />
        </EmployeeFormik>
    );
});
