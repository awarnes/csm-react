import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {
  render () {
    return (
      <div>
        <h1 id='welcome'>Welcome to CSM!</h1>
        <h4 id='subtitle'>Please choose an option below!</h4>
        <Button id='loginAccount-btn'>
          <Link id='loginAccount-link'
            to='/login_account'
            style={{display: 'block', height: '100%'}}>Log into Account!</Link></Button>

        <Button id='createAccount-btn'>
          <Link id='createAccount-link'
            to='/create_account'
            style={{display: 'block', height: '100%'}}>Create an Account!</Link></Button>
      </div>
    )
  }
}
