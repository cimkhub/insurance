import React from 'react';
import { Form, DropdownButton, Dropdown } from 'react-bootstrap';

const ClusterConfig = ({ columns, clusters, setClusters }) => {
  const handleCharacteristicChange = (index, characteristic) => {
    const newClusters = [...clusters];
    const selectedCharacteristic = newClusters[index].characteristics.find(c => c.name === characteristic);

    if (selectedCharacteristic) {
      // Toggle characteristic selection
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
    <div>
      {clusters.map((cluster, clusterIndex) => (
        <div key={clusterIndex}>
          <h3>Cluster {clusterIndex + 1}</h3>
          <Form>
            <Form.Group>
              <Form.Label>Select Characteristics for Cluster {clusterIndex + 1}</Form.Label>
              <DropdownButton id="dropdown-basic-button" title="Select Characteristics">
                {columns.map(column => (
                  <Dropdown.Item
                    key={column.accessor}
                    onClick={() => handleCharacteristicChange(clusterIndex, column.accessor)}
                    active={cluster.characteristics.some(c => c.name === column.accessor)}
                  >
                    {column.Header}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
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
  );
};

export default ClusterConfig;
