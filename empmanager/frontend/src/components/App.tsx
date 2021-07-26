import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Form, Formik} from 'formik'
import {TextInput} from "./form/TextInput";
import {NumberInput} from "./form/NumberInput";
import {Button, Descriptions, Layout, List, Space, Spin} from "antd";
import DescriptionsItem from 'antd/lib/descriptions/Item';
import {CompanyList} from "./CompanyList";
import { Route, Switch } from 'react-router-dom'

import {CompanyListPage} from '../pages/CompanyList'
import {NewCompanyPage} from '../pages/NewCompany'
import { MainNavigation } from '../components/layout/MainNavigation'

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
                        </Switch>
                </Layout>
            </>
        )
}
export default App;
