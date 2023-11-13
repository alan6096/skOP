// DataEntry.js
import React, { useState } from 'react';

const DataEntry = ({ onSubmit, monthList }) => {
  const [formMonth, setFormMonth] = useState('');
  const [formMetricTon, setFormMetricTon] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      month: monthList.find(m => m.number === formMonth)?.label,
      metricTon: parseFloat(formMetricTon) || 0,
    });
    // Clear the form fields after submission
    setFormMonth('');
    setFormMetricTon('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="form-month">Month:</label>
      <select
        id="form-month"
        value={formMonth}
        onChange={(e) => setFormMonth(e.target.value)}
        required
      >
        <option value="">Select a month</option>
        {monthList.map((month) => (
          <option key={month.number} value={month.number}>{month.label}</option>
        ))}
      </select>
      <label htmlFor="metric-ton">Metric Ton (MT):</label>
      <input
        type="number"
        id="metric-ton"
        value={formMetricTon}
        onChange={(e) => setFormMetricTon(e.target.value)}
        required
      />
      <button type="submit">Submit Data</button>
    </form>
  );
};

export default DataEntry;
