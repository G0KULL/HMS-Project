import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function Pog({ data = {}, onChange }) {
  const odRows = ["Distant", "Near"];
  const osRows = ["Distant", "Near"];

  const initialState = {
    // OD fields
    od_Distant_sph: "",
    od_Distant_cyl: "",
    od_Distant_axis: "",
    od_Distant_pg: "",
    od_Near_sph: "",
    od_Near_cyl: "",
    od_Near_axis: "",
    od_Near_pg: "",

    // OS fields
    os_Distant_sph: "",
    os_Distant_cyl: "",
    os_Distant_axis: "",
    os_Distant_pg: "",
    os_Near_sph: "",
    os_Near_cyl: "",
    os_Near_axis: "",
    os_Near_pg: "",

    // Remarks + right inputs
    remarks: "",
    loadLastPG: "",
    clear: "",
    duration: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Load data from parent on mount/update
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({ ...initialState, ...data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (onChange) onChange(updated);
  };

  const handleReset = () => {
    setFormData(initialState);
    if (onChange) onChange(initialState);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      {/* Title + Reset Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-[#F7DACD] text-[#3E1E32] rounded-full px-6 py-2 inline-block shadow-sm">
          POG
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700"
        >
          <FiRefreshCw size={20} />
          Reset
        </button>
      </div>

      {/* Main content container */}
      <div className="bg-[#F7DACD] p-6 rounded-xl space-y-6 overflow-x-auto">
        {/* OD & OS Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OD Table */}
          <div className="w-full">
            <h3 className="bg-[#7E4363] ml-20 w-full sm:w-[485px] md:w-[570px] mx-auto h-[61px] text-3xl text-center font-bold py-2 rounded mb-2 text-white">
              OD
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-center min-w-[400px]">
                <thead>
                  <tr className="text-[20px] font-light">
                    <th className="w-[15%] text-left"></th>
                    <th className="w-[20%]">SPH</th>
                    <th className="w-[20%]">CYL</th>
                    <th className="w-[20%]">AXIS</th>
                    <th className="w-[25%]">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {odRows.map((row) => (
                    <tr key={row}>
                      <td className="text-left text-2xl p-3 font-semibold">{row}</td>
                      {["sph", "cyl", "axis", "pg"].map((field) => (
                        <td key={field} className="px-2">
                          <input
                            type="text"
                            name={`od_${row}_${field}`}
                            value={formData[`od_${row}_${field}`] || ""}
                            onChange={handleChange}
                            className="w-full h-[44px] p-2 rounded bg-white border border-gray-300 text-black focus:ring-2 focus:ring-[#7E4363] outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* OS Table */}
          <div className="w-full">
            <h3 className="bg-[#7E4363] w-full sm:w-[485px] md:w-[570px] mx-auto h-[61px] text-3xl text-center font-bold py-2 rounded mb-2 text-white">
              OS
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-center min-w-[400px]">
                <thead>
                  <tr className="text-[20px] font-light">
                    <th className="w-[15%] text-left"></th>
                    <th className="w-[20%]">SPH</th>
                    <th className="w-[20%]">CYL</th>
                    <th className="w-[20%]">AXIS</th>
                    <th className="w-[25%]">V/A With PG</th>
                  </tr>
                </thead>
                <tbody>
                  {osRows.map((row) => (
                    <tr key={row}>
                      <td className="text-left text-2xl p-3 font-semibold">{row}</td>
                      {["sph", "cyl", "axis", "pg"].map((field) => (
                        <td key={field} className="px-2">
                          <input
                            type="text"
                            name={`os_${row}_${field}`}
                            value={formData[`os_${row}_${field}`] || ""}
                            onChange={handleChange}
                            className="w-full h-[44px] p-2 rounded bg-white border border-gray-300 text-black focus:ring-2 focus:ring-[#7E4363] outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Remarks + Right Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-4 rounded-xl">
          {/* Remarks Box */}
          <div className="w-full md:w-3/4">
            <input
              type="text"
              name="remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full h-40 p-4 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#7E4363] outline-none"
            />
          </div>

          {/* Right-side fields */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {["loadLastPG", "clear", "duration"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#7E4363] outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
