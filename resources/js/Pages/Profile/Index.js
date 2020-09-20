import React, { Component } from 'react';
import { connect } from "react-redux";

import { updateBreadcrumbs } from '../../Store/Actions/NavbarAction';

import 'antd/es/avatar/style/index.css'
import './Profile.scss';
import { Panel } from "primereact/panel";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { Avatar } from 'antd';

import profileImage from '../../../assets/images/profile-image.jpg';

class Index extends Component {
    constructor(props) {
        super(props);
        console.info('Profile props', props);

       this.props.updateBreadcrumbs(props.breadcrumbPath);
    }

    specBodyTemplate = rowData => {
        console.log(rowData)
        const factionName = rowData.faction.name;
        return <span className={`text-${factionName.toLowerCase()}`}></span>;
    }

    nameBodyTemplate = rowData => {
        const className = rowData.playable_class.name.replace(/\s/g , "-");
        return <span className={`class-color--${className.toLowerCase()}`}>{rowData.name}</span>;
    }

    factionBodyTemplate = rowData => {
        console.log(rowData)
        const factionName = rowData.faction.name;
        return <span className={`text-${factionName.toLowerCase()}`}>{factionName}</span>;
    }


    render() {
        const { user } = this.props.auth;
        const { characters } = this.props;
        characters.map(character => console.log(character.realm, character.characters));

        return (
            <div className="Profile layout-wrapper">
                <div className="p-offset-q p-sm-10 p-md-8 p-lg-8 p-md-offset-2 p-sm-offset-1">
                    <Panel header={user.name}>
                        <Avatar size={200} src={profileImage} />
                    </Panel>
                </div>
                <div className="p-offset-q p-sm-10 p-md-8 p-lg-8 p-md-offset-2 p-sm-offset-1">
                    <Panel header="Characters">
                        <Accordion activeIndex={[0]}>
                            {
                                characters &&
                                characters.map(character => (
                                    <AccordionTab key={character.realm} header={character.realm}>
                                        <DataTable value={character.characters}>
                                            {/*<Column body={this.specBodyTemplate}/>*/}
                                            <Column header="Name" body={this.nameBodyTemplate}/>
                                            <Column field="level" header="Level"/>
                                            <Column field="playable_race.name" header="Race"/>
                                            <Column header="Faction" body={this.factionBodyTemplate}/>
                                        </DataTable>
                                    </AccordionTab>
                                ))
                            }
                        </Accordion>
                    </Panel>
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
