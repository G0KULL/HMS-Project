import React, { useState } from "react";

const Instruciton = () => {
  const [selectedHeader, setSelectedHeader] = useState("Medicine"); // default selected
  const headers = ["Medicine", "Kit", "Special instruction"];

  const leftItems = [
    "AVOID DUST",
    "CONTROL OF DIABETES",
    "SHAKE WELL",
    "COTTON",
    "HOT FOMENTATION",
    "INJ 1",
    "BRING MEDICINE PRESCRIPTION IN NEXT VISIT",
    "DO NOT RUB EYES",
    "CAUTIONED ABOUT STEROIDS",
    "WARM FOMENTATION",
    "PET ANIMALS",
    "CHALAZION",
    "MORNING 10 OR EVENING 5",
  ];

  const rightItems = [
    "INJ2",
    "HOT FOMENTATION",
    "USE PROTECTION GLASSES",
    "MASSAGE",
    "PLANT",
    "ALLERGY",
    "MORNING 9",
    "ALLERGY ENG",
    "LID MASSAGE",
    "CONTINUE OTHER PRESCRIBED MEDICINES",
    "OINTMENT",
    "DUST",
    "COOL EYE MASK",
    "3 TIMES HALF TEASPOON",
    "COLD FOMENTATION",
  ];

  const [checkedLeft, setCheckedLeft] = useState({});
  const [checkedRight, setCheckedRight] = useState({});

  const toggleLeft = (index) => {
    setCheckedLeft((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleRight = (index) => {
    setCheckedRight((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">PRESCRIBE MEDICINE</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 w-full max-w-3xl">
        {headers.map((header) => (
          <div
            key={header}
            onClick={() => setSelectedHeader(header)}
            className={`flex-1 text-center px-4 py-2 cursor-pointer text-base md:text-xl font-semibold border rounded-full
              ${
                selectedHeader === header
                  ? "bg-[#6D94C5] text-white"
                  : "bg-white text-black"
              }
            `}
          >
            {header}
          </div>
        ))}
      </div>

      {/* Left & Right Columns */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-1/2 bg-[#CBDCEB] p-4 rounded-lg">
          {leftItems.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={checkedLeft[index] || false}
                onChange={() => toggleLeft(index)}
                className="mr-2 w-5 h-5 accent-green-600"
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 bg-[#CBDCEB] p-4 rounded-lg flex flex-col justify-between">
          <div>
            {rightItems.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={checkedRight[index] || false}
                  onChange={() => toggleRight(index)}
                  className="mr-2 w-5 h-5 accent-green-600"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600">
              Submit
            </button>
            <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruciton;
