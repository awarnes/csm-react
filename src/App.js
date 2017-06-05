import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './components/LandingPage'
import LogInPage from './components/LogInPage'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountName: ''
    }
    this.onAccountNameInput = this.onAccountNameInput.bind(this)
  }

  onAccountNameInput (event) {
    this.setState({accountName: event.target.value})
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (<LandingPage {...props} />)} />
          <Route path='/login' render={props => (<LogInPage {...props} onAccountNameInput={this.onAccountNameInput} />)} />
        </div>
      </Router>
    )
  }
}
