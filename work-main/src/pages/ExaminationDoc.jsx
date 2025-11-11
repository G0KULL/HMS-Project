import React, { useState, useEffect } from "react";
import Subima from "../assets/subima.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Eye from "../components/Eye";
// import PatientInfor from "../components/PatientInfor";
import FollowUp from "../components/FollowUp";
import Details from "../components/Details";
import { FiRefreshCw } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const PatientInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [doctorName, setDoctorName] = useState("-");
  const [latestOptometry, setLatestOptometry] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};

  const [detailsData, setDetailsData] = useState({});
const [followUpData, setFollowUpData] = useState({});


  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get required IDs
    // company_id comes from the appointment (patientData) - this is set when appointment is created
    // If appointment doesn't have it, try to get from optometry record
    const companyId = patientData?.company_id 
      ? parseInt(patientData.company_id) 
      : (latestOptometry?.company_id ? parseInt(latestOptometry.company_id) : null);
    
    // user_id is the logged in user from localStorage
    const userId = parseInt(localStorage.getItem("user_id") || "0");
    
    const doctorId = patientData?.doctor_id ? parseInt(patientData.doctor_id) : null;
    const optometryId = latestOptometry?.id ? parseInt(latestOptometry.id) : null;
    
    // Debug log
    console.log("Consultation Data - IDs:", {
      companyId,
      userId,
      doctorId,
      optometryId,
      appointmentCompanyId: patientData?.company_id,
      optometryCompanyId: latestOptometry?.company_id,
    });
    
    // Validate required fields
    if (!companyId) {
      alert("Missing company_id. Please ensure the appointment has a company_id. Appointment ID: " + patientData?.id);
      return;
    }
    
    if (!userId) {
      alert("Missing user_id. Please log in again.");
      return;
    }
    
    if (!doctorId) {
      alert("Doctor ID is required. Please select a doctor.");
      return;
    }
    
    if (!optometryId) {
      alert("Optometry record is required. Please complete the optometry reading first.");
      return;
    }
    
    // Validate followup_date
    if (!followUpData.date) {
      alert("Follow-up date is required.");
      return;
    }
    
    // Format diagnosis list (from API schema: List[DiagnosisItem])
    const diagnosisList = (detailsData.diagnosisList || []).map(item => ({
      condition: item.condition || "",
      eye: item.eye || "Both", // Should be "Right", "Left", or "Both"
    }));
    
    // Format procedure list (from API schema: List[ProcedureItem])
    const procedureList = (detailsData.procedureList || []).map(item => ({
      name: item.name || "",
      eye: item.eye || "Both", // Should be "Right", "Left", or "Both"
      remarks: item.remarks || null,
    }));
    
    // Format OT counselling list (from API schema: List[OtCounsellingItem])
    const otCounsellingList = (detailsData.otCounsellingList || []).map(item => ({
      procedure_name: item.procedure_name || "",
      eye: item.eye || "Both", // Should be "Right", "Left", or "Both"
      remarks: item.remarks || null,
      consent: item.consent || null,
    }));
    
    // collect data from child components
    const consultationData = {
      patient_id: parseInt(patientData?.patient_id || patientData?.id),
      appointment_id: parseInt(patientData?.id),
      doctor_id: doctorId,
      company_id: companyId,
      user_id: userId,
      optometry_id: optometryId,
      followup_date: followUpData.date, // Should be in YYYY-MM-DD format
      
      // Follow-up fields
      nextVisit: followUpData.nextVisit || null,
      usagePerDay: followUpData.usagePerDay || null,
      transferOutside: followUpData.transferOutside || false,
      outsideDetails: followUpData.outsideDetails || null,
      dilatation: followUpData.dilatation || false,
      rerefraction: followUpData.rerefraction || false,
      highRiskPatient: followUpData.highRiskPatient || false,
      fileClose: followUpData.fileClose || false,
      additionalRemarks: followUpData.additionalRemarks || null,
      highRiskRemarks: followUpData.highRiskRemarks || null,
      
      // Diagnosis Section
      diagnosis: diagnosisList,
      dia_comments_le: detailsData.diagnosisComments?.LE || null,
      dia_comments_re: detailsData.diagnosisComments?.RE || null,
      
      // Procedure Section
      procedure: procedureList,
      pro_comments_le: detailsData.procedureComments?.LE || null,
      pro_comments_re: detailsData.procedureComments?.RE || null,
      
      // OT Counselling
      ot_counsil: otCounsellingList,

       ...detailsData.medicineData, 
    };
  
    try {
      const res = await fetch(`${API_BASE}/consultations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(consultationData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.detail || "Failed to save consultation");
      }
  
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save consultation");
    }
  };
  

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        const appointment = navState.appointment;
        if (!appointment?.id) throw new Error("No appointment data found");

        // Fetch all optometry records
        const res = await fetch(`${API_BASE}/optometrys/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch optometry records");
        const allRecords = await res.json();

        // Filter by appointment ID
        const appointmentRecords = Array.isArray(allRecords)
          ? allRecords.filter((r) => r.appointment_id === appointment.id)
          : [];

        // Get latest record
        if (appointmentRecords.length > 0) {
          appointmentRecords.sort((a, b) => (b.id || 0) - (a.id || 0));
          setLatestOptometry(appointmentRecords[0]);
        }

        setPatientData(appointment);

        // Fetch doctor name
        if (appointment.doctor_id) {
          const doctorRes = await fetch(`${API_BASE}/doctors/${appointment.doctor_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (doctorRes.ok) {
            const doctorData = await doctorRes.json();
            setDoctorName(doctorData.full_name || doctorData.name || "-");
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [location.state, token]);

  if (loading)
    return (
      <div className="text-blue-600 font-semibold flex items-center justify-center gap-2 h-screen">
        Loading patient data... <FiRefreshCw className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 font-semibold flex items-center justify-center h-screen">
        Error: {error}
      </div>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-8xl mx-auto p-6 space-y-6">
        {/* ✅ Patient Info Header */}
        {patientData && (
          <div className="bg-[#F7DACD] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 font-medium text-2xl w-full md:w-2/3">
              <p>
                <span className="font-bold">Name:</span>{" "}
                {patientData.fullName || patientData.full_name || patientData.name || "-"}
              </p>
              <p>
                <span className="font-bold">Age:</span> {patientData.age || "-"} YEARS
              </p>
              <p>
                <span className="font-bold">Gender:</span> {patientData.gender || "-"}
              </p>
              <p>
                <span className="font-bold">MR Number:</span>{" "}
                {patientData.custom_id || patientData.id || "-"}
              </p>

              <p>
                <span className="font-bold">Visit Type:</span>{" "}
                {patientData.patient_type || "GENERAL CONSULTATION"}
              </p>
              <p>
                <span className="font-bold">Doctor:</span> {doctorName}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-start space-x-4">
          <Link
            to="/Reading"
            state={navState}
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Readings
          </Link>
          <Link
            to="/ExaminationDoc"
            state={navState}
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Examination
          </Link>
          <Link
            to="/CaseHistory"
            state={navState}
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Case History
          </Link>
          <Link
            to="/Draw"
            state={navState}
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Draw
          </Link>
        </div>

        {/* Eye Section */}
        <Eye data={latestOptometry} />

        {/* Details Section */}
        <Details onChange={(data) => setDetailsData(data)} />
        <FollowUp 
         onChange={(data) => setFollowUpData(data)} />



        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg"
          >
            RESET <FiRefreshCw className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            SUBMIT <FaCheckCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Popup message */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[900px]">
              <img
                src={Subima}
                alt="Success"
                className="w-[626px] h-[443px] mx-auto mb-4"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default PatientInfo;
