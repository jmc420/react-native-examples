import * as React from 'react';
import { Button, Container, Content, Left, List, ListItem, Right, Text, View } from 'native-base';

import INavBarProps from "../navigation/INavBarProps";
import NavBar from "../navigation/NavBar";

interface IRowData {
    columns: any[];
}

interface ITableData {
    columnNames: string[];
    rows: IRowData[];
}

export default class Home extends React.Component<INavBarProps, any> {

    render() {
        let table: ITableData = this.getTable();

        return (
            <Container>
                <NavBar title={this.props.title} back={this.props.back}/>
                <Content padder style={{ backgroundColor: '#fff' }} >
                    <List>
                        {table.rows.map((row, index) => (
                            <ListItem key={index}>
                                <Text>{row.columns[0]}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
        );
    }

    private getTable(): ITableData {
        var table: ITableData = {
            columnNames: ["Column1", "Column2"],
            rows: []
        };
        var maxColumns = table.columnNames.length;

        for (var rowCount = 0; rowCount < 100; rowCount++) {
            var row: IRowData = {
                columns: []
            };

            table.rows.push(row);

            for (var colCount = 0; colCount < maxColumns; colCount++) {
                row.columns.push("Row " + rowCount);
            }
        }
        return table;
    }
}