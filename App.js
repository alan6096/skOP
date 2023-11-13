// App.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import DataEntry from './DataEntry'; // Make sure this file exists and is correct

const App = () => {
  const monthList = [
    { number: '01', label: 'January' },
    { number: '02', label: 'February' },
    { number: '03', label: 'March' },
    { number: '04', label: 'April' },
    { number: '05', label: 'May' },
    { number: '06', label: 'June' },
    { number: '07', label: 'July' },
    { number: '08', label: 'August' },
    { number: '09', label: 'September' },
    { number: '10', label: 'October' },
    { number: '11', label: 'November' },
    { number: '12', label: 'December' },
  ];
  const [metricTons, setMetricTons] = useState({
    January: 20,
    February: 10,
    March: 30,
    April: 15,
    May: 25,
    June: 10,
    July: 35,
    August: 45,
    September: 10,
    October: 20,
    November: 5,
    December: 15,
  });

  const [showForm, setShowForm] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  // Function to sort jsonData array by month number
  const sortDataByMonth = (data) => {
    return data.map(entry => ({
      ...entry,
      monthNumber: monthList.find(month => month.label === entry.month)?.number || '00',
    })).sort((a, b) => a.monthNumber.localeCompare(b.monthNumber));
  };

  // Function to load JSON data from localStorage and update the chart
  const loadJsonData = () => {
    const loadedData = localStorage.getItem('data');
    if (loadedData) {
      let parsedData = JSON.parse(loadedData);
      // Sort by month number
      parsedData = sortDataByMonth(parsedData);
      // Update the jsonData state with sorted data
      setJsonData(parsedData);
      // Update the metricTons state to refresh the bar chart
      const updatedMetricTons = parsedData.reduce((acc, dataEntry) => {
        acc[dataEntry.month] = dataEntry.metricTon;
        return acc;
      }, {});
      setMetricTons(updatedMetricTons);
    }
  };

  // Function to clear JSON data from the display
  const clearJsonData = () => {
    setJsonData([]);
    // Optionally clear the localStorage as well if needed
    // localStorage.removeItem('data');
  };

  // Handle the submission of data from the DataEntry component
  const handleDataSubmit = (data) => {
    let newJsonData = sortDataByMonth([...jsonData, data]);
    setJsonData(newJsonData);
    localStorage.setItem('data', JSON.stringify(newJsonData));
    const updatedMetricTons = newJsonData.reduce((acc, dataEntry) => {
      acc[dataEntry.month] = dataEntry.metricTon;
      return acc;
    }, {});
    setMetricTons(updatedMetricTons);
    setShowForm(false);
  };

  // Handle the click to show the data entry form
  const handleAddDataClick = () => {
    setShowForm(true);
  };

  // Chart data for react-chartjs-2
  const dataChart = {
    labels: Object.keys(metricTons),
    datasets: [
      {
        label: 'Metric Tons',
        data: Object.values(metricTons),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <button onClick={handleAddDataClick}>Add Data</button>
      <button onClick={loadJsonData}>Load JSON</button>
      <button onClick={clearJsonData}>Clear</button>
      {showForm && (
        <DataEntry onSubmit={handleDataSubmit} monthList={monthList} />
      )}
      <Bar data={dataChart} />
      <div>
        <h3>Submitted Data:</h3>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
