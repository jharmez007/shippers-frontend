import  { useState } from 'react';
import { motion } from 'framer-motion';

import { KPITab, KPIFilter, MonthlyKPITable, KPIColorLegend, AnnualKPIAverage } from '..';


// Constants
const SERVICE_TYPES = [
  'Container Terminal',
  'Bulk Terminal',
  'RoRo Terminal',
  'General Cargo Terminal',
];

const INDICATORS_BY_SERVICE = {
  'Container Terminal': [
    'Berth Occupancy (%)',
    'Cargo Dwell Time (days)',
    'Truck Turn Around Time (minutes)',
    'Crane Moves Per Hour (hours)',
    'Vessel Turn Around (days)',
  ],
  'Bulk Terminal': [
    'Berth Occupancy (%)',
    'Cargo Dwell Time (days)',
    'Truck Turn Around Time (minutes)',
    'Vessel Turn Around (days)',
  ],
  'RoRo Terminal': [
    'Berth Occupancy (%)',
    'Truck Turn Around Time (minutes)',
    'Vessel Turn Around (days)',
  ],
  'General Cargo Terminal': [
    'Berth Occupancy (%)',
    'Cargo Dwell Time (days)',
    'Truck Turn Around Time (minutes)',
    'Crane Moves Per Hour (hours)',
    'Vessel Turn Around (days)',
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
      'Berth Occupancy (%)': 75,
      'Cargo Dwell Time (days)': 4,
      'Truck Turn Around Time (minutes)': 35,
      'Crane Moves Per Hour (hours)': 26,
      'Vessel Turn Around (days)': 3,
    },
    PTML: {
      'Berth Occupancy (%)': 65,
      'Cargo Dwell Time (days)': 5,
      'Truck Turn Around Time (minutes)': 55,
      'Crane Moves Per Hour (hours)': 20,
      'Vessel Turn Around (days)': 4,
    },
    TICT: {
      'Berth Occupancy (%)': 55,
      'Cargo Dwell Time (days)': 6,
      'Truck Turn Around Time (minutes)': 50,
      'Crane Moves Per Hour (hours)': 22,
      'Vessel Turn Around (days)': 3.5,
    },
  },
  {
    month: 'February',
    'APM Terminals': {
      'Berth Occupancy (%)': 80,
      'Cargo Dwell Time (days)': 3.5,
      'Truck Turn Around Time (minutes)': 30,
      'Crane Moves Per Hour (hours)': 28,
      'Vessel Turn Around (days)': 2.5,
    },
    PTML: {
      'Berth Occupancy (%)': 60,
      'Cargo Dwell Time (days)': 6,
      'Truck Turn Around Time (minutes)': 60,
      'Crane Moves Per Hour (hours)': 19,
      'Vessel Turn Around (days)': 5,
    },
    TICT: {
      'Berth Occupancy (%)': 70,
      'Cargo Dwell Time (days)': 4.5,
      'Truck Turn Around Time (minutes)': 45,
      'Crane Moves Per Hour (hours)': 21,
      'Vessel Turn Around (days)': 4,
    },
  },
];

const KPIAnalysisDashboard = () => {
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
        <h1 className="text-2xl font-bold text-gray-800">KPI Analysis </h1>
        <p className="text-sm text-gray-600">Monthly and Annual Terminal Performance Overview</p>
      </header>

      <KPITab
        services={SERVICE_TYPES}
        activeService={selectedService}
        onChange={setSelectedService}
      />

      <KPIFilter
        selectedPort={selectedPortComplex}
        selectedYear={selectedYear}
        onPortChange={setSelectedPortComplex}
        onYearChange={setSelectedYear}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <AnnualKPIAverage
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
          <MonthlyKPITable
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

export default KPIAnalysisDashboard;
