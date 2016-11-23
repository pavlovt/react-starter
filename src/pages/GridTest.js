"use strict";

import React, { Component } from 'react';
import { SSTable } from './../components/table/SSTable';

const rows = [{
    username: "asenpetrov",
    firstName: "Asen",
    lastName: "Petrov",
    role: "PM",
    status: "late for work",
    timeZone: "timezone"
}, {
    username: "valeri@abv.bg",
    firstName: "valeri",
    lastName: "Abv",
    role: "CFO of PMO",
    status: "on time",
    timeZone: "Grinouch"
}, {
    username: "bailambo",
    firstName: "bai",
    lastName: "lando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "bailambo",
    firstName: "dbai",
    lastName: "lando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "bailambo",
    firstName: "cbai",
    lastName: "lando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "bailambo",
    firstName: "bbai",
    lastName: "lando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "bailambo",
    firstName: "abai",
    lastName: "lando",
    role: "dfgdzadnik",
    status: "dfgkakvo iskash we",
    timeZone: "Athens"
}, {
    username: "tailambo",
    firstName: "hrtbai",
    lastName: "hrdslando",
    role: "fsdfdzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "tailambo",
    firstName: "bai",
    lastName: "lando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "gailambo",
    firstName: "bai",
    lastName: "lando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}, {
    username: "tailambo",
    firstName: "bai",
    lastName: "asddqlando",
    role: "dzadnik",
    status: "kakvo iskash we",
    timeZone: "Athens"
}];

class RowSampleTemplate extends Component {
    render() {
        return <div>zdraveite az sum templeita<br/><br/>{this.props.content.toString()}</div>
    }
}

export default class GridTest extends Component {
    constructor() {
        super();
    }

    gridConfig = {
        data: rows,
        columns: [{
            title: "Username/Email",
            field: "username",
            isSortable: true,
            template: function(rowData) {
                return <div>{rowData.title}</div>
            }
        }, {
            title: "First Name",
            field: "firstName",
            isSortable: true
        }, {
            title: "Last Name",
            field: "lastName"
        }, {
            title: "Role",
            field: "role"
        }, {
            title: "Status",
            field: "status"
        }, {
            title: "Time Zone",
            field: "timeZone",
        }],
        sorting: ['username', 'firstName'],
        ExpandedRowTmpl: RowSampleTemplate
    };

    render() {
        return (<div>
            <SSTable config={this.gridConfig}></SSTable>
        </div>);
    }
}