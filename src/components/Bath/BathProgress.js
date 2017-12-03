import React from 'react';
import './index.css';


const Bath = (props) => {
  return (
    <div className="BathProgress">
      <div className="correctAnswers" style={{ width: props.correct + '%' }} />
      <div className="wrongAnswers" style={{ width: props.wrong + '%' }} />
    </div>
  )
}

export default Bath;
