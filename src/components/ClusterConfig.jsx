import React from 'react';
import { Form } from 'react-bootstrap';

const ClusterConfig = ({ columns, clusters, setClusters }) => {
  const handleCharacteristicChange = (index, characteristic) => {
    const newClusters = [...clusters];
    const selectedCharacteristic = newClusters[index].characteristics.find(c => c.name === characteristic);

    if (selectedCharacteristic) {
      newClusters[index].characteristics = newClusters[index].characteristics.filter(c => c.name !== characteristic);
    } else {
      newClusters[index].characteristics.push({ name: characteristic, value: '' });
    }

    setClusters(newClusters);
  };

  const handleValueChange = (clusterIndex, characteristicIndex, value) => {
    const newClusters = [...clusters];
    newClusters[clusterIndex].characteristics[characteristicIndex].value = value;
    setClusters(newClusters);
  };

  const getValueInput = (column, value, onChange) => {
    if (typeof value === 'number') {
      return (
        <div>
          <Form.Control type="number" placeholder="Min" onChange={(e) => onChange('min', e.target.value)} />
          <Form.Control type="number" placeholder="Max" onChange={(e) => onChange('max', e.target.value)} />
        </div>
      );
    } else {
      return <Form.Control type="text" placeholder="Value" value={value} onChange={(e) => onChange('value', e.target.value)} />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Cluster Configuration</h3>
        <p className="card-description">Customize the clustering parameters for your data analysis.</p>
      </div>
      <div className="card-content space-y-4">
        {clusters.map((cluster, clusterIndex) => (
          <div key={clusterIndex}>
            <Form>
              <Form.Group>
                <Form.Label>Select Characteristics for Cluster {clusterIndex + 1}</Form.Label>
                <div className="dropdown">
                  {columns.map(column => (
                    <div
                      key={column.accessor}
                      onClick={() => handleCharacteristicChange(clusterIndex, column.accessor)}
                      className={`dropdown-item ${cluster.characteristics.some(c => c.name === column.accessor) ? 'active' : ''}`}
                    >
                      {column.Header}
                    </div>
                  ))}
                </div>
              </Form.Group>
              {cluster.characteristics.map((char, charIndex) => (
                <Form.Group key={charIndex}>
                  <Form.Label>{char.name}</Form.Label>
                  {getValueInput(char.name, char.value, (type, value) => handleValueChange(clusterIndex, charIndex, value))}
                </Form.Group>
              ))}
            </Form>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => console.log(clusters)}>Run Analysis</button>
      </div>
    </div>
  );
};

export default ClusterConfig;
