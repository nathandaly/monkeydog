import React, { Component } from 'react';
import { connect } from "react-redux";

import { updateBreadcrumbs } from '../../Store/Actions/NavbarAction';

import './Profile.scss';
import {Card} from "primereact/card";

class Index extends Component {
    constructor(props) {
        super(props);

       this.props.updateBreadcrumbs(props.breadcrumbPath);
    }

    render() {
        return (
            <div className="NoMatch layout-wrapper">
                <div className="cover">
                    <div className="cover-content">
                        <Card
                            title={`${this.props.auth.user.name}`}
                        >
                            Coming soon
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Index.defaultProps = {
    books: []
};

const mapStateToProps = state => {
    return {
        books: state.books
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBreadcrumbs: (crumbs) => {
            dispatch(updateBreadcrumbs(crumbs));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
