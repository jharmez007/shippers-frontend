import { FaFileAlt, FaUser, FaChartBar, FaTachometerAlt, FaUniversity, FaGlobe, FaSlidersH, FaConnectdevelop, FaChartLine, FaExchangeAlt, FaInbox } from "react-icons/fa";
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
  { label: "Vessel Charterers/Owners", value: "vessel_charter" },
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
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/shipper-dashboard/dashboard' },
  // { name: 'Bank', icon: FaUniversity, path: '/shipper-dashboard/bank' },
  { name: 'Freight Rate Form', icon: FaFileAlt, path: '/shipper-dashboard/freight-rate-form' },
  { name: 'Freight Rate Request', icon: FaGlobe, path: '/shipper-dashboard/freight-rate-request' },
  // { name: 'Freight Analysis', icon: FaChartBar, path: '/shipper-dashboard/freight-analysis' },
];
  
export const ShipperAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/shipper-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/shipper-dashboard/settings' },
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
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/nsc-dashboard/dashboard' },
  { name: 'Freight Rate Request', icon: FaUniversity, path: '/nsc-dashboard/freight-rate-request' },
  { name: 'Charter Party Request', icon: FaFileAlt, path: '/nsc-dashboard/charter-party-request' },
  { name: 'Demurrage Request', icon: FaGlobe, path: '/nsc-dashboard/demurrage-request' },
];

export const nscAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/nsc-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/nsc-dashboard/settings' },
];

/* Streams Dashboard paths */
export const streamsMainLinks = [
  { name: 'All Submissions', icon: FaInbox, path: '/streams-dashboard/dashboard' },
  { name: 'Submit KPI', icon: FaChartLine, path: '/streams-dashboard/new-kpi-submission' },
  { name: 'Submit Throughput', icon: FaExchangeAlt, path: '/streams-dashboard/new-throughput-submission' },
];

export const streamsAccountLinks = [
  { name: 'My Profile', icon: FaUser, path: '/streams-dashboard/profile' },
  { name: 'Settings', icon: FaSlidersH, path: '/streams-dashboard/settings' },
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
  ];
  