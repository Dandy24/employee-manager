import {Header} from "antd/es/layout/layout";
import {Menu} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { Link } from "react-router-dom";

export function MainNavigation(): JSX.Element {

    return(
        <Header>
            <Menu theme='dark' mode='horizontal'>
                <MenuItem key='company-list'><Link to='/'>Seznam firem</Link></MenuItem>
                <MenuItem key='company-create'><Link to='/new-company'>Přidání nové firmy</Link></MenuItem>
            </Menu>
        </Header>
    )
}
