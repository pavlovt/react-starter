import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import ReactPaginate from 'react-paginate';
let json2csv = require('json2csv');
import 'fixed-data-table/dist/fixed-data-table.css';
import _ from 'lodash';

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

const styles = {
    dropdown: {
        width: '150px'
    },
    common: {
        floatLeft: {
            float: 'left'
        },
        clearfix: {
            clear: 'both'
        }
    }
};

if (!Array.prototype.getObjectAt) {
    Array.prototype.getObjectAt = function (idx) {
        return this[idx];
    };

    Array.prototype.getSize = function () {
        return this.length;
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

        this._dataList = _.sortBy(props.config.data, props.config.sorting);
        this._defaultSortIndexes = [];
        let size = this._dataList.length;

        for (let index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }

        this.state = {
            originalStateData: props.config.data,
            sortedDataList: new DataListWrapper(this._defaultSortIndexes, this._dataList),
            colSortDirs: {},
            filterDropdownOptions: [],
            currentFilter: null,
            currentFilterValue: null,
            currentSortingCol: null,
            pageNum: 18
        };

        this._onSortChange = this._onSortChange.bind(this);
    }

    componentWillMount(next) {
        var options = this.props.config.columns.map((col) => ({ text: col.title, value: col.field }));
        this.setState({ filterDropdownOptions: options });
        this.setState({ currentFilter: options[0].value });
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
        // first filter the collection
        let size = this._dataList.getSize();
        let filteredIndexes = [];

        if (this.state.currentFilterValue) {
            for (let index = 0; index < size; index++) {
                let rowValue = this._dataList.getObjectAt(index)[this.state.currentFilter];

                if (rowValue.toLowerCase().indexOf(this.state.currentFilterValue.toLowerCase()) !== -1) {
                    filteredIndexes.push(index);
                }
            }
        } else {
            filteredIndexes = this._defaultSortIndexes.slice();
        }

        // sort the filtered collection
        filteredIndexes.sort((indexA, indexB) => {
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
            sortedDataList: new DataListWrapper(filteredIndexes, this._dataList),
            colSortDirs: {
                [columnKey]: sortDir
            },
        });

        this.setState({ currentSortingCol: columnKey });
    }

    onFilterDropdownChange(e, data) {
        this.setState({ currentFilter: data.value });
    }

    onFilterChange(e, data) {
        let { currentSortingCol, colSortDirs } = this.state;
        this.setState({ currentFilterValue: data.value }, () => {
            this._onSortChange(currentSortingCol, colSortDirs[currentSortingCol]);
        });
    }

    exportToCSV() {
        let dataCSV = json2csv({ fields: Object.keys(this.state.sortedDataList._data[0]), data: this.state.sortedDataList._data });
        let a = document.createElement('a');

        a.href = 'data:attachment/csv,' + encodeURIComponent(dataCSV);
        a.target = '_blank';
        a.download = `report-${Date.now()}.csv`;

        document.body.appendChild(a);
        a.click();
    }

    handlePageClick(data) {
        let selected = data.selected;
        debugger;
    }

    render() {
        let {columns, width, data} = this.props.config;
        let {colSortDirs, sortedDataList, filterDropdownOptions} = this.state;

        let cols = columns.map((column, idx) => {
            let columnWidth = column.width || Math.floor((width || dataGridConfig.defaultGridWidth) / columns.length);
            let CellTemplate = this.getCellTemplate(column.type);
            let headerTemplate = column.isSortable === true ? (<SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs[column.field]}>
                {column.title}
            </SortHeaderCell>) : (<Cell>{column.title}</Cell>);

            return <Column columnKey={column.field} cell={<CellTemplate data={sortedDataList} col={column.field} />} width={column.width || columnWidth} header={headerTemplate} key={idx} />
        });

        return (<div>
            <div style={styles.common.floatLeft}>
                <Input icon='search' placeholder='Search...'
                    action={<Dropdown basic floating options={filterDropdownOptions} defaultValue={filterDropdownOptions[0].value} onChange={this.onFilterDropdownChange.bind(this)} />}
                    iconPosition='left' onChange={this.onFilterChange.bind(this)} />
                <Button primary disabled>Print</Button>
                <Button primary onClick={this.exportToCSV.bind(this)}>Export</Button>
            </div>
            <div style={styles.common.clearfix}>
                <Table
                    width={parseInt(width || dataGridConfig.defaultGridWidth, 10) || dataGridConfig.defaultGridWidth}
                    rowHeight={dataGridConfig.rowHeight}
                    rowsCount={sortedDataList.getSize()}
                    rowHeight={200}
                    maxHeight={dataGridConfig.maxHeight}
                    headerHeight={dataGridConfig.headerHeight}>

                    {cols}

                </Table>
            </div>
            <div style={styles.common.floatLeft}>
                <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageNum={this.state.pageNum}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    clickCallback={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        </div>);
    }
}