import React, { useState, useEffect } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import Form, { Field } from 'rc-field-form';

import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import './SignupDialog.scss';

const fieldHasError = ({ getFieldError }, name) => {
    return getFieldError(name).length > 0;
}

const SignupDialog = props => {
    const [displayModal, setDisplayModal] = useState(false);
    const [terms, setTerms] = useState(false);
    const [password, setPassword] = useState();
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.displayModal) {
            setDisplayModal(true);
        }
    }, [
        props.displayModal,
        props.resetModal
    ]);

    const hideModal = () => {
        setDisplayModal(false);
        props.resetModal(true);
    };

    const toggleTerms = () => setTerms(!terms);

    const Error = ({ children }) => children.map(
        (error, key) => (
            <li key={key} className="p-invalid p-d-block">{error}</li>
        )
    );

    const handleFinish = () => {

    };

    return (
        <Dialog className="SignupDialog" header="Join monkey dog" visible={displayModal} modal={false} footer={null} onHide={() => hideModal()}>
            <div className="social-wrapper">
                <Button
                    onClick={() => window.location.href = "/login/battlenet"}
                    label="Sign up with BATTLE.NET"
                    icon="fab fa-battle-net"
                    className="p-text-uppercase p-button-primary p-button-lg"
                />
            </div>
            <div className="p-fluid">
                <div className="or">OR</div>

                <Form form={form} onFinish={handleFinish}>
                    {(values, form) => {
                        const emailError = form.getFieldError('email');
                        const passwordError = form.getFieldError('password');
                        const confirmError = form.getFieldError('confirm');
                        const termsError = form.getFieldError('terms');

                        const errors = form.getFieldsError();

                        if (errors) {
                            console.log('Render with Errors:', values, form.getFieldsError());
                        }

                        return (
                            <React.Fragment>
                                <div className="p-field">
                                    <span className="p-input-icon-left">
                                        <i className="fad fa-user-alien"/>
                                        <Field
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Please enter a email' },
                                                { type: 'email', message: 'Please enter a valid email' }
                                            ]}>
                                                <InputText
                                                    className={
                                                        'p-inputtext-lg ' +
                                                        (fieldHasError(form, 'email') ? 'p-invalid' : '')
                                                    }
                                                    id="email"
                                                    placeholder="Email"
                                                    type="email"
                                                />
                                        </Field>
                                    </span>
                                    <Error>{emailError}</Error>
                                </div>
                                <div className="p-field">
                                    <span className="p-input-icon-left">
                                        <i className="fad fa-lock-alt"/>
                                        <Field
                                            name="password"
                                            dependencies={['password']}
                                            rules={[
                                                { required: true, message: 'Please enter an password' },
                                            ]}
                                        >
                                            <InputText
                                                className={
                                                    'p-inputtext-lg ' +
                                                    (fieldHasError(form, 'password') ? 'p-invalid' : '')
                                                }
                                                id="password"
                                                placeholder="Password"
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Field>
                                    </span>
                                    <Error>{passwordError}</Error>
                                    { password && password.length > 0 && <PasswordStrengthBar password={password} />}
                                </div>
                                <div className="p-field">
                                    <span className="p-input-icon-left">
                                        <i className="fad fa-lock-open-alt"/>
                                        <Field
                                            name="confirm"
                                            id="confirm"
                                            dependencies={['password']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject('The two passwords that you entered do not match!');
                                                    },
                                                }),
                                            ]}
                                        >
                                            <InputText
                                                className={
                                                    'p-inputtext-lg ' +
                                                    (fieldHasError(form, 'confirm') ? 'p-invalid' : '')
                                                }
                                                id="password2-input"
                                                placeholder="Confirm password"
                                                type="password"
                                            />
                                        </Field>
                                    </span>
                                    <Error>{confirmError}</Error>
                                </div>
                                <div style={{padding: '10px 0 10px 0'}}>
                                    <div className="p-field-checkbox">
                                        <Field
                                            name="terms"
                                            id="terms"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please accept the terms',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject('Please accept the terms');
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Checkbox
                                                inputId="accept-terms"
                                                value="true"
                                                onChange={toggleTerms}
                                                checked={terms}
                                                className={(fieldHasError(form, 'terms') ? 'p-invalid' : '')}
                                            />
                                        </Field>
                                        <label
                                            style={{textTransform: 'none'}}
                                            htmlFor="accept-terms">
                                                I accept the <a
                                                href="https://docs.google.com/document/d/1IldWvEqiIvsjnl67AwQxPLaka8quq7UiVitEcncw8S4/edit?usp=sharing"
                                                target="_blank"
                                                style={{cursor: "pointer", color: '#CE93D8', textDecoration: 'none'}}>
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                    <Error>{termsError}</Error>
                                </div>
                                <div className="p-field">
                                    <Button
                                        label="Sign up"
                                        className="login-button p-button-primary p-button-lg p-text-uppercase"
                                    />
                                </div>
                            </React.Fragment>
                        );
                    }}
                </Form>
            </div>
        </Dialog>
    );
}

export default SignupDialog;
