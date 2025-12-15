import React, { useState, useMemo, useEffect } from "react";
import { Pencil, Trash2, Search, Filter, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api/Api_url";

const DynamicTable = ({
    columns = [],
    rows = [],
    rowsPerPage = 5,
    onAdd,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.replace(/\/$/, "");

    const { user } = useSelector((state) => state.auth);
    const loginRole = user?.role_name;

    const [tableRows, setTableRows] = useState(rows);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        setTableRows(rows);
    }, [rows]);

    const filteredRows = useMemo(() => {
        let data = [...tableRows];

        if (search) {
            data = data.filter((row) =>
                Object.values(row).some((val) =>
                    String(val).toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        if (statusFilter !== "ALL") {
            data = data.filter((row) => row.status === statusFilter);
        }

        return data;
    }, [tableRows, search, statusFilter]);


    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const paginatedRows = filteredRows.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleEdit = (row) => {
        navigate(`${basePath}/edit/${row.id}`);
    };

    const getDeleteApiUrl = (id) => {
        switch (true) {
            case basePath.startsWith("/users"):
                return `${API_URL}/users/${id}`;
            case basePath.startsWith("/vehicles"):
                return `${API_URL}/vehicles/${id}`;
            case basePath.startsWith("/members"):
                return `${API_URL}/members/${id}`;
            case basePath.startsWith("/roles"):
                return `${API_URL}/roles/${id}`;
            default:
                return null;
        }
    };

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        const deleteUrl = getDeleteApiUrl(selectedRow?.id);
        if (!deleteUrl) return setShowConfirm(false);

        try {
            await axios.delete(deleteUrl);
            setTableRows((prev) =>
                prev.filter((item) => item.id !== selectedRow.id)
            );
            console.log("Deleted this ID");

        } catch {
        } finally {
            setShowConfirm(false);
            setSelectedRow(null);
        }
    };

    const handleFilter = () => {
        setStatusFilter((p) =>
            p === "ALL" ? "Active" : p === "Active" ? "Inactive" : "ALL"
        );
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 w-full">

            <div className="flex mb-6">
                <div
                    className="
            ml-auto bg-white rounded-lg p-3 flex
            flex-col sm:flex-col md:flex-row
            items-stretch md:items-center
            gap-3 w-full md:w-2/3 lg:w-1/3
          "
                >
                    {/* SEARCH */}
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search anything..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* FILTER */}
                    <button
                        onClick={handleFilter}
                        className="flex items-center justify-center gap-2 px-4 py-2
            border border-gray-200 rounded-lg text-gray-600
            hover:bg-gray-50 w-full sm:w-auto"
                    >
                        <Filter size={18} />
                        {statusFilter}
                    </button>

                    {/* ADD */}
                    <button
                        onClick={onAdd}
                        className="bg-green-500 hover:bg-green-600 text-white
            px-4 py-2 rounded-lg font-medium flex
            items-center justify-center gap-2 transition-all
            w-full sm:w-auto"
                    >
                        <Plus size={20} />
                        ADD
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="min-w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                                S.No
                            </th>
                            {columns.map((col) => (
                                <th
                                    key={col.id}
                                    className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
                                >
                                    {col.label}
                                </th>
                            ))}
                            {loginRole === "Admin" && (
                                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                                    Action
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedRows.length ? (
                            paginatedRows.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {(page - 1) * rowsPerPage + index + 1}
                                    </td>

                                    {columns.map((col) => (
                                        <td
                                            key={col.id}
                                            className="px-4 py-3 whitespace-nowrap"
                                        >
                                            {row[col.id] ?? "-"}
                                        </td>
                                    ))}

                                    {loginRole === "Admin" && (
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(row)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                                >
                                                    <Pencil size={18} className="text-green-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(row)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                                >
                                                    <Trash2 size={18} className="text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded-md text-sm transition ${page === i + 1
                                ? "bg-green-500 text-white"
                                : "border hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete this record?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 border rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DynamicTable;
