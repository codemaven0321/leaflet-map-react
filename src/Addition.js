import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import server_url from './config';

function Addition() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [frontEndResult, setFrontEndResult] = useState(null);
  const [backEndResult, setBackEndResult] = useState(null);

  const handleAdd = async () => {
    handleAddFrontEnd(); // Perform front end calculation
    try {
      const response = await fetch(server_url + '/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number1: Number(number1), number2: Number(number2) }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Backend calculation failed');
      }

      const data = await response.json();
      setBackEndResult(data.result);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  const handleAddFrontEnd = () => {
    const result = Number(number1) + Number(number2);
    setFrontEndResult(result);
  };

  return (
    <div style={{paddingTop:"100px"}}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">
            Enter First Number:
          </label>
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" value={number1} onChange={(e) => setNumber1(e.target.value)} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">
            Enter Second Number:
          </label>
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" value={number2} onChange={(e) => setNumber2(e.target.value)} />
        </div>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAdd}>
          Submit
        </button>
      </div>
      { <h6 className="result mt-3">Your Addition result (from ReactJS) is: {frontEndResult !== null && frontEndResult}</h6>} 
      { <h6 className="result mt-3">Your Addition result (from Server) is: {backEndResult !== null &&  backEndResult}</h6>}
    </div>
  );
}

export default Addition;