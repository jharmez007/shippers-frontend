import { useState } from "react";
import { toast } from "sonner";
import { getContainerStatus } from "../services/streamsCampServices";
import Loader from "../components/Loader";

const CheckContainer = () => {
  const [containerNo, setContainerNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!containerNo.trim()) {
      toast.error("Please enter a container number.");
      return;
    }

    try {
      setLoading(true);
      const response = await getContainerStatus(containerNo);
      setLoading(false);

      if (response?.status === 200) {
        toast.success(`Status: ${response?.data?.data?.status || "Container found"}`);
      } else {
        toast.error(response?.message || "Container not found or server error.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {loading && <Loader />}

      <div className="w-full max-w-xl mt-10">
        <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">
          Check Container Status
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white shadow-lg rounded-full overflow-hidden border border-gray-200 px-4 py-2"
        >
          <input
            type="text"
            placeholder="Enter container number..."
            value={containerNo}
            onChange={(e) => setContainerNo(e.target.value)}
            className="flex-1 px-4 py-2 focus:outline-none text-gray-700"
          />

          <button
            type="submit"
            className="bg-[#0E4C81] text-white px-6 py-2 rounded-full hover:bg-[#09385f] transition"
          >
            Search
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Enter your container number to check its current status.
        </p>
      </div>
    </div>
  );
};

export default CheckContainer;
