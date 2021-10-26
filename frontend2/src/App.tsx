import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import { CompanyListPage } from './pages/CompanyList';
import { NewCompanyPage } from './pages/NewCompany';
import { MainNavigation } from './components/layout/MainNavigation';
import { NewEmployeePage } from './pages/NewEmployee';
import { EmployeeListPage } from './pages/EmployeeList';
import { Content } from 'antd/lib/layout/layout';
import { useRootStore } from './stores/root-store-provider';
import { observer } from 'mobx-react-lite';
import { ShiftManagerPage } from './pages/ShiftManager';

const App: React.FC = observer(() => {
    const rootStore = useRootStore();

    return (
        <>
            <Layout>
                <MainNavigation />
                <Content style={{ padding: '35px 50px' }}>
                    <Switch>
                        <Route path="/" exact>
                            <CompanyListPage rootStore={rootStore}></CompanyListPage>
                        </Route>

                        <Route path="/new-company">
                            <NewCompanyPage rootStore={rootStore}></NewCompanyPage>
                        </Route>

                        <Route path="/new-employee">
                            <NewEmployeePage rootStore={rootStore}></NewEmployeePage>
                        </Route>

                        <Route path="/employee-list">
                            <EmployeeListPage rootStore={rootStore}></EmployeeListPage>
                        </Route>

                        <Route path="/shift-manager">
                            <ShiftManagerPage rootStore={rootStore}></ShiftManagerPage>
                        </Route>

                        {/*<Route path="/monthly-output/:id" exact>*/}
                        {/*    <MonthlyReview></MonthlyReview>*/}
                        {/*</Route>*/}
                    </Switch>
                </Content>
            </Layout>
        </>
    );
});

export default App;
