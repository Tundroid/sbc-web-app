import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table } from "reactstrap";

interface TableViewProps {
    data: any[];
    columns: any[];
    globalFilter: string;
    setGlobalFilter: (filter: string) => void;
    totals?: string[];
}

const TeamTableView: React.FC<TableViewProps> = ({ data, columns, globalFilter, setGlobalFilter, totals }) => {

    

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    });


    return (
        <div className="container mt-4">

            {/* Table */}
            <Table className="w-full table-auto border-collapse border border-gray-300 text-center">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {/* {table.getVisibleLeafColumns().map((column) => {
							if (totals && Array.isArray(totals) && totals.includes(column.id)) {
								const total = table
									.getRowModel()
									.rows.reduce((sum, row) => sum + (Number(row.getValue(column.id)) || 0), 0);
								return <td key={column.id}><b>Total: {Util.formatNumber(total)}</b></td>;
							} else {
								return <td key={column.id}></td>;
							}
						})} */}
                    </tr>
                </tfoot>
            </Table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button className="btn btn-secondary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TeamTableView;
