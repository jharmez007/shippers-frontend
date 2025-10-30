import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { shipperBanks } from '../../services/getBankServices'; 
import { shipperConnectBanks } from '../../services/connectToBankForShipperServices'; 

const BankCardList = () => {
  const [bankData, setBankData] = useState([]); 
  
  useEffect(() => {
    const fetchBank = async () => {
      try {
        const response = await shipperBanks(); 

        if (response?.status === 200) {
          const banks = response?.data?.data || [];
          setBankData(banks); 
        } else {
          toast.error(response?.data?.message || "Failed to fetch Bank data.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while fetching Bank data.");
      }
    };

    fetchBank(); // Call the fetchBank function
  }, []);

  const handleSubmit = async (bankId) => {
    try {
      
      const payload = {
        bank_id: bankId,
      };

      const response = await shipperConnectBanks(payload);

      if (response.status === 201) {
        // Update the connection status to "connected"
        setBankData((prev) =>
          prev.map((bank) =>
            bank.id === bankId ? { ...bank, connection_status: 'pending' } : bank
          )
        );
        toast.success("Connection request sent. Pending approval.");
      } else if (
        response?.message === "You have already requested or connected to this bank."
      ) {
        // Handle the case where the bank is already connected
        setBankData((prev) =>
          prev.map((bank) =>
            bank.id === bankId ? { ...bank, connection_status: 'connected' } : bank
          )
        );
        toast.error("Bank is already connected or requested.");
      } else {
        toast.error(response.message || "Failed to connect to the bank. Please try again.");
        setBankData((prev) =>
          prev.map((bank) =>
            bank.id === bankId ? { ...bank, connection_status: 'not connected' } : bank
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
      setBankData((prev) =>
        prev.map((bank) =>
          bank.id === bankId ? { ...bank, connection_status: 'not connected' } : bank
        )
      );
    }
  };

  const getInitials = (bankName) => {
    return bankName
      .split(' ') // Split the bank name into words
      .map((word) => word[0].toUpperCase()) // Get the first letter of each word and convert to uppercase
      .join(''); // Join the letters to form the initials
  };

  return (
    <div className="space-y-4">
      {!Array.isArray(bankData) || bankData.length === 0 ? ( // Check if bankData is not an array or is empty
        <p className="text-center text-gray-500 text-3xl md:text-7xl mt-32 md:mt-60">No Bank is Onboard</p>
      ) : (
        bankData.map((bank) => (
          <div
            key={bank.id}
            className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700"
              >
               {getInitials(bank.bank_name)} {/* Dynamically compute initials */}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bank.bank_name}</h3>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {bank.address}
                </p>
                <p className="text-sm text-gray-600">
                  Contact: <strong>{bank.official_email}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSubmit(bank.id)} // Pass the bank ID when clicked
              disabled={bank.connection_status === 'connected' || bank.connection_status === 'pending'} // Disable if connected or pending
              className={`px-6 py-2 rounded-md ${
                bank.connection_status === 'connected'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : bank.connection_status === 'pending'
                  ? 'bg-blue-500 text-white cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {bank.connection_status === 'connected'
                ? 'Connected'
                : bank.connection_status === 'pending'
                ? 'Pending...'
                : 'Connect'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BankCardList;