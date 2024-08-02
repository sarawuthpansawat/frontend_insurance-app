import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [partnerCode, setPartnerCode] = useState('');
  const [year, setYear] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [results, setResults] = useState([]);
  // const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAllPolicies = async () => {
      try {
        //const response = await axios.get('http://localhost:5000/api/policies');
        const response = await axios.get('https://backend-thai-life-api.onrender.com/api/policies');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching all policies', error);
      }
    };

    fetchAllPolicies();
  }, []);

  const handleSearch = async () => {
    try {
      const params = {};
      if (partnerCode) params.partnerCode = partnerCode;
      if (year) params.year = year;
      if (minAmount) params.minAmount = minAmount;
      if (maxAmount) params.maxAmount = maxAmount;
      
      //const response = await axios.get('http://localhost:5000/api/policies', { params });
      const response = await axios.get('https://backend-thai-life-api.onrender.com/api/policies', { params });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleFileUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     await axios.post('http://localhost:5000/api/import', formData, {
  //       //await axios.post('https://backend-thai-life-api.onrender.com/api/import', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     alert('File uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading file', error);
  //   }
  // };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="container">
      <h1>Insurance Policy Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Partner Code"
          value={partnerCode}
          onChange={(e) => setPartnerCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Policy ID</th>
            <th>Partner Code</th>
            <th>Plan Code</th>
            <th>Temp Policy No</th>
            <th>Mode</th>
            <th>Pay Period</th>
            <th>Policy Status Date</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result._id}</td>
              <td>{result.partner_code}</td>
              <td>{result.plan_code}</td>
              <td>{result.temp_policy_no}</td>
              <td>{result.mode}</td>
              <td>{result.pay_period}</td>
              <td>{formatDate(result.policy_status_date)}</td>
              <td>{result.sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <h2>Import Data</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button> */}
    </div>
  );
}

export default App;
