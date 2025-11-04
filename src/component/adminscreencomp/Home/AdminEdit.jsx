import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminEditComponent = ({ updateHandler }) => {
  const [isData, setIsData] = useState(null);
  const { color, admin } = useSelector(state => state.userAuth);
  const { id } = useParams();

  const handleChangeHandler = (e, nameField) => {
    const val = e.target.value;
    setIsData(prev => {
      const updated = { ...prev, [nameField]: val };
      return updated;
    });
  };

  useEffect(() => {
    setIsData(admin);
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
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
      {admin && isData && (
        <form
          onSubmit={submitHandler}
          style={{
            background: '#fff',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '16px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <h2
            style={{
              color: color || '#007bff',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            Edit Admin Details
          </h2>

          <div style={inputCard}>
            <label style={labelStyle}>Email</label>
            <input
              type="text"
              value={isData.email}
              onChange={(e) => handleChangeHandler(e, 'email')}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputCard}>
            <label style={labelStyle}>Password</label>
            <input
              type="text"
              value={isData.password}
              onChange={(e) => handleChangeHandler(e, 'password')}
              required
              style={inputStyle}
            />
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
      )}
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
