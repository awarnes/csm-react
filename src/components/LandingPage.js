import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {
  render () {
    return (
      <div>
        <h1 id='welcome'>Welcome to CSM!</h1>
        <h4 id='subtitle'>Please choose an option below!</h4>
        <Button id='login-btn'><Link to='/login' style={{display: 'block', height: '100%'}}>Log In!</Link></Button>
      </div>
    )
  }
}

// LandingPage.propTypes = {
//   onCreateCharacter: PropTypes.func
// }
