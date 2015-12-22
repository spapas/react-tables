import React from 'react'
import ReactDOM from 'react-dom'
import {Table, Column, Cell} from 'fixed-data-table';

const cache = {};
let loading = false;
const pageSize = 10;
const loadingCell = <Cell>
    <img width="16" height="16" alt="star" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
</Cell>


const AjaxCell = ({rowIndex, col, forceUpdate, ...props}) => {
    let page = 1;
    let idx = rowIndex;
    if(rowIndex>=pageSize) {
        page = Math.floor(rowIndex / pageSize) + 1;
        idx = rowIndex % pageSize;
    }
    if (cache[page]) {
        return <Cell>{cache[page][idx][col]}</Cell>
    } else if(!loading) {
        console.log("Loading page " + page);
        loading = true;
        
        fetch('http://swapi.co/api/people/?format=json&page='+page).then(function(response) { 
            return response.json();
        }).then(function(j) {
            cache[page] = j['results'];
            loading = false;
            forceUpdate();
        });
    }
    return loadingCell;
}

class TableContainer extends React.Component {
    render() { 
        return <Table
            rowHeight={30} rowsCount={87} width={600} height={200} headerHeight={30}>
            
            <Column
              header={<Cell>Name</Cell>}
              cell={ <AjaxCell col='name' forceUpdate={this.forceUpdate.bind(this)} /> }
              width={200}
            />
            <Column
              header={<Cell>Name</Cell>}
              cell={ <AjaxCell col='birth_year' forceUpdate={this.forceUpdate.bind(this)} /> }
              width={200}
            />
            <Column
              header={<Cell>Name</Cell>}
              cell={ <AjaxCell col='url' forceUpdate={this.forceUpdate.bind(this)} /> }
              width={200}
            />
            
        </Table>
    }
}

ReactDOM.render(
    <div>
        <TableContainer />
    </div>,
    document.getElementById('main')
);