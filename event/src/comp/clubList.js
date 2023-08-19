import React, { useState } from 'react';
import './css/clublist.css'
const ClubList = ({ title, content,heading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="club-list">
      <div className="club-list-header" onClick={toggleAccordion}>
        <h3 style={{fontWeight:"500" }}>{title}</h3>
        <span className={isOpen ? 'club-list-icon-open' : 'club-list-icon-close'}>
          {isOpen ? '-' : '+'}
        </span>
      </div>
      {isOpen && (
        <div className="club-list-content">
          <h4 style={{fontWeight:"550"}}>Faculty Coordinator : {heading}</h4>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default ClubList;
