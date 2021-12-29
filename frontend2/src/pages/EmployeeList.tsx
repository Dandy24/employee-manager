import { Modal, Table } from 'antd';
import React, { useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EditDrawer } from '../components/EditDrawer';
import { EmployeeFormik } from '../components/form/EmployeeFormik';
import { EmployeeForm } from '../components/form/EmployeeForm';
import moment from 'moment';
import { RootStore } from '../stores/root-store';
import { EmployeeTableColumns } from '../components/table/tableColumns/EmployeeTableColumns';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../models/dtos/employee-dto';
import { EmptyTable } from '../components/table/empty-table';
import '../styles.css';
import { MyTable } from '../components/table/table';

interface EmployeeListPageProps {
    rootStore: RootStore;
}

export const EmployeeListPage: React.FC<EmployeeListPageProps> = observer(
    (props: EmployeeListPageProps): JSX.Element => {
        const { rootStore } = props;

        const { employeeStore } = rootStore;

        const { confirm } = Modal;

        rootStore.setActivePage('employee-list');

        const columns = EmployeeTableColumns(employeeStore, rootStore.companyStore, onEmployeeDelete);

        async function onEmployeeDelete(id: number) {
            confirm({
                title: 'Opravdu chcete smazat toho zaměstnance?',
                icon: <ExclamationCircleOutlined />,
                content: 'Tuto akci nelze vrátit zpět',
                okText: 'Ano',
                okType: 'danger',
                cancelText: 'Ne',
                async onOk() {
                    await employeeStore.deleteEmployee(id);
                },
            });
        }

        async function updateHandler(values: EmployeeDto) {
            //TODO rozsirit na zmenu firmy, pozice atd.
            const updatedEmployee = {
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                email: values.email,
                working_category: values.working_category,
                health_limitations: values.health_limitations,
                med_exam_date: moment(values.med_exam_date).format('YYYY-MM-DD'),
                job_assign_date: moment(values.job_assign_date).format('YYYY-MM-DD'),
                active: values.active,
                company: values.company,
            };

            console.log(updatedEmployee);

            await employeeStore.editEmployee(updatedEmployee);
        }

        useEffect(() => {
            (async () => {
                await employeeStore.fetchAllEmployees();
            })();
        }, []); // was [isLoading]

        return (
            <>
                <div style={{ paddingTop: '5.5%' }}></div>

                <MyTable
                    loading={employeeStore.loadingEmployees}
                    columns={columns}
                    rows={employeeStore.employees}
                    type="employee"
                />

                <EditDrawer
                    title="Upravení zaměstnance"
                    onClose={() => {
                        employeeStore.closeModal();
                    }}
                    visible={employeeStore.isEditOpen}
                    cancelOnClick={() => {
                        employeeStore.closeModal();
                    }}
                    cancelButtonText="Zavřít okno"
                >
                    <EmployeeFormik initialValues={employeeStore.employee} onSubmit={updateHandler}>
                        <EmployeeForm
                            activeEdit={true}
                            employeeEdit={true}
                            companiesList={rootStore.companyStore.companies}
                            submitText="Uložit"
                        />
                    </EmployeeFormik>
                </EditDrawer>
            </>
        );
    },
);
