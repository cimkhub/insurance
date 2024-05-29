import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const FileUpload = ({ setColumnsOriginal, setDataOriginal, setColumnsProcessed, setDataProcessed }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully');

      if (response.data.original && response.data.processed) {
        setColumnsOriginal(response.data.original.columns.map(col => ({
          Header: col,
          accessor: col
        })));
        setDataOriginal(response.data.original.data.map(item => {
          const obj = {};
          response.data.original.columns.forEach(col => {
            obj[col] = item[col];
          });
          return obj;
        }));

        setColumnsProcessed(response.data.processed.columns.map(col => ({
          Header: col,
          accessor: col
        })));
        setDataProcessed(response.data.processed.data.map(item => {
          const obj = {};
          response.data.processed.columns.forEach(col => {
            obj[col] = item[col];
          });
          return obj;
        }));
      } else {
        setMessage('Invalid response structure from server');
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-text">Upload Data</div>
        <p className="card-description">Upload your data files to the dashboard. Supported file types are CSV, Excel, and JSON.</p>
      </div>
      <div className="card-content">
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} />
          <button className="button button-primary" onClick={handleFileUpload}>Upload</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
