import React, { Component } from 'react';
import { table, inputGroups } from 'bootstrap-css';

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
    },
    glueSpan: {
        width: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        border: 'none'
    }
};

class SortHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this._onSortChange = this._onSortChange.bind(this);
    }

    render() {
        let {sortDir, children, ...props} = this.props;

        return (
            <th>
                <a onClick={this._onSortChange}>
                    {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
                </a>
            </th>
        );
    }

    reverseSortDirection(sortDir) {
        return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }

    _onSortChange(e) {
        debugger
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

        let { data, columns } = props.config;

        this.state = {
            // used to return the grid in it`s base state (without any filtering and ordering)
            originalData: data.slice(),
            // all sorting and filtering is done over this collection
            viewData: data.slice(),
            columnDefs: columns,
            colSortDirs: {},
            filterDropdownOptions: [],
            currentFilterType: null,
            currentSortingCol: null
        };
    }

    componentWillMount() {
        let options = this.props.config.columns.map((col) => ({ text: col.title, value: col.field }));
        this.setState({ filterDropdownOptions: options });
        this.setState({ currentFilterType: options[0].value });
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
        this.setState({ currentFilterType: e.target.value });
    }

    onFilterValueChange(e) {
        let filterValue = e.target.value;
        let {currentSortingCol, colSortDirs, originalData, viewData, currentFilterType} = this.state;

        if (!filterValue) {
            this.setState({ viewData: originalData.slice() }, () => {
                this.onSortChange(currentSortingCol, colSortDirs[currentSortingCol]);
            });
        } else {
            let filteredData = viewData.filter((item) => item[currentFilterType].toLowerCase().indexOf(filterValue.toLowerCase()) > -1);

            this.setState({viewData: filteredData});
        }
    }

    render() {
        let {columnDefs, viewData, colSortDirs, filterDropdownOptions} = this.state;

        let headerCells = columnDefs.map((headerItem, idx) => {
            return headerItem.isSortable ? <SortHeaderCell
                onSortChange={this.onSortChange.bind(this)}
                sortDir={colSortDirs[headerItem.field]} key={idx}
                columnKey={headerItem.field}>
                {headerItem.title}
            </SortHeaderCell> : <th key={idx}>{headerItem.title}</th>;
        });

        let rows = viewData.map((row, i) => {
            let cells = columnDefs.map((fieldDef, idx) => {
                return <td key={idx}>{row[fieldDef.field]}</td>;
            });

            return <tr key={i}>{cells}</tr>;
        });

        let filterOptions = filterDropdownOptions.map((option, i) => <option value={option.value} key={i}>{option.text}</option>);

        return (<div>
            <div style={styles.common.floatLeft} className="input-group">
                <input type="text" className="form-control" onChange={this.onFilterValueChange.bind(this)} />
                <span className="input-group-addon" style={styles.glueSpan}></span>
                <select className="form-control" onChange={this.onFilterTypeChange.bind(this)}>
                    {filterOptions}
                </select>
            </div>
            <div style={styles.common.clearfix}>
                <table className="table table-hover">
                    <thead><tr>{headerCells}</tr></thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>);
    }
}