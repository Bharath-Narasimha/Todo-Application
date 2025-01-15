import React, { useState } from 'react';
import './index.css';

const RepeatOptions = ({ repeatInterval, onChange }) => {
  const [customRepeat, setCustomRepeat] = useState(false);

  const handleRepeatChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setCustomRepeat(true);
    } else {
      setCustomRepeat(false);
      onChange(value); // Pass selected value to parent
    }
  };

  const handleCustomRepeatChange = (e) => {
    const value = e.target.value;
    if (value) {
      onChange(`custom:${value}`); // Custom interval, e.g., 'custom:3'
    }
  };

  return (
    <div className="repeat-options">
      <select value={repeatInterval || ''} onChange={handleRepeatChange} className='repeat-options'>
        <option value="">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="custom">Custom...</option>
      </select>
      {customRepeat && (
        <div className="custom-repeat">
          <label>Every:</label>
          <input
            type="number"
            min="1"
            placeholder="Number of days"
            onChange={handleCustomRepeatChange}
          />
          <span>days</span>
        </div>
      )}
    </div>
  );
};

export default RepeatOptions;
