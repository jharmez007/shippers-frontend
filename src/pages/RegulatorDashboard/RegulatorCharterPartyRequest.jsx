import React from 'react'

import { DashboardHeader, FreightFeeTable } from '../../components';

const RegulatorCharterPartyRequest = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <FreightFeeTable  />
    </main>
  )
}

export default RegulatorCharterPartyRequest
