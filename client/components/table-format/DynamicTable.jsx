import React, { useState, useMemo } from "react";
import { Eye, Trash2, Search, Filter, Plus } from "lucide-react";

const DynamicTable = ({
  columns = [],
  rows = [],
  rowsPerPage = 5,
  onAdd,
  onFilter,
  onView,
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* 🔍 SEARCH */
  const filteredRows = useMemo(() => {
    if (!search) return rows;
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [rows, search]);

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* 🔹 TOP BAR (RESPONSIVE) */}
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

          {/* BUTTON GROUP */}
          <div className="flex gap-3">
            {/* FILTER */}
            <button
              onClick={onFilter}
              className="flex items-center justify-center gap-2 px-4 py-2
                         border border-gray-200 rounded-lg text-gray-600
                         hover:bg-gray-50 w-full sm:w-auto"
            >
              <Filter size={18} />
              Filter
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
      </div>

      {/* 🔹 TABLE (SCROLLABLE ON MOBILE) */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedRows.length ? (
              paginatedRows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className="px-4 py-3 whitespace-nowrap"
                    >
                      {col.id === "view" ? (
                        <span
                          onClick={() => onView?.(row)}
                          className="text-green-600 font-semibold cursor-pointer"
                        >
                          VIEW
                        </span>
                      ) : col.id === "action" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onView?.(row)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                          >
                            <Eye size={18} className="text-green-500" />
                          </button>
                          <button
                            onClick={() => onDelete?.(row)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      ) : (
                        row[col.id] ?? "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 PAGINATION (RESPONSIVE WRAP) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                page === i + 1
                  ? "bg-green-500 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
