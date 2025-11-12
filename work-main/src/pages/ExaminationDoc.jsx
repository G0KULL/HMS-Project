import React, { useState, useEffect, useCallback } from "react";
import Subima from "../assets/subima.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Eye from "../components/Eye";
import FollowUp from "../components/FollowUp";
import Details from "../components/Details";
import { FiRefreshCw } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const PatientInfo = () => {
  // 🔹 State hooks (must always be at top)
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [doctorName, setDoctorName] = useState("-");
  const [latestOptometry, setLatestOptometry] = useState(null);
  const [consultationId, setConsultationId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [detailsData, setDetailsData] = useState({});
  const [followUpData, setFollowUpData] = useState({});

  // 🔹 Router & API setup
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  // Check if consultation already exists for this appointment
  const checkExistingConsultation = async (appointmentId) => {
    try {
      const res = await fetch(`${API_BASE}/consultations/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) return null;
      
      const consultations = await res.json();
      const existing = Array.isArray(consultations)
        ? consultations.find((c) => c.appointment_id === appointmentId)
        : null;
      
      return existing;
    } catch (err) {
      console.error("Error checking consultation:", err);
      return null;
    }
  };


   const tabs = [
    { label: "Readings", path: "/Reading" },
    { label: "Examination", path: "/ExaminationDoc" },
    { label: "Case History", path: "/CaseHistory" },
    { label: "Draw", path: "/Draw" },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-8xl mx-auto p-6 space-y-6">
        {/* Patient Info Header */}
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
              {consultationId && (
                <p className="text-green-600">
                  <span className="font-bold">Consultation ID:</span> {consultationId}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-start space-x-4 flex-wrap gap-2">
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

        {/* Data Sections */}
        <Eye data={latestOptometry} />

        {/* Details Section */}
        <Details onChange={(data) => setDetailsData(data)} />
        
        {/* Follow Up Section */}
        <FollowUp onChange={(data) => setFollowUpData(data)} />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            RESET <FiRefreshCw className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FiRefreshCw className="w-5 h-5 animate-spin" />
                {consultationId ? "UPDATING..." : "SUBMITTING..."}
              </>
            ) : (
              <>
                {consultationId ? "UPDATE" : "SUBMIT"} <FaCheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Success Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-[900px]">
              <img
                src={Subima}
                alt="Success"
                className="w-full max-w-[626px] h-auto mx-auto mb-4"
              />
              <p className="text-xl font-semibold text-green-600 mt-4">
                {consultationId ? "✅ Consultation Updated Successfully!" : "✅ Consultation Created Successfully!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default PatientInfo;