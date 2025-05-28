import { DashboardHeader, BankCardList } from '../../components';

const Bank = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Connect to Bank
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Connect to your bank account to view transactions and manage payments.
        </p>
        <p className="text-sm text-green-500 mt-2">
          Bank Account
        </p>
      </div>
      <BankCardList />
    </main>
  )
}

export default Bank
