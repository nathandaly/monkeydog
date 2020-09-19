import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './Store/store';

import './App.scss';
import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-pro/css/all.min.css';

import Navbar from "./Components/Navbar/Navbar";

const app = document.getElementById('app');
const { auth } = JSON.parse(app.dataset.page).props || null;

render(
    <Provider store={configureStore()}>
        <div className="App">
            <Navbar auth={auth} breadcrumbPath={[]} />
            <InertiaApp
                initialPage={JSON.parse(app.dataset.page)}
                resolveComponent={name => require(`./Pages/${name}`).default}
            />
        </div>
    </Provider>,
    app
);
