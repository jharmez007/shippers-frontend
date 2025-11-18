import { FaFileAlt, FaUser, FaChartBar, FaTachometerAlt, FaUniversity, FaGlobe, FaSlidersH, FaConnectdevelop, FaClipboardList, FaCubes, FaShip, 
  FaMoneyBillWave, FaChartLine, FaInbox, FaBook, FaBalanceScale, FaFileContract, FaHourglassHalf, FaFileInvoiceDollar, FaOilCan, FaClipboardCheck,
  FaFileSignature, FaHistory, 
} from "react-icons/fa";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const baseFields = {
  first_name: "",
  last_name: "",
  phone_number: "",
};

export const userTypeFields = {
  bank: { bank_name: "" },
  shipper: { address: "" },
  shipping_line: {
    company_name: "",
    license_number: "",
    registration_number: "",
    address: "",
  },
  terminal: {
    terminal_name: "",
    license_number: "",
    registration_number: "",
    address: "",
  },
  regulator: { agency_name: "" },
  nsc_staff: { division: "" },
};

export const GovernmentUserOptions = [
  { label: "The Nigerian Port Authority", value: "npa" },
  { label: "National Inland Waterways Authority of Nigeria", value: "niwa" },
  { label: "Nigerian Maritime Administration and Safety Agency", value: "nimasa" },
  { label: "Nigerian Railway Corporation", value: "nrc" },
];

export const individualUserOptions = [
  { label: "Shipper", value: "shipper" },
  { label: "Vessel Charterers/Owners", value: "charterer" },
];

export const coporateUserOptions = [
  { label: "Seaport Terminal Operator", value: "terminal" },
  { label: "Regulator", value: "regulator" },
  { label: "Shipping Lines/Agents", value: "shipping_line" },
  { label: "Off dock Terminal Operator", value: "off_dock_terminal_operator" },
  { label: "Cargo Consolidator", value: "cargo_consolidator" },
  { label: "Logistic Service Provider", value: "logistic_service_provider" },
  { label: "Freight Forwarder/Clearing Agent", value: "freight_forwarder/clearing_agent" },
  { label: "Inland Container Depot Operator", value: "inland_container_depot_operator" },
  { label: "Stevedoring Company", value: "stevedoring_company" },
  { label: "Inland Dry Port", value: "inland_dry_port" },
  { label: "Airfreight", value: "airfreight" },
]

export const complexUserOptions = [
  { label: "Apapa Port Complex", value: "terminal" },
  { label: "Delta Port Complex", value: "regulator" },
  { label: "Delta Port Complex", value: "shipping_line" },
  { label: "Tin-can Port Complex", value: "off_dock_terminal_operator" },
  { label: "Calabar Port Complex", value: "cargo_consolidator" },
  { label: "Fot-Onne Port Complex", value: "logistic_service_provider" },
]

export const terminalUserOptions = [
  { label: "Apapa Bulk Terminal Ltd (ABTL)", value: "abtl" },
  { label: "ENL Consortium Ltd", value: "enl" },
  { label: "APM Terminals Ltd", value: "off_dock_terminal_operator" },
  { label: "Greenview Development Nigeria Ltd (GNDL)", value: "cargo_consolidator" },
  { label: "AP Mollar Terminals", value: "logistic_service_provider" },
]


export const departmentOptions = [
  { label: "ICT", value: "ICT" },
  { label: "CAD", value: "CAD" },
  { label: "SPRD", value: "SPRD" },
  { label: "ES/CEO", value: "ES" },
  { label: "ITSD", value: "ITSD" },
  { label: "Complaint Unit", value: "Complaint" },
  { label: "Regulatory", value: "Regulatory" },
];


export const FreightOverviewChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Freight Requests",
        data: [500, 300, 250, 400, 600, 550, 500, 400, 350, 600, 700, 650],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg p-4 text-white">
      <h4 className="mb-2">Freight overview (+%) more in 2025</h4>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export const barData = {
  labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
      {
      label: 'Total Orders',
      data: [25, 18, 30, 22, 16, 28],
      backgroundColor: '#F97316',
      },
  ],
};

/* Shipper Dashboard paths */
export const shipperMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/crd/shipper-dashboard/dashboard' },
  // { name: 'Bank', icon: FaUniversity, path: '/shipper-dashboard/bank' },
  { name: 'Submit Freight Form', icon: FaFileAlt, path: '/crd/shipper-dashboard/freight-rate-form' },
  { name: 'Freight Rate Requests', icon: FaHistory, path: '/crd/shipper-dashboard/freight-rate-request' },
  // { name: 'Freight Analysis', icon: FaChartBar, path: '/shipper-dashboard/freight-analysis' },
];
  
export const ShipperAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/crd/shipper-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/crd/shipper-dashboard/settings' },
];

/* Charterer Dashboard paths */
export const chatererMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/crd/charterer-dashboard/dashboard' },
  { name: 'Submit Charter Party', icon: FaFileSignature, path: '/crd/charterer-dashboard/charter-party-form' },
  { name: 'Charter Party Requests', icon: FaHistory, path: '/crd/charterer-dashboard/charter-party-request' },
  { name: 'Submit Post Audit', icon: FaFileSignature, path: '/crd/charterer-dashboard/post-audit-form' },
  { name: 'Post Audit Requests', icon: FaHistory, path: '/crd/charterer-dashboard/post-audit-request' },
];
export const chatererAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/crd/charterer-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/crd/charterer-dashboard/settings' },
];

/* Shipping Lines Dashboard paths */
export const shippingLinesMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/crd/shipping-lines-dashboard/dashboard' },
  { name: 'Demurrage Requests', icon: FaClipboardList, path: '/crd/shipping-lines-dashboard/demurrage-requests' },
  { name: 'Submit Demurrage', icon: FaFileAlt, path: '/crd/shipping-lines-dashboard/submit-demurrage' },
  { name: 'KPI', icon: FaChartBar, path: '/crd/shipping-lines-dashboard/kpi' },
  { name: 'Throughput', icon: FaCubes, path: '/crd/shipping-lines-dashboard/throughput' },
  { name: 'Voyage', icon: FaShip, path: '/crd/shipping-lines-dashboard/voyage' },
  { name: 'Tariff', icon: FaMoneyBillWave, path: '/crd/shipping-lines-dashboard/tariffs' },
  { name: 'SOP', icon: FaBook, path: '/crd/shipping-lines-dashboard/sop' },
];
  
export const ShippingLinesAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/crd/shipping-lines-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/crd/shipping-lines-dashboard/settings' },
];

/* Bank Dashboard paths */
export const bankMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/bank-dashboard/dashboard' },
  { name: 'Freight Rate Request', icon: FaUniversity, path: '/bank-dashboard/freight-rate-request' },
  { name: 'Charter Party Request', icon: FaFileAlt, path: '/bank-dashboard/charter-party-request' },
  { name: 'Demurrage Request', icon: FaGlobe, path: '/bank-dashboard/demurrage-request' },
  { name: 'Submission Request', icon: FaChartBar, path: '/bank-dashboard/submission-request' },
  { name: 'Connections', icon: FaConnectdevelop, path: '/bank-dashboard/connection-requests' },
];

export const bankAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/bank-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/bank-dashboard/settings' },
];

/* Regulator Dashboard paths */
export const regulatorMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/regulator-dashboard/dashboard' },
  { name: 'Freight Rate Request', icon: FaUniversity, path: '/regulator-dashboard/freight-rate-request' },
  { name: 'Charter Party Request', icon: FaFileAlt, path: '/regulator-dashboard/charter-party-request' },
  { name: 'Demurrage Request', icon: FaGlobe, path: '/regulator-dashboard/demurrage-request' },
];

export const regulatorAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/regulator-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/regulator-dashboard/settings' },
];

/* Nsc Dashboard paths */
export const nscMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/crd/nsc-dashboard/dashboard' },
  { name: 'Tariff', icon: FaBalanceScale, path: '/crd/nsc-dashboard/tariff' },
  { name: 'Freight Rate Requests', icon: FaShip, path: '/crd/nsc-dashboard/freight-rate-request' },
  { name: 'Charter Party Requests', icon: FaFileContract, path: '/crd/nsc-dashboard/charter-party-request' },
  { name: 'Demurrage Requests', icon: FaHourglassHalf, path: '/crd/nsc-dashboard/demurrage-request' },
  { name: 'Indicative Freight Rate', icon: FaFileInvoiceDollar, path: '/crd/nsc-dashboard/indicative-freight' },
  { name: 'Tanker Freight', icon: FaOilCan, path: '/crd/nsc-dashboard/tanker-freight' },
  { name: 'Post Audit', icon: FaClipboardCheck, path: '/crd/nsc-dashboard/post-audit' },
];

export const nscAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/crd/nsc-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/crd/nsc-dashboard/settings' },
];

/* Nsc DRS Dashboard paths */
export const nscDrsMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/crd/nsc-drs-dashboard/dashboard' },
  { name: 'Tariff', icon: FaBalanceScale, path: '/crd/nsc-drs-dashboard/tariff' },
  { name: 'Freight Rate Requests', icon: FaShip, path: '/crd/nsc-drs-dashboard/freight-rate-request' },
  { name: 'Charter Party Requests', icon: FaFileContract, path: '/crd/nsc-drs-dashboard/charter-party-request' },
  { name: 'Demurrage Requests', icon: FaHourglassHalf, path: '/crd/nsc-drs-dashboard/demurrage-request' },
  { name: 'Indicative Freight Rate', icon: FaFileInvoiceDollar, path: '/crd/nsc-drs-dashboard/indicative-freight' },
  { name: 'Tanker Freight', icon: FaOilCan, path: '/crd/nsc-drs-dashboard/tanker-freight' },
  { name: 'Post Audit', icon: FaClipboardCheck, path: '/crd/nsc-drs-dashboard/post-audit' },
];

export const nscDrsAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/crd/nsc-drs-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/crd/nsc-drs-dashboard/settings' },
];

/* Nsc Head of M and T Dashboard paths */
export const nscMandTHeadMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/crd/nsc-mandt-head-dashboard/dashboard' },
  { name: 'Tariff', icon: FaBalanceScale, path: '/crd/nsc-mandt-head-dashboard/tariff' },
  { name: 'Freight Rate Requests', icon: FaShip, path: '/crd/nsc-mandt-head-dashboard/freight-rate-request' },
  { name: 'Charter Party Requests', icon: FaFileContract, path: '/crd/nsc-mandt-head-dashboard/charter-party-request' },
  { name: 'Demurrage Requests', icon: FaHourglassHalf, path: '/crd/nsc-mandt-head-dashboard/demurrage-request' },
  { name: 'Indicative Freight Rate', icon: FaFileInvoiceDollar, path: '/crd/nsc-mandt-head-dashboard/indicative-freight' },
  { name: 'Tanker Freight', icon: FaOilCan, path: '/crd/nsc-mandt-head-dashboard/tanker-freight' },
  { name: 'Post Audit', icon: FaClipboardCheck, path: '/crd/nsc-mandt-head-dashboard/post-audit' },
];

export const nscMandTHeadAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/crd/nsc-mandt-head-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/crd/nsc-mandt-head-dashboard/settings' },
];

/* Nsc Streams Dashboard paths */
export const nscStreamsMainLinks = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/streams/nsc-dashboard/dashboard' },
  { name: 'KPI', icon: FaChartBar, path: '/streams/nsc-dashboard/kpi' },
  { name: 'Throughput', icon: FaCubes, path: '/streams/nsc-dashboard/throughput' },
  { name: 'KPI Analysis', icon: FaChartLine, path: '/streams/nsc-dashboard/kpi-analysis' },
  { name: 'Vessel Activity', icon: FaShip, path: '/streams/nsc-dashboard/vessel-activity' },
  { name: 'Tariff', icon: FaMoneyBillWave, path: '/streams/nsc-dashboard/tariffs' },
  { name: 'SOP', icon: FaBook, path: '/streams/nsc-dashboard/sop' },
];

export const nscStreamsAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/streams/nsc-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/streams/nsc-dashboard/settings' },
];

/* Nsc SSD Dashboard paths */
export const ssdMainLinks = [
  { name: 'SOP', icon: FaBook, path: '/nsc-ssd-dashboard/sop' },
];

export const ssdAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/nsc-ssd-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/nsc-ssd-dashboard/settings' },
];

/* Nsc SSD Head Dashboard paths */
export const ssdHeadMainLinks = [
  { name: 'SOP', icon: FaBook, path: '/nsc-ssd-head-dashboard/sop' },
];

export const ssdHeadAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/nsc-ssd-head-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/nsc-ssd-head-dashboard/settings' },
];

/* Streams Dashboard paths */
export const streamsMainLinks = [
  { name: 'All Submissions', icon: FaInbox, path: '/streams/terminal-dashboard/dashboard' },
  { name: 'Submit KPI', icon: FaChartLine, path: '/streams/terminal-dashboard/new-kpi-submission' },
  { name: 'Submit Throughput', icon: FaCubes, path: '/streams/terminal-dashboard/new-throughput-submission' },
  { name: 'Submit Tariff', icon: FaMoneyBillWave, path: '/streams/terminal-dashboard/tariff' },
  { name: 'Submit SOP', icon: FaBook, path: '/streams/terminal-dashboard/sop' },
  { name: 'Shipping Lines', icon: FaShip, path: '/streams/terminal-dashboard/shipping-lines' },
];

export const streamsAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/streams/terminal-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/streams/terminal-dashboard/settings' },
];

export const links = [
    { name: "Home", link: "home" },
    {
      name: "Stakeholders",
      dropdown: [
        {
          name: "Government Agencies", 
          link: "stakeholders/govt agencies",
          dropdown : [
            { name: "The Nigerian Port Authority", link: "stakeholders/npa" },
            { name: "National Inland Waterways Authority of Nigeria", link: "stakeholders/niwa" },
            { name: "Nigerian Maritime Administration and Safety Agency", link: "stakeholders/nimasa" },
            { name: "Nigerian Railway Corporation", link: "stakeholders/railway" },
            { name: "CBN", link: "stakeholders/cbn" },
            { name: "Others", link: "stakeholders/others" },
          ]
        },
        { name: "Seaport Terminal Operators", link: "stakeholders/seaport" },
        { name: "Shipping Lines/Agencies", link: "stakeholders/shipping" },
        { name: "Off Docks Terminal Operators", link: "stakeholders/off-docks" },
        { name: "Cargo Consolidators/The Consolidators", link: "stakeholders/consolidators" },
        { name: "Vessel Charterers/Owners", link: "stakeholders/vessel-owners" },
        { name: "Logistics Service Providers/Haulers", link: "stakeholders/logistics" },
        { name: "Freight Forwarders/Clearing Agents", link: "stakeholders/forwarders" },
        { name: "Inland Container Depot Operators", link: "stakeholders/icd" },
        { name: "Stevedoring Companies", link: "stakeholders/stevedoring" },
        { name: "Inland Dry Port", link: "stakeholders/dry-port" },
        { name: "Shippers", link: "stakeholders/shippers" },
        { name: "Airfreight", link: "stakeholders/airfreight" },
        { name: "Others", link: "stakeholders/others" },
      ],
    },
    {
      name: "Tanker Freight",
      link: "tanker-freight",
    },
    {
      name: "Tools",
      dropdown: [
        {
          name: "CRD Portal",
          link: "tools/crd",
          dropdown: [
            {
              name: "Freight Rate Confirmation",
              link: "tools/crd/freight-rate-confirmation",
            },
            {
              name: "Charter Party Confirmation",
              link: "tools/crd/charter-party-confirmation",
            },
            {
              name: "Demurrage Confirmation",
              link: "tools/crd/demurrage-confirmation",
            },
            {
              name: "Authorized Dealer Banks",
              link: "tools/crd/authorized-dealer-banks",
            },
          ],
        },
        {
          name: "DTRMS",
          link: "tools/dtrms",
          dropdown: [
            { name: "Tariff Review", link: "tools/dtrms/review" },
            { name: "Industry Tariff Booklet", link: "tools/dtrms/booklet" },
            { name: "Indicative Freight Rate", link: "tools/dtrms/indicative-freight-rate" },
          ],
        },
        {
          name: "National Single Window",
          link: "tools/nsw",
          dropdown: [
            { name: "Cargo Manifest", link: "tools/nsw/manifest" },
          ],
        },
        { name: "B'Odogwu", link: "tools/bodogwu" },
        { name: "Eto Call-Up System", link: "tools/eto" },
        { name: "PIMS", link: "tools/pims" },
        { name: "NIMASA C4I", link: "tools/nimasa" },
        { name: "PSSP", link: "tools/pssp" },
        { name: "Check Container", link: "tools/pssp" },
        { name: "Port Complex & Terminal", link: "tools/pssp" },
      ],
    },
    {
      name: "Cargo Statistics",
      link: "cargo-statistics",
    },
    {
      name: "Publications",
      link: "publications",
    },
    { 
      name: "Container Insurance",
      link: "home", 
    },
  ];

  export const portComplexData = {
    "Apapa Port Complex": {
      "Container Terminal": [
        { terminal: "TICT", status: "Submitted" },
        { terminal: "PCHS", status: "Submitted" },
        { terminal: "APMT", status: "Remind" },
      ],
      "RoRo Terminal": [
        { terminal: "Fivestar Logistics", status: "Submitted" },
      ],
      "Bulk Terminal": [
        { terminal: "Apapa Bulk Terminal", status: "Past Due" },
      ],
      "General Cargo Terminal": [
        { terminal: "ENL Consortium", status: "Submitted" },
      ],
    },
    "Tincan Island Port Complex": {
      "Container Terminal": [
        { terminal: "Port & Cargo", status: "Submitted" },
        { terminal: "Grimaldi Terminal", status: "Remind" },
      ],
      "RoRo Terminal": [
        { terminal: "Tincan RoRo Services", status: "Past Due" },
      ],
      "Bulk Terminal": [
        { terminal: "Dangote Bulk Terminal", status: "Submitted" },
      ],
      "General Cargo Terminal": [
        { terminal: "Julius Berger Terminal", status: "Remind" },
      ],
    },
    "Lekki Deep Sea Port Complex": {
      "Container Terminal": [
        { terminal: "Lekki Terminal", status: "Submitted" },
        { terminal: "DeepWater Container Services", status: "Past Due" },
      ],
      "RoRo Terminal": [
        { terminal: "Lekki RoRo Limited", status: "Submitted" },
      ],
      "Bulk Terminal": [
        { terminal: "Lekki Agro Bulk", status: "Remind" },
      ],
      "General Cargo Terminal": [
        { terminal: "Lekki General Logistics", status: "Submitted" },
      ],
    },
    "Calabar Port Complex": {
      "Container Terminal": [
        { terminal: "Calabar Container Depot", status: "Remind" },
      ],
      "RoRo Terminal": [
        { terminal: "Calabar Marine", status: "Submitted" },
      ],
      "Bulk Terminal": [
        { terminal: "Calabar Bulk Ltd", status: "Past Due" },
      ],
      "General Cargo Terminal": [
        { terminal: "Cross River Cargo", status: "Submitted" },
      ],
    },
    "Onne Port Complex": {
      "Container Terminal": [
        { terminal: "West Africa Container Terminal (WACT)", status: "Submitted" },
      ],
      "RoRo Terminal": [
        { terminal: "Onne RoRo Facility", status: "Submitted" },
      ],
      "Bulk Terminal": [
        { terminal: "Oil & Gas Bulk Terminal", status: "Remind" },
      ],
      "General Cargo Terminal": [
        { terminal: "Onne General Terminal", status: "Submitted" },
      ],
    },
    "Warri Port Complex": {
      "Container Terminal": [
        { terminal: "Warri Container Services", status: "Past Due" },
      ],
      "RoRo Terminal": [
        { terminal: "Delta RoRo", status: "Remind" },
      ],
      "Bulk Terminal": [
        { terminal: "Warri Bulk Handling", status: "Submitted" },
      ],
      "General Cargo Terminal": [
        { terminal: "Warri Logistics Ltd", status: "Submitted" },
      ],
    },
    "Delta Port Complex": {
      "Container Terminal": [
        { terminal: "Delta Container Hub", status: "Submitted" },
      ],
      "RoRo Terminal": [
        { terminal: "Burutu RoRo", status: "Past Due" },
      ],
      "Bulk Terminal": [
        { terminal: "Delta Agro Bulk", status: "Remind" },
      ],
      "General Cargo Terminal": [
        { terminal: "Delta Cargo Logistics", status: "Submitted" },
      ],
    },
  };

  export const portComplexes = [
  "Apapa Port Complex",
  "Tincan Island Port Complex",
  "Lekki Deep Sea Port Complex",
  "Calabar Port Complex",
  "Onne Port Complex",
  "Warri Port Complex",
  "Delta Port Complex",
];

export const stepFieldMap = [
  {
    label: "Service Type & Submission Date",
    keys: ["terminalType", "submissionMonth", "submissionYear"],
  },
  {
    label: "Personal Information",
    keys: ["reportingOfficer", "designation", "email", "phone"],
  },
  {
    label: "Cargo & Ship Traffic Throughput",
    keys: ["import", "export", "empty"],
  },
  {
    label: "Cargo & Ship Traffic KPIs",
    keys: [
      "vesselTurnaround",
      "cargoDwellTime",
      "berthOccupancy",
      "craneMovesPerHour",
      "overtimeCargo",
      "shipCalls",
    ],
  },
  {
    label: "Terminal Release Procedure",
    keys: ["profiledBoxes", "claimsReceived", "claimsResolved"],
  },
  {
    label: "Cargo Handling Equipment",
    keys: ["equipments"],
  },
  {
    label: "Cargo Delivery & Clearance",
    keys: [
      "truckTurnaround",
      "complaintsHandled",
      "complaintsType",
      "importsTruck",
      "importsBarge",
      "importsRail",
      "exportsTruck",
      "exportsBarge",
      "exportsRail",
      "returnedTruck",
      "returnedBarge",
      "returnedRail",
    ],
  },
  {
    label: "Cargo Examination & Information",
    keys: [
      "positioningTime",
      "avgContainersPositioned",
      "jointExam",
      "commencementOfExam",
      "inspectionAgencies",
      "closeOfExam",
      "timeAgenciesCoverage",
    ],
  },
  {
    label: "Vessel Rummaging",
    keys: [
      "busInOutHandling",
      "jointExamination",
      "timeDuration",
      "inspectionAgenciesForRummage",
    ],
  },
  {
    label: "Tariff",
    keys: [
      "terminalHandling",
      "documentationCharge",
      "positioningExamination",
      "weighbridgeCharge",
      "storageCharge",
      "otherCharges",
    ],
  },
  {
    label: "Tripartite Agreement Fulfilment",
    keys: [
      "terminalDevelopmentExecution",
      "agreedGMT",
      "complianceLevel",
      "digitalizedProcesses",
      "ictBackupSystem",
    ],
  },
  {
    label: "Challenges",
    keys: [
      "operationalChallenges",
      "invoicing",
      "payment",
      "receipting",
      "examsBooking",
      "obtainingTDO",
      "claims",
      "refunds",
    ],
  },
];


  