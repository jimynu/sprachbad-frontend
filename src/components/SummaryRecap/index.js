import React from 'react';
import './index.css';


// only shown after a learning session
const Recap = (props) => {
  return (
    <div className="Recap">
      <div className="leftCol">
        <h2>Recap</h2>
      </div>
      <div className="rightCol">
        You&#39;re doing great! Some feedback on this session:

        <ul>
          { props.bath.sentences.map( (sentence) => {
            return (
              <li
                key={ sentence.lexemeId }
                className={ sentence.success ? 'correct' : 'wrong' } >
                  { sentence.task.q[0] + ' ' }
                  { !sentence.success && <span className="wrongAnswer">{ sentence.answer }</span>
                  }
                  <span className="correctAnswer">{ ' ' + sentence.task.a }</span>
                  { ' ' + sentence.task.q[1] }
              </li>
            )
          } )}
        </ul>

      </div>
    </div>
  );
}



export default Recap;
