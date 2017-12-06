import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import * as TranslateLevels from '../../resources/translateLevels';
import { changeLevel } from '../../store/actions/user';


class Level extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newLevel: null,
      height: null,
      collapsed: props.location.hash === '#words',
    }
  }

  componentDidMount() {
    //user is in store
    this.setState({ newLevel: this.props.level });
  }

  componentWillReceiveProps(nextProps) { // collapses, when /settings > /settings#words without re-render
    nextProps.location.hash === '#words' && this.setState({ collapsed: true });
  }

  expand = () => {
    this.setState({ collapsed: false });
  }

  collapse = () => {
    this.setState({ collapsed: true });
  }

  setLevel = () => {
    this.setState({ collapsed: true });

    const levelNum = TranslateLevels.strToNum(this.state.newLevel)

    changeLevel(levelNum)
      .then( action => {
        if (action.payload._id) this.props.dispatch(action);
      });
  }

  handleCancel = () => {
    this.setState({ collapsed: true, newLevel: this.props.level });
  }

  handleChange = (event) => {
    this.setState({ newLevel: event.currentTarget.value });

    this.calcHeight();
  }

  calcHeight(node) {
    if (node && !this.state.height) {
      this.setState({ height: node.offsetHeight });
    }
  }

  render() {
    return (
      <div className="Level" style={ this.state.collapsed ? { height: 50 + 'px' } : { height: this.state.height && this.state.height + 'px'} }>

        <div className="leftCol">
          <h2>Level</h2>
        </div>

        { this.state.newLevel && <span>

          { this.state.collapsed &&
            <div className="rightCol">
              { this.props.level  }
              <button className="small" style={{ marginLeft: 20 + 'px' }} onClick={ this.expand } >
                <span className="icon ion-edit" />
                change
              </button>
            </div>
          }

          <div className="rightCol"
            style={ this.state.collapsed ? { visibility: 'hidden' } : { visibility: 'visible' } }
           ref={(node) => this.calcHeight(node)  }>
            <strong>How proficient is your German?</strong> You will be presented with sentences that fit your skill level.
            <ul>
              <li>
                <label>
                  <input type="radio" name="level" value="basic"
                    checked={ this.state.newLevel === 'basic' }
                    onChange={ this.handleChange } />
                  <strong>basic</strong>
                </label>
                <p><em>Deutsch ist eine schöne Sprache.</em></p>
              </li>
              <li>
                <label>
                  <input type="radio" name="level" value="intermediate"
                    checked={ this.state.newLevel === 'intermediate' }
                    onChange={ this.handleChange } />
                  <strong>intermediate</strong>
                </label>
                <p><em>Ich würde gerne besser Deutsch lernen.</em></p>
              </li>
              <li>
                <label>
                  <input type="radio" name="level" value="advanced"
                    checked={ this.state.newLevel === 'advanced' }
                    onChange={ this.handleChange } />
                  <strong>advanced</strong>
                </label>
                <p><em>Mir gefällt, dass deutsche Sätze wie der Rhein durch ein Tal zu mäandern scheinen, bevor ein Verb kommt.</em></p>
              </li>
            </ul>
            <button onClick={ this.handleCancel } >Cancel</button>
            <button className="default" onClick={ this.setLevel } style={{ marginLeft: 10 + 'px' }} >Set level</button>
          </div>

        </span> }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { level: TranslateLevels.numToStr(state.user.level) };
}

export default connect(mapStateToProps)(Level);
