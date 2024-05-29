import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';
import FileUpload from './FileUpload';
import DataTable from './DataTable';
import ClusterConfigCard from './ClusterConfigCard';

export default function Dashboard() {
  const [columnsOriginal, setColumnsOriginal] = useState([]);
  const [dataOriginal, setDataOriginal] = useState([]);
  const [columnsProcessed, setColumnsProcessed] = useState([]);
  const [dataProcessed, setDataProcessed] = useState([]);
  const [clusters, setClusters] = useState([{ characteristics: [] }]);

  const handleRunAnalysis = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', {
        clusters,
        data: dataProcessed,
      });
      // setChartData(response.data); // Uncomment if you want to use chartData
    } catch (error) {
      console.error('Error running analysis:', error);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[240px_1fr]">
      <div className="flex flex-col w-full">
        <main className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <FileUpload 
              setColumnsOriginal={setColumnsOriginal} 
              setDataOriginal={setDataOriginal}
              setColumnsProcessed={setColumnsProcessed}
              setDataProcessed={setDataProcessed}
            />
            {dataOriginal.length > 0 && dataProcessed.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card">
                    <div className="card-content">
                      <div className="table-container">
                        <h2>Original Data</h2>
                        <DataTable columns={columnsOriginal} data={dataOriginal} />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-content">
                      <div className="table-container">
                        <h2>Processed Data</h2>
                        <DataTable columns={columnsProcessed} data={dataProcessed} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ClusterConfigCard columns={columnsProcessed} clusters={clusters} setClusters={setClusters} handleRunAnalysis={handleRunAnalysis} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
