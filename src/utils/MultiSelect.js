import React, { useState, useEffect } from "react";
import { Select, MenuItem, Button } from "@mui/material/";

function DynamicMultiSelect({ getSelectedNote }) {
  const [options, setOptions] = useState([
    { value: "option1", label: "Option 1" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [notes, setNotes] = useState(null);

  const handleOptionChange = (event) => {
    const selectedValues = event.target.value;
    setSelectedOptions(selectedValues);
    getSelectedNote(selectedValues);
  };

  useEffect(() => {
    const getBalance = localStorage.getItem("balance");
    if (getBalance) {
      const parseData = JSON.parse(getBalance);
      const selectOption = parseData?.map((data, index) => {
        return {
          value: JSON.stringify(data),
          label: data?.value,
        };
      });
      setOptions(selectOption);
    }
  }, []);

  return (
    <div>
      <h2>Select Currency</h2>
      <Select
        multiple
        value={selectedOptions}
        onChange={handleOptionChange}
        style={{ width: "100%" }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default DynamicMultiSelect;
