import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import TaskDetails from '../../components/TaskDetails'; // Import TaskDetails component
import './index.css';
import { v4 as uuidv4 } from 'uuid'; // For unique task ID generation
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css';
import RepeatOptions from '../../components/RepeatOptions';

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [selectedTask, setSelectedTask] = useState(null); // Add state for selected task
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // For the add-task calendar
  const [selectedDate, setSelectedDate] = useState(null); // Selected date for new task
  const [isRepeatOptionsOpen, setIsRepeatOptionsOpen] = useState(false); 
  const [repeatInterval, setRepeatInterval] = useState(''); 
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever the task list changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  const saveTaskDate = (id, date) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, dueDate: date } : task
      )
    );
  };
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const toggleTaskImportance = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, important: !task.important };
        }
        return task;
      });
    });
  };
  

  const addTask = () => {
    if (newTaskText.trim() === "") {
      setErrorMessage("Task text cannot be empty!");
      return;
    }
    const newTask = {
      id: uuidv4(), // Use uuid for a unique task ID
      text: newTaskText,
      completed: false,
      important: false,
      dueDate: selectedDate,
      repeatInterval: repeatInterval, 
       // Default value for importance
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTaskText(""); // Clear the input field
    setErrorMessage("");
    setSelectedDate(null); // Reset the date picker
    setIsCalendarOpen(false); 
    setRepeatInterval('');  // Clear error message
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    closeTaskDetails(); // Close task details modal on delete
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task); // Set the selected task
  };

  const closeTaskDetails = () => {
    setSelectedTask(null); // Clear the selected task
  };

  const toggleCalender = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleSaveNotes = (id, notes) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, notes } : task
      )
    );
  };



  const toggleRepeatOptions = () => {
    setIsRepeatOptionsOpen(!isRepeatOptionsOpen); // Toggle visibility of repeat options
  };

  const handleRepeatChange = (taskId, newRepeat) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, repeatInterval: newRepeat } : task
      )
    );
    setIsRepeatOptionsOpen(false); // Close repeat options after selection
  };
  return (
    <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="main">
      <Sidebar isOpen={isSidebarOpen} tasks={tasks} />

        <div className="content">
          {/* Add Task Section */}
          <div className="add-task-container">
            <div>
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add A Task"
              />
            </div>
            <div className="task-contain">
              <div className="icon">
                {/* Add icons */}
                <img
                  src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736901417/qt5lpcwsgkt6jhpmgxo4.png"
                  alt="bell"
                  className="task-icon"
                />
                 <div className="repeat-icon-container">
          <img
            src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736901417/hfkov73saxijjew7qqgy.png"
            alt="Repeat"
            className="repeat-icon"
            onClick={toggleRepeatOptions} // Toggle the repeat options on click
          />
        </div>
                <img
                  src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736901417/zppjy84nq80y7vsffh5t.png"
                  alt="calendar"
                  className="task-icon"
                  onClick={toggleCalender}
                />
              </div>
              <button className="add-task-btn" onClick={addTask}>
                ADD TASK
              </button>
            </div>
          </div>
           {/* Repeat Options Modal */}
        {isRepeatOptionsOpen && (
          <RepeatOptions repeatInterval={repeatInterval} onChange={setRepeatInterval} />
        )}
        {/* Calendar for Adding Task */}
        {isCalendarOpen && (
            <div className="add-task-calendar">
              <Calendar
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate || new Date()} // Default to today's date
              />
              <p>
                Selected Date:{' '}
                {selectedDate ? selectedDate.toDateString() : 'None'}
              </p>
            </div>
          )}
          {/* Error Message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Task List */}
          <div className="task-list">
            {tasks
              .sort((a, b) => a.completed - b.completed) // Sort by completed status
              .map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? 'task-completed' : ''}`}
                  onClick={() => openTaskDetails(task)} // Open task details on click
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className='check-box' // Toggle task completion
                  />
                  <span className='check-text'>{task.text}</span>
                  <button
                    className='star-btn'
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering task details
                      toggleTaskImportance(task.id); // Toggle importance
                    }}
                  >
                   {task.important?<img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736911934/mfaokmvnyydgqxipeg25.png' alt='star'/>:<img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736911934/rwbnizlftggektej6ie1.png' alt='star'/>} 

                  </button>
                  
                </div>
              ))}
          </div>

         
        </div>

        {/* Render TaskDetails if a task is selected */}
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={closeTaskDetails}
            onDelete={() => {
              deleteTask(selectedTask.id);  // Delete task
              closeTaskDetails();            // Close modal
            }}
            onToggleImportance={toggleTaskImportance}
            onToggleCompletion={toggleTaskCompletion}
            onSaveNotes={handleSaveNotes} 
            onSaveDate={saveTaskDate}
            onRepeatChange={handleRepeatChange} // Pass the toggle importance function
          />
        )}
      </div>
    </div>
  );
};

export default Home;
