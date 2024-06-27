import React from 'react';
import { useDrag } from 'react-dnd';

const DatasetItem = ({ name, column, value }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DATASET',
    item: { name, column, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="dataset-item"
    >
      {name}
    </div>
  );
};

export default DatasetItem;