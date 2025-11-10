import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const Eye = ({ data = {}, onChange }) => {
  const testRows = [
    { label: "PUPIL", od: "pupil_od", os: "pupil_os" },
    { label: "CR", od: "cr_od", os: "cr_os" },
    { label: "COVER TEST", od: "cover_od", os: "cover_os" },
    { label: "OM", od: "om_od", os: "om_os" },
    { label: "CONFRONTATION", od: "confrontation_od", os: "confrontation_os" },
    { label: "CONVERGENCE", od: "covergence_od", os: "covergence_os" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleReset = () => {
    const emptyData = {};
    testRows.forEach(row => {
      emptyData[row.od] = "";
      emptyData[row.os] = "";
    });
    ["pmt", "duochrome", "dialated", "wfdt"].forEach(field => (emptyData[field] = ""));
    onChange(emptyData);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto relative">
      {/* Header + Reset */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="px-6 py-2 bg-[#F7DACD] rounded-full text-2xl md:text-3xl font-bold">
          EYE EXAM
        </h1>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md"
        >
          <FiRefreshCw size={18} /> Reset
        </button>
      </div>

      {/* OD/OS Table */}
      <div className="overflow-x-auto bg-[#F7DACD] p-6 rounded-xl shadow-md">
        <table className="w-full border-collapse text-center min-w-[600px]">
          <thead>
            <tr>
              <th className="px-3 py-2 bg-[#7E4363] text-white rounded-l-md">Test</th>
              <th className="px-3 py-2 bg-[#7E4363] text-white">OD</th>
              <th className="px-3 py-2 bg-[#7E4363] text-white rounded-r-md">OS</th>
            </tr>
          </thead>
          <tbody>
            {testRows.map((row) => (
              <tr key={row.label} className="border-b border-gray-300">
                <td className="px-3 py-2 font-semibold bg-[#F7DACD]">{row.label}</td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    name={row.od}
                    value={data[row.od] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    name={row.os}
                    value={data[row.os] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lower Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["pmt", "dialated"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="font-semibold">{field.replace("_", " ")}:</label>
            <input
              type="text"
              name={field}
              value={data[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>
        ))}

        {["duochrome", "wfdt"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="font-semibold">{field.replace("_", " ")}:</label>
            <input
              type="text"
              name={field}
              value={data[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eye;
