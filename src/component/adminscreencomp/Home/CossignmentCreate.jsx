import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactS3 from "react-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

export const AdminCossignmentCreateComponent = ({ updateHandler }) => {
  const [isData, setIsData] = useState({
    payment_mode: "Cash",
    carrier: "DHL",
    destination: "United States",
    mode: "Sea transport",
    origin: "United States",
    piece_type: "Pallet",
    status: "Pending",
  });

  const [photo, setPhoto] = useState(null);
  const [photoDataURL, setPhotoDataURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { id } = useParams();
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const handleChangeHandler = (e, nameField) => {
    const val = e.target.value;
    setIsData((prev) => ({ ...prev, [nameField]: val }));
  };

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Invalid image format. Please select a PNG or JPG file.");
      return;
    }
    setPhoto(file);
  };

  useEffect(() => {
    if (!photo) return;
    const fileReader = new FileReader();
    let isCancel = false;
    fileReader.onload = (e) => {
      const { result } = e.target;
      if (result && !isCancel) setPhotoDataURL(result);
    };
    fileReader.readAsDataURL(photo);
    return () => {
      isCancel = true;
      if (fileReader.readyState === 1) fileReader.abort();
    };
  }, [photo]);

  const config = {
    dirName: process.env.REACT_APP_DIRNAME,
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  };

  const uploadToS3 = async () => {
    if (!photo) return null;
    setUploading(true);
    try {
      const response = await ReactS3.uploadFile(photo, config);
      if (response.result.status !== 204) throw new Error("Upload failed");
      return response.location;
    } catch (error) {
      console.error("S3 Upload Error:", error);
      alert("Image upload failed. Try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadToS3();
    const finalData = { ...isData };
    if (imageUrl) finalData.package_image = imageUrl;

    console.log(finalData);
    
    updateHandler(finalData);
  };

  return (
    <div style={pageWrapper}>
      <form style={formCard} onSubmit={submitHandler}>
        <h2 style={formHeader}>Create New Consignment</h2>

        {/* Image Upload */}
        <div style={inputCard}>
          <label style={labelStyle}>Package Image</label>
          <input type="file" accept="image/*" onChange={changePhotoHandler} style={inputStyle} />
          {photoDataURL && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <img
                src={photoDataURL}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  marginTop: "8px",
                }}
              />
            </div>
          )}
          {uploading && <p style={{ color: "#777", fontSize: "14px" }}>Uploading image...</p>}
        </div>

        {/* --- Shipper Details --- */}
        <h3 style={sectionHead}>Shipper Details</h3>
        <InputField label="Shipper Name" name="shipper_name" value={isData.shipper_name} onChange={handleChangeHandler} />
        <InputField label="Phone Number" name="shipper_phoneNumber" value={isData.shipper_phoneNumber} onChange={handleChangeHandler} />
        <InputField label="Address" name="shipper_address" value={isData.shipper_address} onChange={handleChangeHandler} />
        <InputField label="Email" name="shipper_email" type="email" value={isData.shipper_email} onChange={handleChangeHandler} />

        {/* --- Receiver Details --- */}
        <h3 style={sectionHead}>Receiver Details</h3>
        <InputField label="Receiver Name" name="reciever_name" value={isData.reciever_name} onChange={handleChangeHandler} />
        <InputField label="Receiver Email" name="reciever_email" type="email" value={isData.reciever_email} onChange={handleChangeHandler} />
        <InputField label="Receiver Phone" name="reciever_phoneNumber" value={isData.reciever_phoneNumber} onChange={handleChangeHandler} />
        <InputField label="Receiver Address" name="reciever_address" value={isData.reciever_address} onChange={handleChangeHandler} />

        {/* --- Shipment Details --- */}
        <h3 style={sectionHead}>Shipment Details</h3>
        <InputField label="Weight (kg)" name="weight" type="number" value={isData.weight} onChange={handleChangeHandler} />
        <InputField label="Packages" name="packages" value={isData.packages} onChange={handleChangeHandler} />
        <InputField label="Product" name="product" value={isData.product} onChange={handleChangeHandler} />

        <SelectField label="Payment Mode" name="payment_mode" value={isData.payment_mode} onChange={handleChangeHandler} options={["Cash", "Cheque"]} />

       <SelectField
  label="Origin"
  name="origin"
  value={isData.origin}
  onChange={handleChangeHandler}
  options={[
    "United States",
    "United Kingdom",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of The",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Greenland",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran, Islamic Republic of",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan, Province of China",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Zambia",
    "Zimbabwe"
  ]}
/>



        <SelectField label="Carrier" name="carrier" value={isData.carrier} onChange={handleChangeHandler} options={["DHL", "FedEX", "USPS"]} />
        <InputField label="Departure Time" name="depature_time" type="time" value={isData.depature_time} onChange={handleChangeHandler} />
        <SelectField label="Destination" name="destination" value={isData.destination} onChange={handleChangeHandler} options={["United States", "United Kingdom", "Nigeria"]} />
        <InputField label="Pickup Time" name="pickup_time" type="time" value={isData.pickup_time} onChange={handleChangeHandler} />
        <SelectField label="Mode" name="mode" value={isData.mode} onChange={handleChangeHandler} options={["Sea transport", "Land Shipping", "Air Freight"]} />
        <InputField label="Quantity" name="quantity" type="number" value={isData.quantity} onChange={handleChangeHandler} />
        <InputField label="Total Freight" name="total_freight" type="number" value={isData.total_freight} onChange={handleChangeHandler} />
        <InputField label="Pickup Date" name="pickup_date" type="date" value={isData.pickup_date} onChange={handleChangeHandler} />
        <InputField label="Expected Delivery Date" name="expected_delivery_date" type="date" value={isData.expected_delivery_date} onChange={handleChangeHandler} />

        {/* --- Package Info --- */}
        <h3 style={sectionHead}>Package Information</h3>
        <InputField label="Qty" name="Qty" type="number" value={isData.Qty} onChange={handleChangeHandler} />
        <SelectField label="Piece Type" name="piece_type" value={isData.piece_type} onChange={handleChangeHandler} options={["Pallet", "Cartons", "Crate", "Others"]} />
        <InputField label="Description" name="description" value={isData.description} onChange={handleChangeHandler} />
        <InputField label="Length" name="length" value={isData.length} onChange={handleChangeHandler} />
        <InputField label="Width" name="width" value={isData.width} onChange={handleChangeHandler} />
        <InputField label="Height" name="height" value={isData.height} onChange={handleChangeHandler} />
        <SelectField label="Status" name="status" value={isData.status} onChange={handleChangeHandler} options={["Pending", "Picked Up", "In Transit", "Cancelled", "Delivered", "Returned"]} />

        <button type="submit" style={submitButton}>
          {uploading ? "Uploading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

// --- Inline Reusable Components ---
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div style={inputCard}>
    <label style={labelStyle}>{label}</label>
    <input type={type} value={value || ""} onChange={(e) => onChange(e, name)} style={inputStyle} />
  </div>
);

const SelectField = ({ label, name, value, onChange, options = [] }) => (
  <div style={inputCard}>
    <label style={labelStyle}>{label}</label>
    <select value={value} onChange={(e) => onChange(e, name)} style={inputStyle}>
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  </div>
);

// --- Styles ---
const pageWrapper = {
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "40px",
  fontFamily: "Arial, sans-serif",
};

const formCard = {
  background: "#fff",
  width: "100%",
  maxWidth: "600px",
  borderRadius: "16px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const formHeader = {
  textAlign: "center",
  color: "#007bff",
  fontWeight: "bold",
  fontSize: "22px",
  marginBottom: "10px",
};

const sectionHead = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "15px",
  borderBottom: "2px solid #007bff30",
  paddingBottom: "4px",
};

const inputCard = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#555",
  fontSize: "14px",
};

const inputStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "14px",
  outline: "none",
  transition: "border 0.2s ease",
};

const submitButton = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 20px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
  width: "100%",
  transition: "background 0.3s ease",
  marginTop: "10px",
};

