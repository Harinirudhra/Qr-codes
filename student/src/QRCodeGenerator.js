import React, { useState } from 'react';
import QRCode from 'qrcode';


function QRCodeGenerator() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');

  const generateQRCode = async () => {
    const student = {
      name,
      rollNumber,
      department,
      year,
      contactNumber,
    };

    const studentInfo = JSON.stringify(student);

    try {
      const dataURL = await QRCode.toDataURL(studentInfo, {
        errorCorrectionLevel: 'H',
        width: 500,
      });
      setQRCodeDataURL(dataURL);

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = 'qr-code.png';
      downloadLink.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="qr-generator-container">
      <h2>Generates QR Code</h2>
      <div>
        <label>
          Names:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Roll Number:
          <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        </label>
        <label>
          Departments:
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </label>
        <label>
          Year:
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
          Contact Number:
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
        <button onClick={generateQRCode}>Generate QR Code</button>
      </div>

      {qrCodeDataURL && (
        <div className="qr-code-display">
          <h3>QR Code generated</h3>
          <img src={qrCodeDataURL} alt="qr code" />
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
