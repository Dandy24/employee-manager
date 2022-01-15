import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import { CompanyListPage } from './pages/CompanyList';
import { MainNavigation } from './components/layout/MainNavigation';
import { EmployeeListPage } from './pages/EmployeeList';
import { Content } from 'antd/lib/layout/layout';
import { useRootStore } from './stores/root-store-provider';
import { observer } from 'mobx-react-lite';
import { ShiftManagerPage } from './pages/ShiftManager';
import { ShiftCalendarPage } from './pages/ShiftCalendarPage';
import { Dashboard } from './pages/Dashboard';

const App: React.FC = observer(() => {
    const rootStore = useRootStore();

    return (
        <>
            <Layout style={{ height: '100%' }}>
                <MainNavigation />
                <Content style={{ padding: '35px 50px' }}>
                    <Switch>
                        <Route path="/company-list" exact>
                            <CompanyListPage rootStore={rootStore}></CompanyListPage>
                        </Route>

                        <Route path="/employee-list">
                            <EmployeeListPage rootStore={rootStore}></EmployeeListPage>
                        </Route>

                        <Route path="/shift-calendar/:companyId">
                            <ShiftCalendarPage rootStore={rootStore}></ShiftCalendarPage>
                        </Route>

                        <Route path="/shift-manager/:id">
                            <ShiftManagerPage rootStore={rootStore}></ShiftManagerPage>
                        </Route>

                        <Route path="/shift-manager">
                            <ShiftManagerPage rootStore={rootStore}></ShiftManagerPage>
                        </Route>

                        <Route path="/">
                            <Dashboard rootStore={rootStore}></Dashboard>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </>
    );
});

export default App;
