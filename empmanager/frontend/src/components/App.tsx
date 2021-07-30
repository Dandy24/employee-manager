import React from 'react';
import 'antd/dist/antd.css';
import { Layout} from "antd";
import { Route, Switch } from 'react-router-dom'

import {CompanyListPage} from '../pages/CompanyList'
import {NewCompanyPage} from '../pages/NewCompany'
import { MainNavigation } from './layout/MainNavigation'
import {NewEmployeePage} from "../pages/NewEmployee";
import {EmployeeListPage} from "../pages/EmployeeList";
import {Content} from "antd/es/layout/layout";

function App(){

        return (
            <>
                <Layout>
                    <MainNavigation/>
                    <Content style={{ padding: '35px 50px' }}>
                        <Switch>
                            <Route path='/' exact>
                                <CompanyListPage></CompanyListPage>
                            </Route>

                            <Route path='/new-company'>
                                <NewCompanyPage></NewCompanyPage>
                            </Route>

                            <Route path='/new-employee'>
                                <NewEmployeePage></NewEmployeePage>
                            </Route>

                            <Route path='/employee-list'>
                                <EmployeeListPage></EmployeeListPage>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </>
        )
}
export default App;
