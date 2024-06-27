// Reconciliation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatasetItem from 'utils/DragAndDrop';
import DropZone from 'utils/DropZone';
import ResultsTable from 'utils/ReconciliationResultTable';
import './Reconciliation.css';

const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name));
  return cookieValue ? cookieValue.split('=')[1] : null;
};

const Reconciliation = () => {
  const [datasets, setDatasets] = useState([]);
  const [droppedItemZone1, setDroppedItemZone1] = useState(null);
  const [droppedItemZone2, setDroppedItemZone2] = useState(null);
  const [schemaZone1, setSchemaZone1] = useState([]);
  const [schemaZone2, setSchemaZone2] = useState([]);
  const [joinKey1, setJoinKey1] = useState('');
  const [joinKey2, setJoinKey2] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dataset-list/');
        setDatasets(response.data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  const handleDatasetDrop = async (item, zone) => {
    console.log(`Item dropped in zone ${zone}:`, item);
    if (zone === 1) {
      setDroppedItemZone1(item);
      await fetchSchema(item.name, setSchemaZone1);
    } else if (zone === 2) {
      setDroppedItemZone2(item);
      await fetchSchema(item.name, setSchemaZone2);
    }
  };

  const handleRemoveItem = (zone) => {
    if (zone === 1) {
      setDroppedItemZone1(null);
      setSchemaZone1([]);
      setJoinKey1('');
    } else if (zone === 2) {
      setDroppedItemZone2(null);
      setSchemaZone2([]);
      setJoinKey2('');
    }
  };

  const fetchSchema = async (datasetName, setSchema) => {
    try {
      console.log(`Fetching schema for ${datasetName}`);
      const response = await axios.get(`http://localhost:8000/api/schema/${datasetName}/`);
      console.log(`Schema for ${datasetName}:`, response.data);
      setSchema(response.data);
    } catch (error) {
      console.error('Error fetching schema:', error);
    }
  };

  const executeQuery = async () => {
    const queryData = {
      datasets: [droppedItemZone1, droppedItemZone2],
      joinKeys: [joinKey1, joinKey2]
    };
    try {
      const csrfToken = getCsrfToken();
      const response = await axios.post('http://localhost:8000/api/execute_dynamic_query/', queryData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      setResults(response.data.data);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  return (
    <div className="reconciliation">
      <div className="dataset-items">
        {datasets.map((dataset, index) => (
          <DatasetItem
            key={index}
            name={dataset.dataset_name}
            column={dataset.dataset_name}
            value={dataset.id}
          />
        ))}
      </div>
      <div className="drop-zones">
        <DropZone
          onDrop={(item) => handleDatasetDrop(item, 1)}
          onRemove={() => handleRemoveItem(1)}
          droppedItem={droppedItemZone1}
          title="Drop Zone 1"
        />
        <DropZone
          onDrop={(item) => handleDatasetDrop(item, 2)}
          onRemove={() => handleRemoveItem(2)}
          droppedItem={droppedItemZone2}
          title="Drop Zone 2"
        />
      </div>
      {droppedItemZone1 && schemaZone1.length > 0 && (
        <div>
          <label>Join Key for Zone 1:</label>
          <select value={joinKey1} onChange={(e) => setJoinKey1(e.target.value)}>
            <option value="">Select a field</option>
            {schemaZone1.map((field, index) => (
              <option key={index} value={field}>{field}</option>
            ))}
          </select>
        </div>
      )}
      {droppedItemZone2 && schemaZone2.length > 0 && (
        <div>
          <label>Join Key for Zone 2:</label>
          <select value={joinKey2} onChange={(e) => setJoinKey2(e.target.value)}>
            <option value="">Select a field</option>
            {schemaZone2.map((field, index) => (
              <option key={index} value={field}>{field}</option>
            ))}
          </select>
        </div>
      )}
      <button onClick={executeQuery}>Execute Query</button>
      <ResultsTable data={results} />
    </div>
  );
};

export default Reconciliation;