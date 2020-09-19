import React, { Component } from 'react';
import './NoMatch.scss';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';


class NoMatch extends Component {
    render() {
        return (
            <div className="NoMatch layout-wrapper">
                <div className="cover">
                    <div className="cover-content">
                        <Card
                            title="Coming Soon"
                        >
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>We are still tinkering about, getting our community site ready for Shadowlands so bare with.</p>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoMatch;