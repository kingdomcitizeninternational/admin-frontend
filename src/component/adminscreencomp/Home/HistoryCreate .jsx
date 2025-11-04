import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AdminHistoryCreateComponent = ({ updateHandler }) => {
  const [isData, setIsData] = useState({
    status: 'Pending',
    UploadedBy: 'Admin'
  });

  const { color } = useSelector(state => state.userAuth);
  const { cossignment } = useParams();

  const handleChangeHandler = (e, nameField) => {
    const val = e.target.value;
    setIsData(prev => ({ ...prev, [nameField]: val }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    isData.cossignment = cossignment;
    updateHandler(isData);
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '550px',
          borderRadius: '16px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <h2
          style={{
            color: color || '#007bff',
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          Create History Record
        </h2>

        <div style={inputCard}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={isData.date || ''}
            onChange={(e) => handleChangeHandler(e, 'date')}
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Time</label>
          <input
            type="time"
            value={isData.time || ''}
            onChange={(e) => handleChangeHandler(e, 'time')}
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Location</label>
          <input
            type="text"
            value={isData.location || ''}
            onChange={(e) => handleChangeHandler(e, 'location')}
            placeholder="Enter location"
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Latitude</label>
          <input
            type="number"
            value={isData.lattitude || ''}
            onChange={(e) => handleChangeHandler(e, 'lattitude')}
            placeholder="Enter latitude"
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Longitude</label>
          <input
            type="number"
            value={isData.longitude || ''}
            onChange={(e) => handleChangeHandler(e, 'longitude')}
            placeholder="Enter longitude"
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Updated By</label>
          <input
            type="text"
            value={isData.UploadedBy || ''}
            onChange={(e) => handleChangeHandler(e, 'UploadedBy')}
            placeholder="Admin"
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Remarks</label>
          <input
            type="text"
            value={isData.Remarks || ''}
            onChange={(e) => handleChangeHandler(e, 'Remarks')}
            placeholder="Add remarks"
            style={inputStyle}
          />
        </div>

        <div style={inputCard}>
          <label style={labelStyle}>Status</label>
          <select
            value={isData.status || ''}
            onChange={(e) => handleChangeHandler(e, 'status')}
            style={inputStyle}
          >
            <option>Pending</option>
            <option>Picked Up</option>
            <option>In Transit</option>
            <option>Cancelled</option>
            <option>Delivered</option>
            <option>Returned</option>
          </select>
        </div>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: color || '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
              width: '100%',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = color || '#007bff')}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// Inline reusable styles
const inputCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#555',
  fontSize: '14px'
};

const inputStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px 12px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.2s ease'
};
