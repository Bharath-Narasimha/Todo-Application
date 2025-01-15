import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './index.css';

const Sidebar = ({ isOpen, tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="profile">
        <img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866304/mordx449pktog4ktljt9.png" alt="Profile" className="profile-img" />
  <p className='profile-text'>Hey, ABCD</p>
      </div>
      <ul className="menu">
        <li><img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866303/d58widwmionyxcmztymk.png" alt="All Tasks" className="menu-icon" /> All Tasks</li>
        <li className="active"><img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866303/tyag6utnyhwlzsv3bn74.png" alt="Today" className="menu-icon" /> Today</li>
        <li><img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866303/tec05rxemsusoy4o5l0l.png" alt="Important" className="menu-icon" /> Important</li>
        <li><img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866303/uamv0fnqdwokqps0rllq.png" alt="Planned" className="menu-icon" /> Planned</li>
        <li><img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866303/iaiyizsblzp93yf88hmb.png" alt="Assigned to me" className="menu-icon" /> Assigned to me</li>
      </ul>
      <div className='add-list'><img src="https://res.cloudinary.com/dhhhojjlp/image/upload/v1736866304/nxnn1zoy5386i7wycvhv.png" alt="Add list" className="menu-icon" /> Add list</div>

      <div className="tasks-summary">
        <div className='tasks-sum1'>
        <h3>Today Tasks</h3>
        <p>{totalTasks}</p>
        </div>
        <PieChart
          data={[
            { title: 'Pending', value: pendingTasks, color: '#28a745' },
            { title: 'Done', value: completedTasks, color: '#155724' },
          ]}
          style={{ height: '150px' }}
          lineWidth={40}
          animate
        />
        <div className="chart-legend">
          <div><span className="legend-dot pending"></span> Pending</div>
          <div><span className="legend-dot done"></span> Done</div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
