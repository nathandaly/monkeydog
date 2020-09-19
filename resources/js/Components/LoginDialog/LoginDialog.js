import React, {Component} from 'react';
import equal from 'fast-deep-equal';

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import './LoginDialog.scss';

class LoginDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
            position: 'center',
            email: '',
            password: '',
            rememberMe: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!equal(this.props.displayModal, prevProps.displayModal)) {
            this.showModal();
        }
    }

    showModal = () => {
        if (this.props.displayModal) {
            this.setState({ displayModal: true });
        }
    };

    hideModal = () => {
        this.setState({ displayModal: false });
        this.props.resetModal(true);
    };

    toggleRememberMe = () => {
        this.setState({
            rememberMe: !this.state.rememberMe,
        });
        console.log(this.props);
    }

    handleLogin = () => {
        this.props.loginAction({}, hasError => console.log(hasError));
    };

    switchToSignup = () => {
        this.props.switchToSignup(true);
        this.setState({ displayModal: false });
        this.props.resetModal(true);
    };

    render() {
        return (
            <Dialog className="LoginDialog p-text-uppercase" header="Log in" visible={this.state.displayModal} modal={false} footer={null} onHide={() => this.hideModal()}>
                <div className="social-wrapper">
                    <Button
                        onClick={() => window.location.href = "/login/battlenet"}
                        label="Login in with BATTLE.NET"
                        icon="fab fa-battle-net"
                        className="p-text-uppercase p-button-primary p-button-lg"
                    />
                </div>
                <div className="p-fluid">
                    <div className="or">OR</div>

                    <div className="p-field">
                        <span className="p-input-icon-left">
                            <i className="fad fa-user-alien" />
                            <InputText className="p-inputtext-lg"  id="email" placeholder="Email" type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                        </span>
                    </div>
                    <div className="p-field">
                        <span className="p-input-icon-left">
                            <i className="fad fa-lock" />
                            <InputText className="p-inputtext-lg" id="password" placeholder="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </span>
                    </div>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-checkbox p-col">
                            <Checkbox inputId="remember-me" value="true" onChange={this.toggleRememberMe} checked={this.state.rememberMe}/>
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <div className="p-field p-col">
                            <Button label="Forgotten password?" className="forgotten-password-link p-button-link" />
                        </div>
                    </div>
                    <div className="p-field">
                        <Button label="Log in" onClick={this.handleLogin} className="login-button p-button-primary p-button-lg p-text-uppercase" />
                    </div>
                    <div className="p-field">
                        <Button label="Sign up" onClick={this.switchToSignup} className="p-button-secondary p-button-outlined p-button-lg p-text-uppercase" />
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default LoginDialog;
