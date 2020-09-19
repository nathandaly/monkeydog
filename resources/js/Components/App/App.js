import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../Actions'

import './App.scss';
import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-pro/css/all.min.css';

import Navbar from "../Navbar/Navbar";
import Landing from "../../Screens/Landing/Landing";
import Discord from "../../Screens/Discord/Discord";
import NoMatch from "../../Screens/NoMatch/NoMatch";
import Profile from "../../Screens/Profile/Profile";

export class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/discord" exact component={Discord} />
                    <Route path="/profile" exact component={Profile} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(App);