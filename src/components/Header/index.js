import React from 'react';
import './index.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="logo">
        <button className="icon-btn" onClick={toggleSidebar}>
          <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736865681/jp97cufewrt02e47v53n.png' alt='mode' className='icon-btn'/>
        </button>
        <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736864781/upd2v0blgs6eb5oqb46d.png' alt="Logo" className="logo-img" />
        <span className="logo-text">
          <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736864780/obkmobykovgmdblgrok9.png' alt="Logo-img" className="logo-img" />
        </span>
      </div>
      <div className="header-actions">
        <input className="search-input" type="text" placeholder="Search..." />
        <div className="icons">
          <button className="icon-btn">
            <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736864780/waszhv5rdebiunts3p28.png' alt='more' className='icon-btn'/>
          </button>
          <button className="icon-btn">
            <img src='https://res.cloudinary.com/dhhhojjlp/image/upload/v1736864780/fziiifbvgntpbyds1kmg.png' alt='mode' className='icon-btn'/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
