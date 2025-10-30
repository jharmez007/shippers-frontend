import { useLocation } from "react-router-dom";
// import { Download, Filter, Plus, Trash2 } from "lucide-react";

/* <Button variant="ghost" className="flex gap-1 text-muted-foreground"><Trash2 size={16} />Delete</Button>
<Button variant="ghost" className="flex gap-1 text-muted-foreground"><Filter size={16} />Filters</Button>
<Button variant="ghost" className="flex gap-1 text-muted-foreground"><Download size={16} />Export</Button>
<Button className="flex gap-1"><Plus size={16} />Add new CTA</Button> */




const freightData = [
  {
    period: "January-March 2023",
    amountRequested: "7,259,771,961",
    amountConfirmed: "5,446,559,850",
    savings: "1,813,212,111",
  },
  {
    period: "April-June 2023",
    amountRequested: "6,071,130,880",
    amountConfirmed: "4,708,461,032",
    savings: "1,362,669,848",
  },
  {
    period: "July-September 2023",
    amountRequested: "12,413,493,711",
    amountConfirmed: "10,604,098,433",
    savings: "1,809,395,278",
  },
  {
    period: "October - Dec. 2023",
    amountRequested: "7,290,673,512.48",
    amountConfirmed: "5,849,327,576.85",
    savings: "1,781,175,598",
  },
  {
    period: "January - May, 2024",
    amountRequested: "42,659,192,546.11",
    amountConfirmed: "17,976,314,882",
    savings: "24,682,877,664.11",
  }
];

const FreightFeeTable = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("freight-rate-request")) return "Freight Rate Fees";
    if (path.includes("charter-party-request")) return "Charter Party Rate Fees";
    if (path.includes("demurrage-request")) return "Demurrage Fees";
    return "Rate Fees";
  };

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Value of Confirmation of Reasonableness of {getTitle()}</h2>
            <p style={{ fontSize: "14px", color: "#888" }}>From January 2023 to May 2024</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={buttonStyle}>Delete</button>
            <button style={buttonStyle}>Filters</button>
            <button style={buttonStyle}>Export</button>
            <button style={{ ...buttonStyle, backgroundColor: "#1d4ed8", color: "#fff" }}>Add new CTA</button>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead style={{ backgroundColor: "#f9fafb" }}>
            <tr>
              <th style={thStyle}>S/N</th>
              <th style={thStyle}>Period</th>
              <th style={thStyle}>Amount Requested (₦)</th>
              <th style={thStyle}>Amount Confirmed (₦)</th>
              <th style={thStyle}>Column heading</th>
            </tr>
          </thead>
          <tbody>
            {freightData.map((row, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{row.period}</td>
                <td style={tdStyle}>{row.amountRequested}</td>
                <td style={tdStyle}>{row.amountConfirmed}</td>
                <td style={tdStyle}>{row.savings}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
              <td style={tdStyle} colSpan={2}>Sub-Total (₦)</td>
              <td style={tdStyle}>75,694,262,610.59</td>
              <td style={tdStyle}>44,584,761,773.85</td>
              <td style={tdStyle}>31,449,330,499.11</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "20px", background: "#f1f5f9", padding: "16px", borderRadius: "12px", color: "#555", fontSize: "14px" }}>
          <strong>Summary:</strong> The Sum of ₦31,449,330,499.11 (Thirty One Billion, Four Hundred and Forty Nine Million, Three Hundred and Thirty Thousand, Four Hundred and Ninety Nine Naira, Eleven Kobo) was saved on confirmation of reasonableness of demurrage fees from January, 2023 to May, 2024. GTB, ZENITH & UBA Banks requested on behalf of MEARSK, PIL & ONE within the period under review.
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  background: "#fff",
  cursor: "pointer"
};

const thStyle = {
  textAlign: "left",
  padding: "12px 8px",
  fontWeight: 600,
  borderBottom: "2px solid #e5e7eb"
};

const tdStyle = {
  padding: "12px 8px",
  verticalAlign: "top"
};

export default FreightFeeTable;
