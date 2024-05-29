import React from 'react';
import ClusterConfig from './ClusterConfig';

const ClusterConfigCard = ({ columns, clusters, setClusters, handleRunAnalysis }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Cluster Configuration</h3>
      </div>
      <div className="card-content">
        <ClusterConfig columns={columns} clusters={clusters} setClusters={setClusters} />
      </div>
      <div className="card-footer">
        <button className="button button-primary" onClick={handleRunAnalysis}>
          Run Analysis
        </button>
      </div>
    </div>
  );
};

export default ClusterConfigCard;
