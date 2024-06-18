// Reconciliation.js
import React, { useState } from 'react';
import axios from 'axios';
import DatasetItem from 'utils/DragAndDrop';
import DropZone from 'utils/DropZone';
import ResultsTable from 'utils/ReconciliationResultTable';

const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name));
  return cookieValue ? cookieValue.split('=')[1] : null;
};

const Reconciliation = () => {
  const [droppedItemsZone1, setDroppedItemsZone1] = useState([]);
  const [droppedItemsZone2, setDroppedItemsZone2] = useState([]);
  const [results, setResults] = useState([]);

  const handleDatasetDrop = (item, zone) => {
    if (zone === 1) {
      setDroppedItemsZone1((prev) => [...prev, item]);
    } else if (zone === 2) {
      setDroppedItemsZone2((prev) => [...prev, item]);
    }
  };

  const executeQuery = async () => {
    const queryData = [...droppedItemsZone1, ...droppedItemsZone2];
    try {
      const csrfToken = getCsrfToken();
      const response = await axios.post('/api/execute-query/', queryData, {
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
        <DatasetItem name="Dataset 1" column="column1" value="value1" />
        <DatasetItem name="Dataset 2" column="column2" value="value2" />
        {/* Add more DatasetItems as needed */}
      </div>
      <div className="drop-zones">
        <DropZone onDrop={(item) => handleDatasetDrop(item, 1)} droppedItems={droppedItemsZone1} title="Drop Zone 1" />
        <DropZone onDrop={(item) => handleDatasetDrop(item, 2)} droppedItems={droppedItemsZone2} title="Drop Zone 2" />
      </div>
      <button onClick={executeQuery}>Execute Query</button>
      <ResultsTable data={results} />
    </div>
  );
};

export default Reconciliation;
