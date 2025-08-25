import { useState, useMemo } from "react";
import { format } from "date-fns";
import { NscCampContainerActionMenu } from "..";

const NscCampContainerTable = ({
  containers = [],
  title = "Containers",
  statusFilter,
  onModalOpen,
  onStatusChange,
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Use correct keys based on backend response
  const filteredData = useMemo(() => {
    return containers
      .filter((c) => (statusFilter ? c.status?.toLowerCase() === statusFilter.toLowerCase() : true))
      .filter((c) =>
        search
          ? (c.container_no || "").toLowerCase().includes(search.toLowerCase())
          : true
      );
  }, [containers, search, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const statusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "flagged":
        return "bg-yellow-100 text-yellow-800";
      case "confiscated":
        return "bg-red-100 text-red-800";
      case "released":
        return "bg-green-100 text-green-800";
      case "contested":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search Container Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-60"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto pb-32">
        <table className="min-w-[800px] w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Container Number</th>
              <th className="py-3 px-4">Terminal</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Date Flagged</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((container, index) => (
                <tr key={container.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{(page - 1) * rowsPerPage + index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {container.container_no}
                  </td>
                  <td className="py-3 px-4">{container.terminal || "-"}</td>
                  <td className="py-3 px-4">{container.reason || container.reason_for_flagging || "-"}</td>
                  <td className="py-3 px-4">
                    {container.created_at
                      ? format(new Date(container.created_at), "MMMM d, yyyy")
                      : "-"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor(container.status)}`}
                    >
                      {(container.status && container.status.toLowerCase() === "under_review"
                        ? "Pending"
                        : container.status?.charAt(0).toUpperCase() + container.status?.slice(1))}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <NscCampContainerActionMenu
                      container={container}
                      onModalOpen={onModalOpen}
                      onStatusChange={onStatusChange}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No containers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-600">
            Showing {(page - 1) * rowsPerPage + 1} to{" "}
            {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full text-sm transition ${
                  page === i + 1
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NscCampContainerTable;
