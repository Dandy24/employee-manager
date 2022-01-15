import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/root-store-provider';
import { Header } from 'antd/lib/layout/layout';
import MenuItem from 'antd/lib/menu/MenuItem';
import { HomeOutlined } from '@ant-design/icons';

export const MainNavigation: React.FC = observer((): JSX.Element => {
    const rootStore = useRootStore();

    return (
        <Header data-testid="main-header">
            <Menu theme="dark" mode="horizontal" selectedKeys={[rootStore.activePage]}>
                <MenuItem key="dashboard" data-testid="menu-dashboard-item">
                    <Link to="/" data-testid="menu-dashboard-item-link">
                        <HomeOutlined />
                    </Link>
                </MenuItem>
                <MenuItem key="company-list" data-testid="menu-company-list-item">
                    <Link to="/company-list" data-testid="menu-company-list-item-link">
                        Seznam firem
                    </Link>
                </MenuItem>
                <MenuItem key="employee-list" data-testid="menu-employee-list-item">
                    <Link to="/employee-list" data-testid="menu-employee-list-item-link">
                        Seznam zaměstnanců
                    </Link>
                </MenuItem>
            </Menu>
        </Header>
    );
});
