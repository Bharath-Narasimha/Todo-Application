import React, { useState, useEffect } from 'react';
import './index.css';
import Calendar from 'react-calendar';  // Import the Calendar component
import 'react-calendar/dist/Calendar.css';
import RepeatOptions from '../../components/RepeatOptions';

const TaskDetails = ({ task, onClose, onDelete, onToggleImportance, onSaveNotes, onToggleCompletion, onSaveDate,onRepeatChange  }) => {
  const [notes, setNotes] = useState(task.notes || '');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(task.dueDate || null);
  const [repeatInterval, setRepeatInterval] = useState(task.repeatInterval || '');

  useEffect(() => {
    // Sync repeatInterval with the current task's repeat interval when task changes
    setRepeatInterval(task.repeatInterval || '');
  }, [task]);

  const handleRepeatChange = (newRepeat) => {
    setRepeatInterval(newRepeat);
    onRepeatChange(task.id, newRepeat); // Pass change back to Home component
  };
  useEffect(() => {
    // Set notes to current task notes when the task is selected
    setNotes(task.notes || '');
    setSelectedDate(task.dueDate || null);
  }, [task]);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    // Save the notes to the parent component
    onSaveNotes(task.id, notes);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSaveDate(task.id, date);
    // Optionally, store the selected date with the task or do something with it
    // For example, save it as the task's reminder date
  };
  const handleCheckboxChange = () => {
    // Toggle task completion status
    onToggleCompletion(task.id);
  };

  return (
    <div className="task-details-container">
       <div className="task-details-header">
        <div className='task-sub'>
            <div className='task-sub-1'>
       <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
          className="task-completion-checkbox"
          onClick={handleSaveNotes}
        />
        <p className="task-details-title">{task.text}</p>
        </div>
        <button
          className={`star-btn ${task.important ? 'important' : ''}`}
          onClick={() => {onToggleImportance(task.id)}}
        >
         {task.important?<img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736911934/mfaokmvnyydgqxipeg25.png' alt='star'/>:<img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736911934/rwbnizlftggektej6ie1.png' alt='star'/>} 
        </button>
        </div>
        <div className="task-details-body">
        <div className="task-details-row">
        <button className="icon-btn">
            <div className='icon-buttons'>
        <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736907917/rlnixbgrxidsyedzsdwg.png' alt='plus'/> <p>Add Step</p>
        </div></button>
        </div>
        <div className="task-details-row">
        <button className="icon-btn">
        <div className='icon-buttons'>
        <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736907917/nvipw8kappweqx7v4bqg.png' alt='set remainder'/><p>Set Reminder</p></div></button>
        </div>
        <div className="task-details-row">
          <button className="icon-btn" onClick={()=>{toggleCalendar(); handleSaveNotes()}}>
          <div className='icon-buttons'>
        <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736907918/ndjxipzpwi2le1nraiwd.png' alt='calender'/><p> Calendar</p>
        </div>
          </button>
          {isCalendarOpen && (
            <div className="calendar-view">
              {/* Display calendar */}
              <Calendar
                onChange={handleDateChange}  // Handle date selection
                value={selectedDate || new Date()}  // Currently selected date
              />
              <p>Selected Date:{' '}
              {selectedDate ? selectedDate.toDateString() : 'None'}</p> {/* Optionally display the selected date */}
            </div>
          )}
        </div>
        <div className="task-details-row">
        <button className="icon-btn">
            <div className='icon-buttons'>
        <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736907917/sv4bpsysoqy2faaowg8v.png' alt='repeat'/> <p>Repeat </p></div></button> 
        <RepeatOptions repeatInterval={repeatInterval} onChange={handleRepeatChange} />
        </div>
        <div className="task-details-row">
          <textarea 
            value={notes} 
            onChange={handleNotesChange} 
            placeholder="Add Notes" 
          />
        </div>
      </div>
      </div>

      

      <div className="task-details-footer">
        <button className="close-btn" onClick={()=>{onClose(); handleSaveNotes()}}><img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736908211/eropsap8ufie6h9l03vb.png' alt='cross'/></button>
        <p>Created Today</p>
        <button className="delete-btn" onClick={() => onDelete(task.id)}><img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736908211/hjrpwofkqhk1k2mnfsmn.png' alt='delete'/></button> {/* Task Deletion */}
      </div>
    </div>
  );
};

export default TaskDetails;
