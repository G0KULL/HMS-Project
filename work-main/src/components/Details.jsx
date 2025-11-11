import React, { useState, useEffect } from "react";
import Diagnosis from "./Diagnosis"; // Ensure correct path
import Procedure from "./Procedure"; // Ensure correct path
import OTCounselling from "./OtCounselling"; // Ensure correct path
// import Treatment from "./Treatment"; 
import PrescribeMedi from "../components/PrescribeMedi";

const Details = ({ onChange }) => {
  const [openModal, setOpenModal] = useState(null);
  const [medicineData, setMedicineData] = useState({
  category: "",
  itemName: "",
  dosage: "",
  frequency: "",
  duration: "",
  route: "",
  quantity: "",
  start_date: "",
  end_date: "",
  kit: "",
  instruction: "",
});

  
  // Store data from child components
  const [diagnosisData, setDiagnosisData] = useState({
    diagnosisList: [], // List of {condition, eye}
    doctorComments: { LE: "", RE: "" },
  });
  
  const [procedureData, setProcedureData] = useState({
    procedureList: [], // List of {name, eye, remarks?, amount?}
    doctorComments: { LE: "", RE: "" },
  });
  
  const [otCounsellingData, setOtCounsellingData] = useState({
    otCounsellingList: [], // List of {procedure_name, eye, remarks?, consent?}
  });

  // Combine all data and notify parent
  useEffect(() => {
    if (onChange) {
      const combinedData = {
        diagnosisList: diagnosisData.diagnosisList || [],
        diagnosisComments: diagnosisData.doctorComments || { LE: "", RE: "" },
        procedureList: procedureData.procedureList || [],
        procedureComments: procedureData.doctorComments || { LE: "", RE: "" },
        otCounsellingList: otCounsellingData.otCounsellingList || [],
        medicineData: medicineData,
      };
      onChange(combinedData);
    }
  }, [diagnosisData, procedureData, otCounsellingData,medicineData, onChange]);

  return (
    <div className="p-6 space-y-12">
      {/* ================= DIAGNOSIS ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-3">DIAGNOSIS</h1>
        <div
          className="bg-[#F7DACD] rounded-lg shadow p-6 cursor-pointer"
          onClick={() => setOpenModal("diagnosis")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:h-[200px] gap-6">
            <div>
              <h2 className="text-[32px]">Diagnosis</h2>
              <input 
                type="text" 
                value={diagnosisData.diagnosisList?.map(d => d.condition).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
            <div>
              <h2 className="text-[32px]">Selected Eye</h2>
              <input 
                type="text" 
                value={diagnosisData.diagnosisList?.map(d => d.eye).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= PROCEDURE ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-3">PROCEDURE</h1>
        <div
          className="bg-[#F7DACD] rounded-lg shadow p-6 cursor-pointer"
          onClick={() => setOpenModal("procedure")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 md:h-[200px] gap-6">
            <div>
              <h2 className="text-[32px]">Procedure</h2>
              <input 
                type="text" 
                value={procedureData.procedureList?.map(p => p.name).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
            <div>
              <h2 className="text-[32px]">Amount</h2>
              <input 
                type="text" 
                value={procedureData.procedureList?.map(p => p.amount || "").filter(Boolean).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
            <div>
              <h2 className="text-[32px]">Eye</h2>
              <input 
                type="text" 
                value={procedureData.procedureList?.map(p => p.eye).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= OT COUNSELLING ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-3">OT COUNSELLING</h1>
        <div
          className="bg-[#F7DACD] rounded-lg shadow p-6 cursor-pointer"
          onClick={() => setOpenModal("ot")}
        >
          <div className="grid grid-cols-1 md:h-[200px]  md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-[32px]">Surgery Name</h2>
              <input 
                type="text" 
                value={otCounsellingData.otCounsellingList?.map(o => o.procedure_name).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
            <div>
              <h2 className="text-[32px]">Selected Eye</h2>
              <input 
                type="text" 
                value={otCounsellingData.otCounsellingList?.map(o => o.eye).join(", ") || ""} 
                readOnly
                className="w-full bg-white rounded-full px-3 py-6 mt-1" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= TREATMENT ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-3">TREATMENT</h1>
        <div
          className="bg-[#F7DACD] rounded-lg shadow p-6 cursor-pointer"
          onClick={() => setOpenModal("treatment")}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 md:h-[200px] gap-6">
            <div>
              <h2 className="text-[32px]">Medicine</h2>
              <input type="text" className="w-full bg-white rounded-full px-3 py-6 mt-1" />
            </div>
            <div>
              <h2 className="text-[32px]">Dosage</h2>
              <input type="text" className="w-full bg-white rounded-full px-3 py-6 mt-1" />
            </div>
            <div>
              <h2 className="text-[32px]">Duration</h2>
              <input type="text" className="w-full bg-white rounded-full px-3 py-6 mt-1" />
            </div>
            <div>
              <h2 className="text-[32px]">Route</h2>
              <input type="text" className="w-full bg-white rounded-full px-3 py-6 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= POPUPS ================= */}
      {openModal === "diagnosis" && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20">
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-200/30" onClick={() => setOpenModal(null)} />
          <div className="relative z-10 w-11/12 max-w-7xl">
            <Diagnosis 
              onClose={() => setOpenModal(null)} 
              onDataChange={(data) => setDiagnosisData(data)}
            />
          </div>
        </div>
      )}

      {openModal === "procedure" && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20">
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-200/30" onClick={() => setOpenModal(null)} />
          <div className="relative z-10 w-11/12 max-w-7xl">
            <Procedure 
              onClose={() => setOpenModal(null)} 
              onDataChange={(data) => setProcedureData(data)}
            />
          </div>
        </div>
      )}

      {openModal === "ot" && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20">
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-200/30" onClick={() => setOpenModal(null)} />
          <div className="relative z-10 w-11/12 max-w-7xl">
            <OTCounselling 
              onClose={() => setOpenModal(null)} 
              onDataChange={(data) => setOtCounsellingData(data)}
            />
          </div>
        </div>
      )}

      {openModal === "treatment" && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20">
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-200/30" onClick={() => setOpenModal(null)} />
          <div className="relative z-10 w-11/12 max-w-7xl">
            <PrescribeMedi 
            onClose={() => setOpenModal(null)}
            onDataChange={(data) => setMedicineData(data)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
