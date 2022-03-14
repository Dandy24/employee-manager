import { Button, Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EditDrawer } from '../components/EditDrawer';
import { EmployeeForm } from '../components/form/EmployeeForm';
import moment from 'moment';
import { RootStore } from '../stores/root-store';
import { EmployeeTableColumns } from '../components/table/tableColumns/EmployeeTableColumns';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../models/dtos/employee-dto';
import '../styles.css';
import { GeneralTable } from '../components/table/general-table';
import { toBase64 } from '../utils/file-to-base64';
import { toJS } from 'mobx';
import { SearchComponent } from '../components/search/search-component';

interface EmployeeListPageProps {
    rootStore: RootStore;
}

export const EmployeeListPage: React.FC<EmployeeListPageProps> = observer(
    (props: EmployeeListPageProps): JSX.Element => {
        const { rootStore } = props;

        const [profile_pic, setProfile_pic] = useState(null);

        const { employeeStore } = rootStore;

        const { confirm } = Modal;

        rootStore.setActivePage('employee-list');

        const columns = EmployeeTableColumns(employeeStore, rootStore.companyStore, onEmployeeDelete);

        async function onEmployeeDelete(id: number) {
            confirm({
                title: 'Opravdu chcete smazat tohoto zaměstnance?',
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
            const convertedFile = values.attachment?.originFileObj
                ? await toBase64(values.attachment.originFileObj)
                : undefined;
            const convertedImage = values.profile_picture?.originFileObj
                ? await toBase64(values.profile_picture.originFileObj)
                : undefined;

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
                attachment: values.attachment?.status === 'removed' ? null : convertedFile,
                profile_picture: convertedImage,
            };

            await employeeStore.saveEmployee(updatedEmployee);
            setProfile_pic(null);
        }

        useEffect(() => {
            (async () => {
                await rootStore.companyStore.fetchAllCompanies();
                await employeeStore.fetchAllEmployees();
                await rootStore.searchStore.createSearchableEmployees();
            })();
        }, []);

        return (
            <>
                <Row justify="space-between" style={{ marginTop: '1%', marginBottom: '2%' }}>
                    <Col offset={6} span={12}>
                        <SearchComponent type="employee" options={toJS(rootStore.searchStore.searchableEmployees)} />
                    </Col>
                    <Col>
                        <Button
                            data-testid="create-employee-button"
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => employeeStore.openToAdd()}
                        >
                            Přidat zaměstance
                        </Button>
                    </Col>
                </Row>

                <GeneralTable
                    loading={employeeStore.loadingEmployees}
                    columns={columns}
                    rows={employeeStore.employees}
                    type="employee"
                />

                <EditDrawer
                    title={employeeStore.employee?.id ? 'Upravit zaměstnance' : 'Přidat zaměstnance'}
                    onClose={() => {
                        employeeStore.closeModal();
                        setProfile_pic(null);
                    }}
                    visible={employeeStore.isEditOpen}
                    cancelOnClick={() => {
                        setProfile_pic(null);
                        employeeStore.closeModal();
                    }}
                    cancelButtonText="Zavřít okno"
                >
                    <EmployeeForm
                        initialValues={employeeStore.employee}
                        onSubmit={updateHandler}
                        profile_pic={profile_pic}
                        setProfilePic={setProfile_pic}
                    />
                </EditDrawer>
            </>
        );
    },
);
