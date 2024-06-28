import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, onRemove, droppedItem, title }) => {
  const [{ isOver }, ref] = useDrop({
    accept: 'DATASET',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className={`drop-zone ${isOver ? 'over' : ''}`} ref={ref}>
      <h4>{title}</h4>
      <div className="drop-area">
        {droppedItem ? (
          <div className="dropped-item">
            <p>{droppedItem.name}</p>
            <button onClick={() => onRemove()}>Remove</button>
          </div>
        ) : (
          <div className="placeholder">Drop here</div>
        )}
      </div>
    </div>
  );
};

export default DropZone;