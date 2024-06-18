// DropZone.js
import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, droppedItems, title }) => {
  const [, ref] = useDrop(() => ({
    accept: 'DATASET',
    drop: (item) => onDrop(item),
  }));

  return (
    <div className="drop-zone">
      <h4>{title}</h4>
      <div ref={ref} className="drop-area">
        {droppedItems.map((item, index) => (
          <div key={index} className="dropped-item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropZone;
