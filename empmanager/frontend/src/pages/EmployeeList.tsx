import {Button, message, Modal, Space, Spin, Table} from "antd";
import React, {useEffect, useState} from "react";
import {ExclamationCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import {EditDrawer} from "../components/EditDrawer";
import {CompanyFormik} from "../components/form/CompanyFormik";
import {EmployeeFormik} from "../components/form/EmployeeFormik";
import {EmployeeForm} from "../components/form/EmployeeForm";
import moment from "moment";

export function EmployeeListPage(): JSX.Element{

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const { confirm } = Modal;

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEmployeesList, setLoadedEmployeesList] = useState<any[]>([])  //TODO Typescript
    const [loadedCompaniesList, setLoadedCompaniesList] = useState<any[]>([])  //TODO Typescript
    const [ isEditVisible, setIsEditVisible ] = useState(false)
    const [ editedID, setEditedID] = useState<number>()

    const categoryOptions = ['A','B','C']

    const columns = [
        {
            title: 'ID zaměstnance',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Jméno',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Příjmení',
            dataIndex: 'last_name',
            key: 'first_name',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Firma',
            dataIndex: 'company',
            key: 'company',
            //render: (text: string, row: { company: number; }) => <p> {getCompanyName(row.company)} </p>
        },
        {
            title: 'Aktivní',
            dataIndex: 'active',
            key: 'active',
            render: (text: string, row: { active: boolean; }) => <p> {row.active ? 'Ano' : 'Ne'} </p>
        },
        {
            title: 'Akce',
            key: 'action',
            render: (record: { id: number }) => (
                <Space size="middle">
                    <Button onClick={(e) =>{showEditDrawer(record.id)}}>Upravit</Button>
                    <Button onClick={(e) =>{onEmployeeDelete(record.id)}}>Smazat</Button>
                </Space>
            ),
        },
    ]

    useEffect( () =>
    {
        fetch('http://localhost:8000/api/employee-list')
            .then(response => response.json())
            .then(data =>
                {
                    setLoadedEmployeesList(data);
                    setIsLoading(false);
                }
            )

    }, [isLoading])

    function onEmployeeDelete(id: number){
        confirm({
            title: 'Opravdu chcete smazat toho zaměstnance?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tuto akci nelze vrátit zpět',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            onOk() {
                deleteHandler(id)
                message.success("Zaměstnanec byl smazán.")
            },
        });
    }

    function deleteHandler(id: number){
        fetch(`http://localhost:8000/api/employee-delete/${id}`),
            {
                method: 'DELETE',
                headers: {
                    'Content-type' : 'application/json',
                }
            }
        setIsLoading(true)
    }

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin spinning indicator={antIcon}>Načítá se seznam firem</Spin>
            </div>
        );
    }

    function handleModalCancel(){
        setIsEditVisible(false)
    }

    function showEditDrawer(id:number){
        setIsEditVisible(true)
        setEditedID(id)

        fetch('http://localhost:8000/api/company-list')
            .then(response => response.json())
            .then(data =>
                {
                    setLoadedCompaniesList(data);
                    //setIsLoading(false);
                }
            )
    }

    function updateHandler(values: any){

        //TODO rozsirit na zmenu firmy, pozice atd.
        const updatedEmployee = {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            email: values.email,
            working_category: values.category,
            health_limits: values.health_limits,
            med_exam_date: moment(values.med_exam).format('YYYY-MM-DD'),
            job_assign_date: moment(values.job_assign).format('YYYY-MM-DD'),
            active: values.active,
            company: values.company
        }

        fetch(`http://localhost:8000/api/employee-update/${editedID}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee)}
        );

        setIsEditVisible(false)
        setIsLoading(true)

        message.warning('Údaje o zaměstnanci byly upraveny.');
    }

    return (

        <>

            <Table columns={columns} dataSource={loadedEmployeesList}></Table>

            <EditDrawer title="Upravení zaměstnance" onClose={handleModalCancel} visible={isEditVisible}
                        cancelOnClick={handleModalCancel} cancelButtonText="Zavřít okno">

                <EmployeeFormik first_name="" last_name="" phone={0} email="@" category={categoryOptions[0]} health_limits="" onSubmit={updateHandler}>

                    <EmployeeForm categories={categoryOptions} activeEdit={true} companyEdit={true} companiesList={loadedCompaniesList}/>

                </EmployeeFormik>

            </EditDrawer>

        </>

    )

}
