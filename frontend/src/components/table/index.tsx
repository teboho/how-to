import React from "react";
import { useTable } from "react-table";

export default function Table({
    columns,
    data
}: {
    columns: [],
    data: []
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns, 
        data
    })
    return (<table {...getTableProps()}>
        <thead>
            {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(c => (
                            <th {...c.getHeaderProps()}>{c.render("Header")}</th>
                        ))}
                    </tr>
                ))
            }
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return <td { ...cell.getCellProps}>{cell.render("Cell")}</td>
                                })
                            }
                        </tr>
                    );
                })
            }
        </tbody>
    </table>);
}