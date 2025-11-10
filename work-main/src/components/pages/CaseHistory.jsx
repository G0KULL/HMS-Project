import React, { useState } from "react";
import { Upload, Plus, Trash2, Save } from "lucide-react";
import PatientInfor from "../PatientInfor";
import { useNavigate } from "react-router-dom";

// 🔹 Subcomponent for Previous Visit Card
function PreviousVisitCard({ visit, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#F7DACD] rounded-2xl shadow-md border border-gray-300 overflow-hidden transition-all">
      {/* Header (summary) */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#f5cdb9] transition"
      >
        <div>
          <h4 className="font-semibold text-lg text-gray-800">
            {visit.date
              ? new Date(visit.date).toLocaleDateString()
              : "Unknown Date"}
          </h4>
          <p className="text-sm text-gray-600">
            Doctor: <span className="font-medium">{visit.doctor || "N/A"}</span>
          </p>
        </div>

        <button className="text-gray-700 font-semibold flex items-center gap-1">
          {open ? "Hide Details ▲" : "Show Details ▼"}
        </button>
      </div>

      {/* Expanded content */}
      {open && (
        <div className="px-6 pb-4 space-y-3 animate-fadeIn">
          <div className="border-t border-gray-300 my-2"></div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Diagnosis:
              </label>
              <p className="bg-white p-2 rounded-md border mt-1 text-gray-800">
                {visit.diagnosis || "Not specified"}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Treatment:
              </label>
              <p className="bg-white p-2 rounded-md border mt-1 text-gray-800">
                {visit.treatment || "Not specified"}
              </p>
            </div>
          </div>

          {/* Documents */}
          {visit.visitDocs && visit.visitDocs.length > 0 && (
            <div className="mt-3">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">
                Documents:
              </label>
              <div className="flex flex-wrap gap-2">
                {visit.visitDocs.map((doc, di) => (
                  <div
                    key={di}
                    className="bg-white border rounded-lg px-3 py-2 text-sm shadow-sm flex items-center gap-2"
                  >
                    <Upload size={14} className="text-gray-600" />
                    {doc.file ? (
                      <a
                        href={URL.createObjectURL(doc.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline"
                      >
                        {doc.description || doc.file.name}
                      </a>
                    ) : (
                      <span className="text-gray-600 italic">
                        {doc.description || "No file uploaded"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 🔹 Main Component
export default function CaseHistory({ onClose }) {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([
    { complaint: "", duration: "" },
  ]);
  const [caseHistory, setCaseHistory] = useState("");
  const [allergies, setAllergies] = useState("");

  // 👁️ Default Previous Visits
  const [previousVisits] = useState([
    {
      date: "2025-10-20",
      doctor: "Dr. Anjali Menon",
      diagnosis: "Cataract - Right Eye",
      treatment: "Phacoemulsification with IOL",
      visitDocs: [{ file: null, description: "Pre-op Report.pdf" }],
    },
    {
      date: "2025-09-10",
      doctor: "Dr. Kiran Raj",
      diagnosis: "Dry Eye Syndrome",
      treatment: "Artificial Tears",
      visitDocs: [{ file: null, description: "Tear Film Test Result" }],
    },
  ]);

  // --- Complaint & Document Functions ---

  const removeComplaint = (index) =>
    setComplaints(complaints.filter((_, i) => i !== index));

  const handleSave = () => {
    const payload = { complaints, caseHistory, allergies, previousVisits };
    console.log("Case History Saved:", payload);
    if (onClose) onClose();
  };

  // ✅ Navigation buttons
  const tabs = [
    { label: "Readings", path: "/Reading" },
    { label: "Examination", path: "/ExaminationDoc" },
    { label: "Case History", path: "/CaseHistory" },
    { label: "Draw", path: "/Draw" },
  ];

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <PatientInfor />

      {/* ✅ Navigation Buttons */}
      <div className="flex gap-4 justify-start mt-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => navigate(tab.path)}
            className={`px-6 py-2 rounded-full font-medium shadow-md ${
              window.location.pathname === tab.path
                ? "bg-[#F7DACD]"
                : "border border-gray-800 hover:bg-[#f4c4b2]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Case History Form */}
      <div className="p-6 bg-[#F7DACD] rounded-2xl shadow-md space-y-6 mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Case History
        </h2>

        {/* Chief Complaints */}
        <div>
          <h3 className="text-lg font-semibold mb-2"> Complaints</h3>
          {complaints.map((c, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <textarea
                rows={6}
                value={caseHistory}
                onChange={(e) => setCaseHistory(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
              {i > 0 && (
                <button
                  onClick={() => removeComplaint(i)}
                  className="text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Case History Textarea */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Case History</h3>
          <textarea
            rows={6}
            value={caseHistory}
            onChange={(e) => setCaseHistory(e.target.value)}
            placeholder="Enter detailed case history (onset, progression, previous treatments, etc.)"
            className="w-full border rounded-lg p-3"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Allergies</h3>
          <textarea
            rows={6}
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Enter allergies "
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Save Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-green-600 text-white flex items-center hover:bg-green-700"
          >
            <Save size={18} className="mr-2" /> Save Case History
          </button>
        </div>
      </div>

      {/* Previous Visits Section */}
      <div className="max-w-8xl mx-auto mt-10 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Previous Visits
        </h3>
        {previousVisits.map((visit, index) => (
          <PreviousVisitCard key={index} visit={visit} index={index} />
        ))}
      </div>
    </div>
  );
}
