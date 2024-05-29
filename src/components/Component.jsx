import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Header from './Header';
import DataTable from './DataTable';
import ClusterConfigCard from './ClusterConfigCard';
import VisualizationCard from './VisualizationCard';

export default function Component() {
  const [columnsOriginal, setColumnsOriginal] = useState([]);
  const [dataOriginal, setDataOriginal] = useState([]);
  const [columnsProcessed, setColumnsProcessed] = useState([]);
  const [dataProcessed, setDataProcessed] = useState([]);
  const [clusters, setClusters] = useState([{ characteristics: [] }]);
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Full Response:', response); // Log the entire response
      console.log('Response data:', response.data); // Log the response data

      if (response.data.original && response.data.processed) {
        console.log('Original Columns:', response.data.original.columns); // Log original columns
        console.log('Processed Columns:', response.data.processed.columns); // Log processed columns

        setColumnsOriginal(response.data.original.columns.map(col => ({
          Header: col,
          accessor: col
        })));
        setDataOriginal(response.data.original.data.map(item => {
          const obj = {};
          response.data.original.columns.forEach(col => {
            obj[col] = item[col]; // Ensure this matches your response structure
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
            obj[col] = item[col]; // Ensure this matches your response structure
          });
          return obj;
        }));
      } else {
        console.error('Error: Invalid response structure', response.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('General error:', error.message);
      }
    }
  };

  const handleRunAnalysis = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', {
        clusters,
        data: dataProcessed,
      });
      setChartData(response.data);
    } catch (error) {
      console.error('Error running analysis:', error);
    }
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <NavBar />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <Header handleFileUpload={handleFileUpload} handleRunAnalysis={handleRunAnalysis} />
            <div className="grid grid-cols-2 gap-4">
              <DataTable columns={columnsOriginal} data={dataOriginal} />
              <DataTable columns={columnsProcessed} data={dataProcessed} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <ClusterConfigCard columns={columnsProcessed} clusters={clusters} setClusters={setClusters} handleRunAnalysis={handleRunAnalysis} />
              <VisualizationCard chartData={chartData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
