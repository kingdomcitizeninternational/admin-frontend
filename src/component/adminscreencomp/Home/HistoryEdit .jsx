import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminHistoryEditComponent = ({ updateHandler }) => {
    const [isData, setIsData] = useState(null);
    const { color, historiesList } = useSelector(state => state.userAuth);
    const { cossignment, id } = useParams();

    useEffect(() => {
        const dataObj = historiesList.find(data => data._id.toString() === id.toString());
        setIsData(dataObj);
    }, [id, historiesList]);

    const handleChangeHandler = (e, nameField) => {
        const val = e.target.value;
        setIsData(prev => ({ ...prev, [nameField]: val }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateHandler(isData);
    };

    // ===== INLINE STYLES =====
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: '100%',
        backgroundColor: '#f7f8fa',
        minHeight: '100vh',
    };

    const formWrapperStyle = {
        width: '100%',
        maxWidth: '600px',
        background: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        transition: 'all 0.3s ease',
    };

    const labelStyle = {
        fontWeight: '600',
        color: '#333',
        marginBottom: '6px',
        fontSize: '15px',
    };

    const inputStyle = {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '15px',
        outline: 'none',
        transition: 'border 0.3s ease',
        width: '100%',
    };

    const selectStyle = {
        ...inputStyle,
        backgroundColor: '#fff',
    };

    const inputCardStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const buttonContainer = {
        marginTop: '10px',
        textAlign: 'center',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        width: '100%',
        transition: 'background 0.3s ease, transform 0.2s',
    };

    const headerStyle = {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '700',
        color: '#222',
        marginBottom: '10px',
        borderBottom: '2px solid #007bff',
        paddingBottom: '5px',
    };

    return (
        <div style={containerStyle}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {isData && (
                    <form onSubmit={submitHandler} style={formWrapperStyle}>
                        <h3 style={headerStyle}>Edit History Record</h3>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Date</label>
                            <input
                                type="date"
                                value={isData.date || ""}
                                onChange={(e) => handleChangeHandler(e, 'date')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Time</label>
                            <input
                                type="time"
                                value={isData.time || ""}
                                onChange={(e) => handleChangeHandler(e, 'time')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Location</label>
                            <input
                                type="text"
                                value={isData.location || ""}
                                onChange={(e) => handleChangeHandler(e, 'location')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Latitude</label>
                            <input
                                type="number"
                                value={isData.lattitude || ""}
                                onChange={(e) => handleChangeHandler(e, 'lattitude')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Longitude</label>
                            <input
                                type="number"
                                value={isData.longitude || ""}
                                onChange={(e) => handleChangeHandler(e, 'longitude')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Updated By</label>
                            <input
                                type="text"
                                placeholder="Admin"
                                value={isData.UploadedBy || ""}
                                onChange={(e) => handleChangeHandler(e, 'UploadedBy')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Remarks</label>
                            <input
                                type="text"
                                value={isData.Remarks || ""}
                                onChange={(e) => handleChangeHandler(e, 'Remarks')}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputCardStyle}>
                            <label style={labelStyle}>Status</label>
                            <select
                                value={isData.status || ""}
                                onChange={(e) => handleChangeHandler(e, 'status')}
                                style={selectStyle}
                            >
                                <option>Pending</option>
                                <option>Picked Up</option>
                                <option>In Transit</option>
                                <option>Cancelled</option>
                                <option>Delivered</option>
                                <option>Returned</option>
                            </select>
                        </div>

                        <div style={buttonContainer}>
                            <button
                                type="submit"
                                style={buttonStyle}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
