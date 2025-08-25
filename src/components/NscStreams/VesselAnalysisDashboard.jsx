import  { useState } from 'react';
import { motion } from 'framer-motion';

import { VesselTab, VesselFilter, MonthlyVesselTable, KPIColorLegend, AnnualVesselAverage } from '..';


// Constants
const SERVICE_TYPES = [
  'Container Terminal',
  'Bulk Terminal',
  'RoRo Terminal',
  'General Cargo Terminal',
];

const INDICATORS_BY_SERVICE = {
  'Container Terminal': [
    'Ship Calls',
    'Tonnage (MT) Import',
    'Tonnage (MT) Export',
    'Containers (TEUs) Import',
    'Containers (TEUs) Export',
  ],
  'Bulk Terminal': [
    'Ship Calls',
    'Tonnage (MT) Import',
    'Tonnage (MT) Export',
    'Vehicle (Units) Import',
    'Vehicle (Units) Export',
  ],
  'RoRo Terminal': [
    'Ship Calls',
    'Containers (TEUs) Export',
    'Containers (TEUs) Import',
    'Vehicle (Units) Import',
    'Vehicle (Units) Export',
  ],
  'General Cargo Terminal': [
    'Ship Calls',
    'Tonnage (MT) Import',
    'Tonnage (MT) Export',
    'Containers (TEUs) Import',
    'Containers (TEUs) Export',
  ],
};

const TERMINALS_BY_SERVICE = {
  'Container Terminal': ['APM Terminals', 'PTML', 'TICT'],
  'Bulk Terminal': ['ENL', 'ABTL'],
  'RoRo Terminal': ['Grimaldi'],
  'General Cargo Terminal': ['Ports & Cargo', 'GAC'],
};

const KPI_DUMMY_DATA = [
  {
    month: 'January',
    'APM Terminals': {
      'Ship Calls': 118,
      'Tonnage (MT) Import': 68500,
      'Tonnage (MT) Export': 19800,
      'Containers (TEUs) Import': 33000,
      'Containers (TEUs) Export': 9200,
    },
    PTML: {
      'Ship Calls': 74,
      'Tonnage (MT) Import': 46200,
      'Tonnage (MT) Export': 14500,
      'Containers (TEUs) Import': 19200,
      'Containers (TEUs) Export': 6100,
    },
    TICT: {
      'Ship Calls': 97,
      'Tonnage (MT) Import': 50800,
      'Tonnage (MT) Export': 16500,
      'Containers (TEUs) Import': 24800,
      'Containers (TEUs) Export': 7100,
    },
  },
  {
    month: 'February',
    'APM Terminals': {
      'Ship Calls': 110,
      'Tonnage (MT) Import': 66200,
      'Tonnage (MT) Export': 18400,
      'Containers (TEUs) Import': 31600,
      'Containers (TEUs) Export': 8700,
    },
    PTML: {
      'Ship Calls': 68,
      'Tonnage (MT) Import': 44000,
      'Tonnage (MT) Export': 13600,
      'Containers (TEUs) Import': 18100,
      'Containers (TEUs) Export': 5600,
    },
    TICT: {
      'Ship Calls': 88,
      'Tonnage (MT) Import': 48700,
      'Tonnage (MT) Export': 15800,
      'Containers (TEUs) Import': 23900,
      'Containers (TEUs) Export': 6900,
    },
  },
];


const VesselAnalysisDashboard = () => {
  const [selectedService, setSelectedService] = useState('Container Terminal');
  const [selectedPortComplex, setSelectedPortComplex] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const indicators = INDICATORS_BY_SERVICE[selectedService] || [];
  const terminalNames = TERMINALS_BY_SERVICE[selectedService] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 bg-gray-50 min-h-screen rounded-2xl"
    >
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Vessel Activity Analysis </h1>
        <p className="text-sm text-gray-600">Monthly and Annual Terminal Performance Overview</p>
      </header>

      <VesselTab
        services={SERVICE_TYPES}
        activeService={selectedService}
        onChange={setSelectedService}
      />

      <VesselFilter
        selectedPort={selectedPortComplex}
        selectedYear={selectedYear}
        onPortChange={setSelectedPortComplex}
        onYearChange={setSelectedYear}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <AnnualVesselAverage
          indicators={indicators}
          terminals={terminalNames}
          data={KPI_DUMMY_DATA}
        />
        <KPIColorLegend />
      </div>

      {KPI_DUMMY_DATA.map((monthData) => {
        const month = monthData.month;
        const terminals = terminalNames.map((terminal) => ({
          name: terminal,
          indicators: monthData[terminal] || {},
        }));

        return (
          <MonthlyVesselTable
            key={month}
            month={month}
            indicators={indicators}
            terminals={terminals}
          />
        );
      })}
    </motion.div>
  );
};

export default VesselAnalysisDashboard;
