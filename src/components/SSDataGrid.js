"use strict";

import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

const dataGridConfig = {
    rowHeight: 40,
    headerHeight: 40,
    maxHeight: 700,
    defaultGridWidth: 900,
    defaultColumnWidth: 200
};

const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

if (!Array.prototype.getObjectAt) {
    Array.prototype.getObjectAt = function (idx) {
        return this[idx];
    };
}

// Cell definitions
const TextCell = ({ rowIndex, data, col, ...props }) => (
    <Cell {...props}>
        {data.getObjectAt(rowIndex)[col]}
    </Cell>
);

class SortHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this._onSortChange = this._onSortChange.bind(this);
    }

    render() {
        let {sortDir, children, ...props} = this.props;

        return (
            <Cell>
                <a onClick={this._onSortChange}>
                    {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
                </a>
            </Cell>
        );
    }

    reverseSortDirection(sortDir) {
        return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }

    _onSortChange(e) {
        e.preventDefault();

        if (this.props.onSortChange) {
            this.props.onSortChange(
                this.props.columnKey,
                this.props.sortDir ?
                    this.reverseSortDirection(this.props.sortDir) :
                    SortTypes.DESC
            );
        }
    }
}

class DataListWrapper {
    constructor(indexMap, data) {
        this._indexMap = indexMap;
        this._data = data;
    }

    getSize() {
        return this._indexMap.length;
    }

    getObjectAt(index) {
        return this._data.getObjectAt(
            this._indexMap[index],
        );
    }
}

export class SSDataGrid extends Component {
    constructor(props) {
        super(props);

        this._dataList = this.props.config.data.slice();
        this._defaultSortIndexes = [];
        let size = this._dataList.length;

        for (let index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }

        this.state = {
            sortedDataList: this._dataList,
            colSortDirs: {},
        };

        this._onSortChange = this._onSortChange.bind(this);
    }

    getCellTemplate(fieldType) {
        if (!fieldType) return TextCell;

        switch (fieldType) {
            case "text":
                return TextCell;
            default:
                return TextCell;
        }
    }

    _onSortChange(columnKey, sortDir) {
        let sortIndexes = this._defaultSortIndexes.slice();

        sortIndexes.sort((indexA, indexB) => {
            let valueA = this._dataList.getObjectAt(indexA)[columnKey];
            let valueB = this._dataList.getObjectAt(indexB)[columnKey];
            let sortVal = 0;

            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }
            if (sortVal !== 0 && sortDir === SortTypes.ASC) {
                sortVal = sortVal * -1;
            }

            return sortVal;
        });

        this.setState({
            sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
            colSortDirs: {
                [columnKey]: sortDir
            },
        });
    }

    render() {
        let {columns, width, data} = this.props.config;
        let {colSortDirs, sortedDataList} = this.state;

        let cols = columns.map((column, idx) => {
            let columnWidth = column.width || Math.floor((width || dataGridConfig.defaultGridWidth) / columns.length);
            let cellTemplate = this.getCellTemplate(column.type);
            let headerTemplate = column.isSortable === true ? (<SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs[column.field]}>
                {column.title}
            </SortHeaderCell>) : (<Cell>{column.title}</Cell>);

            return <Column columnKey={column.field} cell={<TextCell data={sortedDataList} col={column.field} />} width={column.width || columnWidth} header={headerTemplate} key={idx} />
        });

        return (<div>
            <Table
                width={parseInt(width || dataGridConfig.defaultGridWidth, 10) || dataGridConfig.defaultGridWidth}
                rowHeight={dataGridConfig.rowHeight}
                rowsCount={data.length}
                maxHeight={dataGridConfig.maxHeight}
                headerHeight={dataGridConfig.headerHeight}>

                {cols}

            </Table>
        </div>);
    }
}