import { DashboardHeader, FreightFeeTable } from '../../components';

const RegulatorFreightRateRequest = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <FreightFeeTable  />
    </main>
  )
}

export default RegulatorFreightRateRequest
