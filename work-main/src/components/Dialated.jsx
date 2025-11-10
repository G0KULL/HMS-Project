import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";

const Dialated = ({ data, onChange }) => {
  // Controlled input using parent data
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value }); // update parent
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    try {
      // Flattened payload
      const payload = {
        appointment_id: appointmentId, // include if required
        ...formData, // dia_od & dia_os directly
      };

      const response = await axios.post("/api/exam", payload);
      console.log("Saved successfully:", response.data);
      alert("Dilated data saved!");
    } catch (error) {
      console.error("Error saving dilated data:", error);
      alert("Failed to save data");
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      {/* Header + Reset */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-[#F7DACD] px-4 py-2 rounded-full">
          DILATED ACCEPTANCE
        </h1>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          <FiRefreshCw size={20} />
          Reset
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 bg-[#F7DACD] p-10 rounded-lg">
      {/* OD */}
      <div className="flex flex-col gap-2">
        <div className="bg-[#7E4363] text-white text-center font-bold py-2 rounded">
          OD
        </div>
        <input
          type="text"
          name="dia_od"
          value={data?.dia_od || ""} // controlled
          onChange={handleChange}
          placeholder="Enter OD"
          className="h-[59px] px-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#7E4363] outline-none"
        />
      </div>

      {/* OS */}
      <div className="flex flex-col gap-2">
        <div className="bg-[#7E4363] text-white text-center font-bold py-2 rounded">
          OS
        </div>
        <input
          type="text"
          name="dia_os"
          value={data?.dia_os || ""} // controlled
          onChange={handleChange}
          placeholder="Enter OS"
          className="h-[59px] px-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#7E4363] outline-none"
        />
      </div>
    </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-[#7E4363] text-white rounded-lg hover:bg-[#63304c] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Dialated;
