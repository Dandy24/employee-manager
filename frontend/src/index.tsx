import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RootStoreProvider } from './stores/root-store-provider';
import { RootStore } from './stores/root-store';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { ConfigProvider } from 'antd';
import cs_CZ from 'antd/lib/locale/cs_CZ';
import 'moment/locale/cs';
import moment from 'moment';

moment.locale('cs');

ReactDOM.render(
    <ConfigProvider locale={cs_CZ} dropdownMatchSelectWidth={true}>
        <RootStoreProvider rootStore={new RootStore()}>
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </RootStoreProvider>
    </ConfigProvider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

//reportWebVitals(console.log);
