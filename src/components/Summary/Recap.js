import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';


// only shown after a learning session
class Recap extends Component {
  render() {
    return (
      <div className="Recap">
        <div className="leftCol">
          <h2>Recap</h2>
        </div>
        <div className="rightCol">
          You&#39;re doing great! Some feedback on this session:

          <ul>
            { this.props.bath.sentences.map( (sentence) => {
              return (
                <li
                  key={ sentence.lexemeId }
                  className={ sentence.success ? 'correct' : 'wrong' } >
                    { sentence.task.q[0] + ' ' }
                    { sentence.success
                      ? ''
                      : <span className="wrongAnswer">{ sentence.answer }</span>
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
}


const mapStateToProps = (state, props) => {
  return { bath: state.bath }
}

export default connect(mapStateToProps)(Recap);
