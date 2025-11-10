import React, { useState } from "react";
import patient from "../assets/patient.jpg";
import Subima from "../assets/subima.png";
import { Link } from "react-router-dom";
import Eye from "../components/Eye";
import PatientInfor from "../components/PatientInfor";
import FollowUp from "../components/FollowUp";
import Details from "../components/Details";

// Icons
import { FiRefreshCw } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const PatientInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

   // ✅ Navigation buttons
  const tabs = [
    { label: "Readings", path: "/Reading" },
    { label: "Examination", path: "/examinationDoc" },
    { label: "Case History", path: "/CaseHistory" },
    { label: "Draw", path: "/Draw" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-8xl mx-auto p-6 space-y-6">
    

    <PatientInfor/>

     {/* tab */}
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
       

        <Eye/>

          <Details/>



        <FollowUp/>

        {/* ✅ Buttons */}
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
