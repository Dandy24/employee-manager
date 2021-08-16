import App from './components/App';
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from 'react-router-dom'
import {RootStoreProvider} from "./stores/root-store-provider";
import {RootStore} from "./stores/root-store";


ReactDOM.render(
    <RootStoreProvider rootStore={new RootStore()}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </RootStoreProvider>,
    document.getElementById('app')
);
