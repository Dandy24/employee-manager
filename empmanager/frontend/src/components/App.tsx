import React from 'react';
import 'antd/dist/antd.css';
import { Layout} from "antd";
import { Route, Switch } from 'react-router-dom'

import {CompanyListPage} from '../pages/CompanyList'
import {NewCompanyPage} from '../pages/NewCompany'
import { MainNavigation } from '../components/layout/MainNavigation'
import {NewEmployeePage} from "../pages/NewEmployee";

function App(){

        return (
            <>
                <Layout>
                    <MainNavigation/>
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
                        </Switch>
                </Layout>
            </>
        )
}
export default App;
