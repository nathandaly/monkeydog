import React, {Component} from 'react';
import { Inertia } from '@inertiajs/inertia'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axiosInstance from '../../Utils/AxiosInstance';

import LoginDialog from "../LoginDialog/LoginDialog";
import SignupDialog from "../SignupDialog/SignupDialog";

import './Navbar.scss';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import {BreadCrumb} from "primereact/breadcrumb";

import logo from '../../../assets/images/logo-nav.png';

/**
 * TODO: Move to a string utils class.
 *
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lower cased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

export class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            breadcrumbPath: [],
            displayLoginModal: false,
            displaySignupModal: false,
        };
    }

    transformBreadcrumbs = (crumbs) => {
        const pathArray = crumbs;
        const breadcrumbPath = [];

        pathArray.forEach((path) => {
            breadcrumbPath.push({
                label: capitalize(path.replace(/-/g, ' ')),
            });
        });

        return breadcrumbPath;
    };

    handleClick = (event, category = null) => {
        let location = '/'

        if (category) {
            location = location.replace(/\s/g , '-');
            location = `${category}/${location}`;
        }

        window.location.pathname = location;
        this.updateBreadcrumbs();
    };

    loginButtons = () => {
        return [
            <Button
                label="Log in"
                onClick={() => this.setState({ displaySignupModal: false, displayLoginModal: true })}
                className="p-colour-white p-button-info p-button-text"
                icon="pi pi-user"
            />,
            <Button
                label="Sign Up"
                onClick={() => this.setState({ displayLoginModal: false, displaySignupModal: true })}
                className="p-colour-white p-button-info p-button-text"
                icon="pi pi-sign-in"
            />
        ];
    };

    switchDialog = () => {
        this.setState({
            displayLoginModal: false,
            displaySignupModal: true
        });
    }

    handleLogout = (event) => {
        axiosInstance.post('/logout')
            .then(response => location.reload());
    }

    render() {
        const { user } = this.props.auth;
        const { breadcrumbPath } = this.props.navbar;
        const breadcrumbModel = this.transformBreadcrumbs(breadcrumbPath);
        const menu = [
            {
                label:'World of Warcraft',
                items:[
                    {
                        label: 'Retail',
                        icon: 'wow-icon',
                        command: event => this.handleClick(event, 'games/world-of-warcraft'),
                    },
                    {
                        label: 'Classic',
                        icon: 'wow-classic-icon',
                        command: event => this.handleClick(event, 'games/world-of-warcraft'),
                    },
                ],
            },
            {
                label: 'Services',
                items:[
                    {
                        label: 'Mythic Plus',
                        icon: 'mythic-plus-icon',
                        command: event => this.handleClick(event, 'services'),
                    },
                    {
                        label: 'Raids',
                        icon: 'raid-icon',
                        command: event => this.handleClick(event, 'services'),
                    },
                    {
                        label:'PVP',
                        icon: 'pvp-icon',
                        command: event => this.handleClick(event, 'services'),
                    },
                ]
            },
            {
                label:'Discord',
                command: event => this.handleClick(event),
            },
            {
                label:'Guides',
                command: event => this.handleClick(event),
            },
        ];

        const start = <img alt="logo" onClick={() => this.handleClick('home')} className='menu-logo p-mr-2' src={logo}/>;
        const home = { icon: 'pi pi-home', command: event => this.handleClick('home') }
        const signedInMenuEnd = user ? [{
            label: user.name,
            icon: 'fad fa-user',
            items: [
                {
                    label: 'Profile',
                    icon: 'fad fa-id-card',
                    command: event => Inertia.visit('/profile')
                },
                {
                    label: 'Logout',
                    icon: 'fad fa-sign-out-alt',
                    command: event => this.handleLogout(event)
                }
            ]
        }] : [];

        return (
            <div className='nav-container'>
                <Menubar
                    className="top-bar"
                    model={[]}
                    end={user ? <Menubar
                        className="top-bar"
                        model={signedInMenuEnd}>
                    </Menubar> : this.loginButtons}>
                </Menubar>
                <Menubar className="menu-bar" start={start} model={menu} />
                { breadcrumbPath.length > 0 && <BreadCrumb  model={breadcrumbModel} home={home} /> }
                <LoginDialog
                    displayModal={this.state.displayLoginModal}
                    resetModal={value => value && this.setState({ displayLoginModal: false })}
                    switchToSignup={value => value && this.switchDialog()}
                />
                <SignupDialog
                    displayModal={this.state.displaySignupModal}
                    resetModal={value => value && this.setState({ displaySignupModal: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps', state)
    return {
        navbar: state.navbar
    }
};

export default connect(mapStateToProps)(Navbar);
