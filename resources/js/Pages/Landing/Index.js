import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import './Landing.scss';

class Index extends Component {
    render() {
        return (
            <div className="Landing layout-wrapper">
                <div className="cover">
                    <div className="cover-content">
                        <Card
                            title="We are recruiting for Shadowlands"
                            footer={<Button label="Apply now" style={{ color: '#fff', }} className="p-button-secondary p-button-info" />}
                        >
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>We are so excited for the upcoming expansion and we want you to be part of our journey.</p>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
