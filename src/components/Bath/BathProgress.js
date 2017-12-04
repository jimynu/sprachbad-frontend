import React from 'react';
import './index.css';


const Bath = ({correct, wrong}) => {
  return (
    <div className="BathProgress">
      <div className="correctAnswers" style={{ width: correct + '%' }} />
      <div className="wrongAnswers" style={{ width: wrong + '%' }} />
    </div>
  )
}

export default Bath;
