import React, { useState, useEffect } from "react";
import axios from "axios";

const CarForm = ({ formValues, handleChange, handleFuelConsumption }) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");

  useEffect(
    () => {
      const fetchYears = async () => {
        const response = await axios.get("http://127.0.0.1:5000/years");
        setYears(response.data);
      };

      fetchYears();
      console.log(selectedYear);
    },
    [],
    [selectedYear]
  );

  // Fetch makes whenever selectedYear changes
  useEffect(() => {
    console.log(selectedYear);

    const fetchMakes = async () => {
      try {
        console.log(selectedYear);
        const response = await axios.post("http://127.0.0.1:5000/makes", {
          year: selectedYear,
        });
        console.log(response.data);
        setMakes(response.data); // Assuming setMakes updates the dropdown options
      } catch (error) {
        console.error("Error fetching makes", error);
      }
    };
    fetchMakes();
  }, [selectedYear]);

  return (
    <form
      onSubmit={handleFuelConsumption}
      className="bg-white mb-14 w-96 p-6 px-10 rounded-lg shadow-lg mx-auto space-y-4"
    >
      <h3 className="mb-7">Enter your vehicle details</h3>
      <div className="flex justify-between">
        <label className="formLabel" htmlFor="year">
          Year:{" "}
        </label>
        {/* Year Dropdown */}

        <div>
          <select
            id="year"
            className="carFormInput"
            type="number"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              handleChange(e);
            }}
          >
            <option value=""></option>
            {years.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* <input
          className="carFormInput shadow ml-4"
          type="number"
          id="year"
          value={formValues.year || ""}
          onChange={handleChange}
        /> */}
      </div>
      {selectedYear && (
        <div className="flex justify-between">
          <label className="formLabel" htmlFor="make">
            Make:{" "}
          </label>
          {/* Make Dropdown */}

          <div>
            <select
              id="make"
              className="carFormInput"
              type="text"
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
                handleChange(e);
              }}
            >
              <option value=""></option>
              {makes.map((make, idx) => (
                <option key={idx} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          {/* <input
          className="carFormInput shadow ml-4"
          type="text"
          id="make"
          value={formValues.make || ""}
          onChange={handleChange}
        /> */}
        </div>
      )}

      <div className="flex justify-between">
        <label className="formLabel" htmlFor="flex justify-start model">
          Model:{" "}
        </label>
        <input
          className="flex justify-end carFormInput shadow ml-2"
          type="text"
          id="model"
          value={formValues.model || ""}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="px-3 p-1 shadow-md hover:bg-sky-600/40 bg-sky-600/50 font-medium submit-btn"
      >
        Next
      </button>
    </form>
  );
};

export default CarForm;
