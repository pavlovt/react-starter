import React, { Component } from 'react';
// import { table, inputGroups } from 'bootstrap-css';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import './ss-table.scss';

import Paginator from './Paginator'

const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

const styles = {
    dropdown: {
        width: '150px'
    },
    glueSpan: {
        width: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        border: 'none'
    },
    table: {
        minHeight: '400px'
    },
    dataRow: {
        height: '40px'
    },
    rowContent: {
        float: 'left',
        marginTop: '20px'
    },
    dataInfo: {
        width: '200px'
    }
};

class SortHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this._onSortChange = this._onSortChange.bind(this);
    }

    render() {
        let {sortDir, children, style, ...props} = this.props;

        return (
            <div style={style}>
                <a onClick={this._onSortChange}>
                    {children} 
                    {sortDir ? (sortDir === SortTypes.DESC ? <span className="glyphicon glyphicon-sort-by-alphabet ml5"></span> :
                        <span className="glyphicon glyphicon-sort-by-alphabet-alt ml5"></span>) : ''}
                </a>
            </div>
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

export class SSTable extends Component {
    constructor(props) {
        super(props);

        let { data, columns, sorting } = props.config;

        this.state = {
            // used to return the grid in it`s base state (without any filtering and ordering)
            originalData: data.slice(),
            // all sorting and filtering is done over this collection
            viewData: _.sortBy(data.slice(), sorting || []),
            columnDefs: columns,
            colSortDirs: {},
            filterDropdownOptions: [],
            currentFilterType: null,
            currentFilterValue: null,
            currentSortingCol: null,
            pageCount: 0,
            perPage: 0,
            currentPage: 0,
            selectedRow: null
        };
    }

    componentWillMount() {
        let options = this.props.config.columns.map((col) => ({ text: col.title, value: col.field }));
        this.setState({ filterDropdownOptions: options });
        this.setState({ currentFilterType: options[0].value });

        // setting up pagination
        this.setState({ perPage: 5 }, (data) => {
            this.setState({ pageCount: Math.ceil(this.state.viewData.length / this.state.perPage) });
        });
    }

    componentDidMount() {

    }

    onSortChange(columnKey, sortDir) {
        this.setState({ currentSortingCol: columnKey });

        let filteredData = this.state.viewData.sort((v1, v2) => {
            let str1 = v1[columnKey].toLowerCase();
            let str2 = v2[columnKey].toLowerCase();
            let sortVal;

            if (sortDir === SortTypes.ASC) {
                if (str1 < str2) {
                    sortVal = 1;
                } else if (str1 > str2) {
                    sortVal = -1;
                } else sortVal = 0;
            } else if (sortDir === SortTypes.DESC) {
                if (str1 > str2) {
                    sortVal = 1;
                } else if (str1 < str2) {
                    sortVal = -1;
                } else sortVal = 0;
            }

            return sortVal;
        });

        this.setState({ colSortDirs: { [columnKey]: sortDir } });
        this.setState({ viewData: filteredData });
    }

    onFilterTypeChange(e) {
        let {currentSortingCol, colSortDirs, currentFilterValue} = this.state;

        this.setState({ currentFilterType: e.target.value }, () => {
            this.onFilterValueChange({ target: { value: currentFilterValue } });
        });
    }

    onFilterValueChange(e) {
        let filterValue = e.target.value;
        this.setState({ currentFilterValue: filterValue });
        let {currentSortingCol, colSortDirs, originalData, viewData, currentFilterType, perPage} = this.state;

        if (!filterValue) {
            this.setState({ viewData: originalData.slice(), pageCount: Math.ceil(viewData.length / perPage) }, () => {
                if (currentSortingCol) {
                    this.onSortChange(currentSortingCol, colSortDirs[currentSortingCol]);
                }
            });
        } else {
            let filteredData = originalData.filter((item) => item[currentFilterType].toLowerCase().indexOf(filterValue.toLowerCase()) > -1);

            this.setState({ viewData: filteredData, pageCount: Math.ceil(filteredData.length / perPage) }, () => {
                if (currentSortingCol) {
                    this.onSortChange(currentSortingCol, colSortDirs[currentSortingCol]);
                }
            });
        }
    }

    onPagePerChange(e) {
        this.setState({ perPage: parseInt(e.target.value, 10) }, () => {
            this.setState({ pageCount: Math.ceil(this.state.viewData.length / this.state.perPage) });
        });
    }

    handlePageClick(selected) {
        this.setState({ currentPage: parseInt(selected, 10) - 1 });
    }

    handleRowSelect(pageIdx) {
        if (pageIdx !== this.state.selectedRow || this.state.selectedRow === null) {
            this.setState({ selectedRow: pageIdx });
        } else {
            this.setState({ selectedRow: null });
        }
    }

    getPaginatedItems(items, page = 1, perPage) {
        let offset = page * perPage;

        return _.take(_.drop(items, offset), perPage);
    }

    render() {
        let {columnDefs, viewData, colSortDirs, filterDropdownOptions, perPage, currentPage, selectedRow, pageCount} = this.state;
        let {ExpandedRowTmpl} = this.props.config;

        let headerCells = columnDefs.map((headerItem, idx) => {
            return headerItem.isSortable ? <SortHeaderCell
                onSortChange={this.onSortChange.bind(this)}
                sortDir={colSortDirs[headerItem.field]} key={idx}
                columnKey={headerItem.field}
                style={{ display: 'inline-block', width: 100 / columnDefs.length + '%' }}>
                {headerItem.title}
            </SortHeaderCell> : <div key={idx} style={{ display: 'inline-block', width: 100 / columnDefs.length + '%' }}>{headerItem.title}</div>;
        });

        let rows = this.getPaginatedItems(viewData, currentPage, perPage).map((row, i) => {
            let cells = columnDefs.map((fieldDef, idx) => {
                let cellContent = null;

                if (fieldDef.render && typeof fieldDef.render === "function") {
                    cellContent = fieldDef.render(row[fieldDef.field]);
                } else if (fieldDef.template) {
                    let CellTemplate = fieldDef.template;
                    cellContent = <CellTemplate content={row[fieldDef.field]} />
                } else {
                    cellContent = <span>{row[fieldDef.field]}</span>;
                }

                return <div style={{ display: 'inline-block', width: 100 / columnDefs.length + '%' }} key={idx}>
                    {cellContent}
                </div>;
            });

            return <tr onClick={this.handleRowSelect.bind(this, i)} key={i}>
                <td colSpan={columnDefs.length}>
                    {cells}
                    <div style={Object.assign({}, styles.rowContent, { display: selectedRow === i ? 'block' : 'none' })}>
                        {ExpandedRowTmpl ? <ExpandedRowTmpl content={row} /> : <div />}
                    </div>
                </td>
            </tr>;
        });

        let filterOptions = filterDropdownOptions.map((option, i) => <option value={option.value} key={i}>{option.text}</option>);
        let pageLowRange = parseInt(currentPage * perPage + 1, 10);
        let pageHighRange = parseInt(currentPage * perPage + perPage, 10);

        return (<div className="wrapper-table">
            <div className="input-group" style={{display: 'none'}}>
                <input type="text" className="form-control" onChange={this.onFilterValueChange.bind(this)} />
                <span className="input-group-addon" style={styles.glueSpan}></span>
                <select className="form-control" onChange={this.onFilterTypeChange.bind(this)}>
                    {filterOptions}
                </select>
            </div>
            <div className="contaner-table">
                <table className="table table-hover">
                    <thead className="table-header"><tr><td colSpan={columnDefs.length}>{headerCells}</td></tr></thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
            <div className="contaner-pagination">
                <div className="pagination">
                        <Paginator max={pageCount} maxVisible={pageCount} onChange={this.handlePageClick.bind(this)} />
                </div>
                <div className="contaner-pagination-info">
                    <select className="form-control" onChange={this.onPagePerChange.bind(this)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <div className="info">{pageLowRange}&nbsp;-&nbsp;{pageHighRange > viewData.length ? viewData.length : pageHighRange}&nbsp;of&nbsp;{viewData.length}&nbsp;results</div>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>);
    }
}