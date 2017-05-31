import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LandingPage extends Component {
  render () {
    return (
      <div>
        <h1 id='welcome'>Welcome to CSM!</h1>
        <h4 id='subtitle'>Please choose an option below!</h4>
        <button id='createCharacter-btn' onClick={this.props.onCreateCharacter}>Create a New Character</button>
      </div>
    )
  }
}

LandingPage.propTypes = {
  onCreateCharacter: PropTypes.func
}
