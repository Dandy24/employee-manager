import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/root-store-provider';
import { Header } from 'antd/lib/layout/layout';
import MenuItem from 'antd/lib/menu/MenuItem';

export const MainNavigation: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" selectedKeys={[rootStore.activePage]}>
                <MenuItem key="company-list">
                    <Link to="/">Seznam firem</Link>
                </MenuItem>
                <MenuItem key="company-create">
                    <Link to="/new-company">Přidání nové firmy</Link>
                </MenuItem>
                <MenuItem key="employee-list">
                    <Link to="/employee-list">Seznam zaměstnanců</Link>
                </MenuItem>
                <MenuItem key="employee-create">
                    <Link to="/new-employee">Přidání nového zaměstnance</Link>
                </MenuItem>
            </Menu>
        </Header>
    );
});
