import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// WeeklyReport Component: Fetches and displays weekly sales records.
const WeeklyReport = () => {
  // State variables for storing weekly sales data, loading status, and error message.
  const [weeklyRecord, setWeeklyRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch weekly sales data when the component mounts.
  useEffect(() => {
    // Sending a GET request to the /api/weekly-records endpoint.
    const token = localStorage.getItem('token');
    Axios.get('http://localhost:5000/api/weekly-records', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Setting the weekly sales data in the state.
        setWeeklyRecord(response.data);
        // Setting the loading status to false.
        setLoading(false);
      })
      .catch(error => {
        // Logging the error to the console.
        console.error('There was an error fetching the weekly records!', error);
        // Setting the error message in the state.
        setError('Error fetching weekly records');
        // Setting the loading status to false.
        setLoading(false);
      });
  }, []);

  // If data is still loading, show a loading message.
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data, show the error message.
  if (error) {
    return <div>{error}</div>;
  }

  // Render the weekly sales report.
  return (
    <div>
      <h2>Weekly Sales Report</h2>
      <p><strong>Week Start:</strong> {weeklyRecord.week_start}</p>
      <p><strong>Week End:</strong> {weeklyRecord.week_end}</p>
      <p><strong>Total Sales:</strong> ${weeklyRecord.total_sales.toFixed(2)}</p>
    </div>
  );
};

export default WeeklyReport;

