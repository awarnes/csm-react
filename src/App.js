import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './components/LandingPage'
import LogInPage from './components/LogInPage'
import CreateAccountPage from './components/CreateAccountPage'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      createAccount: '',
      loginAccount: ''
    }
    this.onLoginAccountNameInput = this.onLoginAccountNameInput.bind(this)
    this.onCreateAccountNameInput = this.onCreateAccountNameInput.bind(this)
  }

  onLoginAccountNameInput (event) {
    this.setState({loginAccount: event.target.value})
  }

  onCreateAccountNameInput (event) {
    this.setState({createAccount: event.target.value})
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (<LandingPage {...props} />)} />
          <Route path='/login_account'
                 render={props => (<LogInPage {...props}
                                              onAccountNameInput={this.onLoginAccountNameInput}
                                              accountName={this.state.loginAccount}/>)} />
          <Route path='/create_account'
                 render={props => (<CreateAccountPage {...props}
                                                      onAccountNameInput={this.onCreateAccountNameInput}
                                                      accountName={this.state.createAccount} />)} />
        </div>
      </Router>
    )
  }
}
