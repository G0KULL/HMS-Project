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

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-8xl mx-auto p-6 space-y-6">
    

    <PatientInfor/>

        {/* Navigation Buttons */}
        <div className="flex justify-start space-x-4">
          <Link
            to="/reading"
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Readings
          </Link>
          <Link
            to="/examinationDoc"
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Examination
          </Link>
          <Link
            to="/CaseHistory"
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Case History
          </Link>
          <Link
            to="/Draw"
            className="border px-8 py-2 rounded-full font-bold text-2xl hover:bg-[#F7DACD] hover:text-white transition"
          >
            Draw
          </Link>
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
