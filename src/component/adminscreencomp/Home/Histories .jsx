import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteHistory, fetchHistories } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { Error } from "../../common/Error";
import { useNavigate, useParams } from 'react-router-dom';

export const AdminHistoriesComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [filteredHistories, setFilteredHistories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cossignment } = useParams();
  const { color } = useSelector(state => state.userAuth);

  useEffect(() => {
    fetchAllHistories();
  }, []);

  const fetchAllHistories = async () => {
    setIsError(false);
    const res = await dispatch(fetchHistories(cossignment));
    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    setHistoryList(res.message);
    setFilteredHistories(res.message);
    setIsLoading(false);
  };

  const editHandler = (id) => {
    navigate(`/admindashboard/histories/${cossignment}/${id}`);
  };

  const deleteHandler = async (id) => {
    setIsError(false);
    const res = await dispatch(deleteHistory(id));
    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const filteredArray = historyList.filter(data => data._id !== id);
    setHistoryList(filteredArray);
    setFilteredHistories(filteredArray);
    setIsLoading(false);
  };

  const searchHandler = (e) => {
    const textData = e.target.value.toLowerCase();
    if (textData) {
      const newData = filteredHistories.filter(item =>
        item.location?.toLowerCase().includes(textData)
      );
      setHistoryList(newData);
    } else {
      setHistoryList(filteredHistories);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '25px'
      }}>
        <h2 style={{ marginBottom: '20px', color: color || '#333', textAlign: 'center' }}>
          Shipment History
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '8px 12px',
            flex: '1',
            minWidth: '220px'
          }}>
            <span className="material-icons" style={{ color: '#666', marginRight: '5px' }}>search</span>
            <input
              type="text"
              placeholder="Search by location"
              onChange={searchHandler}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Table View for Desktop */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: color || '#007bff', color: '#fff' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Delete</th>
                <th style={thStyle}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map(data => (
                <tr key={data._id} style={trStyle}>
                  <td style={tdStyle}>{data.date}</td>
                  <td style={tdStyle}>{data.time}</td>
                  <td style={tdStyle}>{data.location}</td>
                  <td style={tdStyle}>{data.status}</td>
                  <td style={tdStyle}>
                    <span
                      className="material-icons"
                      onClick={() => deleteHandler(data._id)}
                      style={{ color: 'red', cursor: 'pointer' }}
                    >
                      delete
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span
                      className="material-icons"
                      onClick={() => editHandler(data._id)}
                      style={{ color: color || '#007bff', cursor: 'pointer' }}
                    >
                      edit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div style={{
          display: 'none',
          flexDirection: 'column',
          gap: '15px',
          marginTop: '20px'
        }} className="mobile-view">
          {historyList.map(data => (
            <div key={data._id} style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              background: '#fff',
              boxShadow: '0 0 6px rgba(0,0,0,0.05)'
            }}>
              <p><b>Date:</b> {data.date}</p>
              <p><b>Time:</b> {data.time}</p>
              <p><b>Location:</b> {data.location}</p>
              <p><b>Status:</b> {data.status}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <span
                  className="material-icons"
                  onClick={() => editHandler(data._id)}
                  style={{ color: color || '#007bff', cursor: 'pointer' }}
                >
                  edit
                </span>
                <span
                  className="material-icons"
                  onClick={() => deleteHandler(data._id)}
                  style={{ color: 'red', cursor: 'pointer' }}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            table { display: none; }
            .mobile-view { display: flex !important; }
          }
        `}
      </style>
    </div>
  );
};

// shared style objects
const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '14px'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
  fontSize: '14px'
};

const trStyle = {
  background: '#fff'
};

