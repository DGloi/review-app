// DragAndDrop.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DatasetItem = ({ name, column, value }) => {
  const [, ref] = useDrag(() => ({
    type: 'DATASET',
    item: { name, column, value },
  }));

  return <div ref={ref} className="dataset-item">{name}</div>;
};

export default DatasetItem;
