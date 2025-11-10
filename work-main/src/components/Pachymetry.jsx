import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const Pachymetry = ({ data = {}, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleReset = () => {
    onChange({
      pachy_od: "",
      pachy_odiop: "",
      pachy_os: "",
      pachy_osiop: "",
    });
  };

  return (
    <div className="relative max-w-8xl mx-auto p-6 space-y-8">
      {/* Title + Reset Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="px-6 py-2 bg-[#F7DACD] text-2xl md:text-3xl rounded-full font-bold">
          PACHYMETRY
        </h1>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 top-6 right-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <FiRefreshCw size={20} />
          Reset
        </button>
      </div>

      {/* OD & OS Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F7DACD] rounded-xl p-6">
        {/* OD Section */}
        <div>
          <h2 className="text-xl font-bold text-center bg-[#7E4363] text-white py-2 rounded-md mb-4">
            OD
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              name="pachy_od"
              value={data?.pachy_od || ""}
              onChange={handleChange}
              placeholder="Enter Value"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-24 text-lg font-semibold">IOP</label>
            <input
              type="text"
              name="pachy_odiop"
              value={data?.pachy_odiop || ""}
              onChange={handleChange}
              placeholder="Enter IOP"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>
        </div>

        {/* OS Section */}
        <div>
          <h2 className="text-xl font-bold text-center bg-[#7E4363] text-white py-2 rounded-md mb-4">
            OS
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              name="pachy_os"
              value={data?.pachy_os || ""}
              onChange={handleChange}
              placeholder="Enter Value"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-24 text-lg font-semibold">IOP</label>
            <input
              type="text"
              name="pachy_osiop"
              value={data?.pachy_osiop || ""}
              onChange={handleChange}
              placeholder="Enter IOP"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pachymetry;
