import React, { Component } from 'react';

import {Button} from "primereact/button";
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';

import './Discord.scss';

class Discord extends Component {
    constructor(props) {
        super(props);
        this.discordRef = React.createRef();
        // TODO: Update this from Dashboard.
        this.state = {
            discordLink: 'https://discord.gg/k7274Yy',
            CopyBtnTooltipText: 'Copy link to clipboard'
        }
    }

    handleDiscordAppClick = () => {
        window.open('https://discord.com/invite/k7274Yy', '_blank');
    }

    fallbackCopyTextToClipboard = () => {
        const textArea = this.discordRef.current.element;
        console.log(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            this.setState({CopyBtnTooltipText: 'Copied!'})
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
    }

    copyToClipboard = () => {
        const discordLink = this.state.discordLink;

        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard();
            return;
        }

        const self = this;
        navigator.clipboard.writeText(discordLink).then(function() {
            console.log('Async: Copying to clipboard was successful!');
            self.setState({CopyBtnTooltipText: 'Copied!'})
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    render() {
        return (
            <div className="Discord layout-wrapper">
                <div className="p-grid">
                    <div className="p-col" />
                </div>
                <div className="p-grid">
                    <div className="p-col" />
                </div>
                <div className="p-offset-q p-sm-10 p-md-8 p-lg-8 p-md-offset-2 p-sm-offset-1">
                    <Panel header="Come join us on Discord">
                        <div className="p-fluid">
                            <p>Copy the invite text</p>
                            <div className="p-field">
                                <div className="p-inputgroup">
                                    <Button
                                        onClick={this.copyToClipboard}
                                        icon="fad fa-clipboard"
                                        className="p-button-secondary"
                                        tooltip={this.state.CopyBtnTooltipText}
                                    />
                                    <InputText
                                        mode
                                        type="text"
                                        ref={this.discordRef}
                                        value={this.state.discordLink}
                                        className="p-inputtext-lg"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                        <p>Or click the button below</p>
                        <div className="p-field">
                            <Button
                                label="Open in Desktop"
                                icon="fab fa-discord"
                                className="p-button-secondary"
                                onClick={this.handleDiscordAppClick}
                            />
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default Discord;