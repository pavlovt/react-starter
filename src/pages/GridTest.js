"use strict";

import React, { Component } from 'react';
import { SSTable } from './../components/table/SSTable';
import { AttackStatusBadge } from './../components/table/CellTypes';

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
        return <div style={{background: 'purple'}}>{this.props.content}</div>
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
            render: function(data) {
                return <div style={{background: 'red'}}>{data}</div>
            }
        }, {
            title: "First Name",
            field: "firstName",
            isSortable: true,
            template: AttackStatusBadge
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
    };

    render() {
        return (<div>
            <SSTable config={this.gridConfig}></SSTable>
        </div>);
    }
}