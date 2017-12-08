import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';


const SetWordsChosen = (props) => {
  return(
    <div className="chosen">
      <div className="leftCol">
        <h2>Your Bath</h2>
      </div>
      <div className="rightCol">
        These are the words you&#39;ve chosen.

        <div className="chosen-words">

          { props.chosenLexemes
              .map( lexeme => {
                return (
                  <div className="word" key={ lexeme.id } >
                    { lexeme.lexeme }
                    <div className="removeButton" id={ lexeme.id } onClick={ props.handleRemove } />
                  </div>
                )
              })
          }

        </div>
        <div style={{clear: 'both'}}></div>
      </div>

      { props.chosenLexemes.length > 0 &&
        <div  style={{ textAlign: 'center', marginTop: 30 + 'px' }}>
        <Link to="bath"><button className="default">learn!</button></Link>
        </div>
      }
    </div>
  )
}


export default SetWordsChosen;
