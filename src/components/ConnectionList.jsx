import { useState, useEffect } from "react";
import { LucideShipWheel, MapPin } from "lucide-react";
import {
  fetchPendingConnections,
  fetchConnectedShippers,
  fetchConnectedShippingLines
} from  "../services/connectionRequestServices";
import { bankAcceptShipperRequest } from "../services/bankAcceptShipperServices"

const TABS = ["Pending Connections", "Connected Shippers", "Connected Shipping Lines"];

export default function BankConnectionList() {
  const [selectedTab, setSelectedTab] = useState("Pending Connections");
  const [connections, setConnections] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const fetchConnections = async (tab) => {
    try {
      if (tab === "Pending Connections") {
        const data = await fetchPendingConnections();
        const shippers = (data?.data?.data?.pending_shippers || []).map(item => ({ ...item, type: 'Shipper' }));
        const shippingLines = (data?.data?.data?.pending_shipping_lines || []).map(item => ({ ...item, type: 'Shipping Line' }));
        const combined = [...shippers, ...shippingLines];
        setConnections(combined);
      } else if (tab === "Connected Shippers") {
        const response = await fetchConnectedShippers();
        if (response?.status === 200) {
          console.log("connected shipper", response?.data?.data.connected_shippers)
          setConnections(response?.data?.data?.connected_shippers || []);
        }
      } else if (tab === "Connected Shipping Lines") {
        const response = await fetchConnectedShippingLines();
        if (response?.status === 200) {
          setConnections(response?.data?.data?.connected_shipping_lines || []);
        }
      }

      setPage(1);
    } catch (err) {
      console.error("An error occurred while fetching data:", err);
      setConnections([]);
    }
  };

  useEffect(() => {
    fetchConnections(selectedTab);
  }, [selectedTab]);

  const paginatedConnections = connections.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleConnect = async (connId) => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.id === connId ? { ...conn, status: 'accepted' } : conn
      )
    );

    try {

      const payload = {
        shipper_id: connId,
      };
      console.log("id", connId);

      const response = await bankAcceptShipperRequest(payload)
      if (response.status === 201) {
        // Update the connection status to "connected"
        setConnections((prev) =>
          prev.map((conn) =>
            conn.id === connId ? { ...conn, status: 'accepted' } : conn
          )
        );
      } else {
        console.log(response.message || "Failed to connect. Please try again.", "error");
      }
    } catch (error) {
      console.error(error);
      console.log("Server error. Try again later.", "error");
    }
  }

  return (
    <div className="flex flex-col md:h-[700px]">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 rounded-lg text-sm font-medium border ${
              selectedTab === tab
                ? "bg-white text-black"
                : " text-black border-black hover:bg-"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {paginatedConnections.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-8">
            {selectedTab === "Pending Connections" && "No pending requests."}
            {selectedTab === "Connected Shippers" && "No connected shippers."}
            {selectedTab === "Connected Shipping Lines" && "No connected shipping lines."}
          </div>
        ) : (
          paginatedConnections.map((conn, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-center p-4 gap-4 shadow-md border rounded-lg bg-white"
            >
              <LucideShipWheel size={48} className="text-black" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{conn.name}</h2>
                <p className="flex items-center text-sm text-gray-700">
                  <MapPin size={16} className="mr-1" /> {conn.location}
                </p>
                <p className="text-sm">Contact: <span className="font-semibold">{conn.email}</span></p>
                {conn.type && <p className="text-xs text-gray-500">Type: {conn.type}</p>}
              </div>
              <button
                onClick={() => handleConnect(conn.id)}
                disabled={conn.status === 'accepted'}
                className={`px-6 py-2 rounded-md ${
                  conn.status === 'accepted'
                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {conn.status === 'accepted'
                  ? 'Accepted'
                  : 'Accept'}
              </button>
            </div>
          ))
        )}
      </div>
      <div className="md:flex-1" />
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
          onClick={() =>
            setPage((p) =>
              p * itemsPerPage < connections.length ? p + 1 : p
            )
          }
          disabled={page * itemsPerPage >= connections.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
