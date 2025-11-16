import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Barcode from 'react-jsbarcode';
import { useReactToPrint } from 'react-to-print';
import ReactS3 from "react-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

export const AdminCossignmentEditComponent = ({ updateHandler }) => {
    const [isData, setIsData] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { color, cossignmentsList } = useSelector(state => state.userAuth);
    const navigate = useNavigate();
    const { id } = useParams();
    const componentRef = useRef();

    // --- S3 Config ---
    const config = {
        dirName: process.env.REACT_APP_DIRNAME,
        bucketName: process.env.REACT_APP_BUCKETNAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESSKEYID,
        secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    };

    // --- Load existing consignment ---
    useEffect(() => {
        const dataObj = cossignmentsList.find(data => data._id.toString() === id.toString());
        if (dataObj) {
            setIsData(dataObj);
            if (dataObj.package_image) setPreviewImage(dataObj.package_image);
        }
    }, [id, cossignmentsList]);

    // --- Handlers ---
    const handleChangeHandler = (e, nameField) => {
        const val = e.target.value;
        setIsData(prev => ({ ...prev, [nameField]: val }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsData(prev => ({ ...prev, package_image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const uploadToS3 = async (photoFile) => {
        if (!photoFile || typeof photoFile === "string") return photoFile;
        setUploading(true);
        try {
            const response = await ReactS3.uploadFile(photoFile, config);
            if (response.result.status !== 204) throw new Error("Upload failed");
            return response.location;
        } catch (err) {
            console.error("S3 Upload Error:", err);
            alert("Image upload failed. Try again.");
            return null;
        } finally {
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        let imageUrl = isData.package_image;

        // Upload only if a new file is chosen
        if (imageUrl && typeof imageUrl !== "string") {
            imageUrl = await uploadToS3(isData.package_image);
        }

        const updatedData = { ...isData, package_image: imageUrl };
        updateHandler(updatedData);
    };

    const navigateHandler = () => navigate(`/admindashboard/histories/${id}`);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Consignment Info',
        onAfterPrint: () => console.log('Printed PDF successfully!'),
    });

    // --- Styles ---
    const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', width: '100%', backgroundColor: '#f9f9f9' };
    const cardStyle = { background: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '20px', marginBottom: '20px', width: '100%', maxWidth: '900px' };
    const inputGroup = { display: 'flex', flexDirection: 'column', marginBottom: '15px' };
    const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', outline: 'none', transition: '0.3s' };
    const labelStyle = { fontWeight: '600', marginBottom: '6px', color: '#444' };
    const buttonStyle = { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', width: '100%', marginTop: '10px' };
    const thtdStyle = { border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontSize: '14px' };
    const sectionHeader = { fontSize: '18px', color: '#222', borderBottom: '2px solid #007bff', paddingBottom: '6px', marginBottom: '10px', textAlign: 'center' };
    const responsiveWrapper = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', width: '100%' };

    return (
        <div style={containerStyle}>
            <div style={{ width: '100%', maxWidth: '900px' }}>
                <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                    <button
                        style={{ ...buttonStyle, width: 'auto', backgroundColor: '#28a745' }}
                        onClick={navigateHandler}
                    >
                        Update Locations
                    </button>
                </div>

                {isData && (
                    <div style={cardStyle} ref={componentRef}>
                        <h3 style={sectionHeader}>Skylane Express</h3>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <Barcode value={isData.courier_Reference_No} options={{ format: 'code128' }} renderer="svg" />
                        </div>

                        <div style={responsiveWrapper}>
                            <div style={cardStyle}>
                                <h3 style={sectionHeader}>Shipper Details</h3>
                                <p>{isData.shipper_name}</p>
                                <p>{isData.shipper_phoneNumber}</p>
                                <p>{isData.shipper_address}</p>
                                <p>{isData.shipper_email}</p>
                            </div>

                            <div style={cardStyle}>
                                <h3 style={sectionHeader}>Receiver Details</h3>
                                <p>{isData.reciever_name}</p>
                                <p>{isData.reciever_phoneNumber}</p>
                                <p>{isData.reciever_address}</p>
                                <p>{isData.reciever_email}</p>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                                <thead>
                                    <tr>
                                        <th style={thtdStyle}>Qty</th>
                                        <th style={thtdStyle}>Piece Type</th>
                                        <th style={thtdStyle}>Description</th>
                                        <th style={thtdStyle}>Length(cm)</th>
                                        <th style={thtdStyle}>Weight(kg)</th>
                                        <th style={thtdStyle}>Width(cm)</th>
                                        <th style={thtdStyle}>Height(cm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={thtdStyle}>{isData.Qty}</td>
                                        <td style={thtdStyle}>{isData.piece_type}</td>
                                        <td style={thtdStyle}>{isData.description}</td>
                                        <td style={thtdStyle}>{isData.length}</td>
                                        <td style={thtdStyle}>{isData.weight}</td>
                                        <td style={thtdStyle}>{isData.width}</td>
                                        <td style={thtdStyle}>{isData.height}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <button style={{ ...buttonStyle, marginBottom: '25px' }} onClick={handlePrint}>
                    Print
                </button>

                {cossignmentsList && isData && (
                    <form onSubmit={submitHandler} style={cardStyle}>
                        <h3 style={sectionHeader}>Edit Shipment Details</h3>

                        {[
                            { label: "Shipper Name", field: "shipper_name", type: "text" },
                            { label: "Shipper Phone Number", field: "shipper_phoneNumber", type: "text" },
                            { label: "Shipper Address", field: "shipper_address", type: "text" },
                            { label: "Shipper Email", field: "shipper_email", type: "email" },
                            { label: "Receiver Name", field: "reciever_name", type: "text" },
                            { label: "Receiver Email", field: "reciever_email", type: "email" },
                            { label: "Receiver Phone", field: "reciever_phoneNumber", type: "text" },
                            { label: "Receiver Address", field: "reciever_address", type: "text" },
                            { label: "Weight (kg)", field: "weight", type: "number" },
                            { label: "Longitude", field: "longitude", type: "number" },
                            { label: "Lattitude", field: "lattitude", type: "number" },
                            { label: "Packages", field: "packages", type: "text" },
 { label: "Status", field: "status", type: "text",placeholder:"In Transit, Delivered,Pending etc." },

                            { label: "Product", field: "product", type: "text" },
                        ].map((item, index) => (
                            <div style={inputGroup} key={index}>
                                <label style={labelStyle}>{item.label}</label>
                                <input
                                    type={item.type}
                                    value={isData[item.field] || ""}
                                    onChange={(e) => handleChangeHandler(e, item.field)}
                                    style={inputStyle}
                                />
                            </div>
                        ))}

                        {/* --- Package Image --- */}
                        <div style={inputGroup}>
                            <label style={labelStyle}>Package Image</label>

                            {previewImage ? (
                                <div style={{ marginBottom: '10px' }}>
                                    <img
                                        src={previewImage}
                                        alt="Package Preview"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </div>
                            ) : (
                                <p style={{ color: '#888', fontSize: '14px' }}>No image uploaded yet.</p>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={inputStyle}
                            />
                            {uploading && <p style={{ color: '#777', fontSize: '14px' }}>Uploading image...</p>}
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <button type="submit" style={buttonStyle}>
                                {uploading ? "Uploading..." : "Update"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};





