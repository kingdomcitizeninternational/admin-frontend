import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteCossignment, fetchCossignments } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { Error } from "../../common/Error";
import { useNavigate } from 'react-router-dom';

export const AdminCossignmentsComponent = ({ status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cossignmentList, setCossignmentList] = useState([]);
  const [filteredCossignments, setfilteredCossignments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { color } = useSelector(state => state.userAuth);

  useEffect(() => {
    fetchAllCossignments();
  }, []);

  const fetchAllCossignments = async () => {
    setIsError(false);
    let res = await dispatch(fetchCossignments());
    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    setCossignmentList(res.message);
    setfilteredCossignments(res.message);
    setIsLoading(false);
  };

  const editHandler = (id) => navigate(`/admindashboard/cossignments/${id}`);

  const deleteHandler = async (id) => {
    setIsError(false);
    let res = await dispatch(deleteCossignment(id));
    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const filteredArray = cossignmentList.filter(data => data._id !== id);
    setCossignmentList(filteredArray);
    setfilteredCossignments(filteredArray);
    setIsLoading(false);
  };

  const searchHandler = (e) => {
    setIsLoading(true);
    const text = e.target.value.toLowerCase();
    if (text) {
      const newData = filteredCossignments.filter(item =>
        item.courier_Reference_No?.toLowerCase().includes(text)
      );
      setCossignmentList(newData);
    } else {
      setCossignmentList(filteredCossignments);
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  // inline styling
  const styles = {
    container: {
      width: "100%",
      minHeight: "100vh",
      background: "#f9fafc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem 1rem",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    header: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      background: "white",
      borderRadius: "50px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: "0.6rem 1rem",
      width: "100%",
      maxWidth: "400px",
      transition: "all 0.3s ease",
    },
    searchInput: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "1rem",
      color: "#333",
      background: "transparent",
    },
    searchIcon: {
      color: "#888",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    tableContainer: {
      width: "100%",
      maxWidth: "1200px",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      overflowX: "auto",
      transition: "all 0.4s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "600px",
    },
    th: {
      background: color || "#007BFF",
      color: "white",
      textAlign: "left",
      padding: "1rem",
      fontWeight: "600",
      fontSize: "0.95rem",
    },
    td: {
      padding: "1rem",
      borderBottom: "1px solid #eee",
      color: "#444",
      fontSize: "0.9rem",
      wordBreak: "break-word",
    },
    rowHover: {
      transition: "background 0.3s ease",
      cursor: "pointer",
    },
    icon: {
      cursor: "pointer",
      fontSize: "1.4rem",
      color: "#777",
      transition: "color 0.3s ease",
    },
    mobileCard: {
      display: "none",
    },
    "@media (max-width: 768px)": {
      tableContainer: { display: "none" },
      mobileCard: { display: "block", width: "100%" },
    },
    card: {
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      padding: "1.5rem",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      fontWeight: "600",
      color: "#555",
      fontSize: "0.9rem",
    },
    value: {
      color: "#333",
      fontSize: "1rem",
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
      marginTop: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#333" }}>
          Admin Cossignments
        </h2>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by reference number..."
            onChange={searchHandler}
            style={styles.searchInput}
          />
          <span className="material-icons" style={styles.searchIcon}>search</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Reference No</th>
              <th style={styles.th}>Shipper Email</th>
              <th style={styles.th}>Receiver Email</th>
              <th style={styles.th}>Delete</th>
              <th style={styles.th}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {cossignmentList.map((data) => (
              <tr key={data._id} style={styles.rowHover}>
                <td style={styles.td}>{data.courier_Reference_No}</td>
                <td style={styles.td}>{data.shipper_email}</td>
                <td style={styles.td}>{data.reciever_email}</td>
                <td style={styles.td}>
                  <span
                    className="material-icons"
                    style={{ ...styles.icon, color: "#dc3545" }}
                    onClick={() => deleteHandler(data._id)}
                  >
                    delete
                  </span>
                </td>
                <td style={styles.td}>
                  <span
                    className="material-icons"
                    style={{ ...styles.icon, color: "#007BFF" }}
                    onClick={() => editHandler(data._id)}
                  >
                    edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Cards) */}
      <div style={styles.mobileCard}>
        {cossignmentList.map((data) => (
          <div key={data._id} style={styles.card}>
            <div>
              <span style={styles.label}>Reference No:</span>
              <div style={styles.value}>{data.courier_Reference_No}</div>
            </div>
            <div>
              <span style={styles.label}>Shipper Email:</span>
              <div style={styles.value}>{data.shipper_email}</div>
            </div>
            <div>
              <span style={styles.label}>Receiver Email:</span>
              <div style={styles.value}>{data.reciever_email}</div>
            </div>
            <div style={styles.actions}>
              <span
                className="material-icons"
                style={{ ...styles.icon, color: "#dc3545" }}
                onClick={() => deleteHandler(data._id)}
              >
                delete
              </span>
              <span
                className="material-icons"
                style={{ ...styles.icon, color: "#007BFF" }}
                onClick={() => editHandler(data._id)}
              >
                edit
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

