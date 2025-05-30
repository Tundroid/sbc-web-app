import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table } from "reactstrap";
import { Button } from "../../components/Button";

interface TableViewProps {
    data: any[];
    columns: any[];
    globalFilter: string;
    setGlobalFilter: (filter: string) => void;
    totals?: string[];
}

const TeamTableView: React.FC<TableViewProps> = ({ data, columns, globalFilter, setGlobalFilter, totals }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 3,
    });


    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
    });


    return (
        <div className="container mt-4">

            {/* Table */}
            <Table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-[#F5F5F5] text-left text-[rgba(0,0,0,0.55)] h-[54px] ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b-[1px] border-b-gray-300 px-4 py-3">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="font-normal">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b border-b-[1px] border-b-gray-300">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={table.getVisibleLeafColumns().length} className="text-center">

                            <div className="d-flex justify-content-between">
                                <span>
                                    Total {table.getFilteredRowModel().rows.length} items
                                </span>
                                <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                    <i class="fa-solid fa-chevron-left"></i>
                                </Button>
                                {Array.from({ length: table.getPageCount() }, (_, i) => (
                                    (i < 5 || i === table.getPageCount() - 1) && (
                                        <Button
                                            key={i}
                                            size="sm"
                                            onClick={() => table.setPageIndex(i)}
                                            {...(i === table.getState().pagination.pageIndex ? { variant: "outline" } : { className: "mx-1" })}
                                        >
                                            {i < 5 ? i + 1 : i === 5 ? "..." : i + 1}
                                        </Button>
                                    )
                                )).reduce((acc, btn, idx, arr) => {
                                    if (idx === 5 && arr.length > 6) {
                                        acc.push(
                                            <span key="ellipsis" className="mx-1">...</span>
                                        );
                                    }
                                    if (idx !== 5 || arr.length <= 6) acc.push(btn);
                                    return acc;
                                }, [])}
                                <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>

        </div>
    );
};

export default TeamTableView;
