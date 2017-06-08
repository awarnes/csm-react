import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './components/LandingPage'
import LogInPage from './components/LogInPage'
import CreateAccountPage from './components/CreateAccountPage'
import UserHome from './components/UserHome'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      createAccount: '',
      loginAccount: '',
      activeAccount: '',
      activeAccountInfo: {},
      dbAccounts: {}

    }

    this.onLoginAccountNameInput = this.onLoginAccountNameInput.bind(this)
    this.onCreateAccountNameInput = this.onCreateAccountNameInput.bind(this)
    this.updateDBAccounts = this.updateDBAccounts.bind(this)
    this.updateActiveAccount = this.updateActiveAccount.bind(this)
    this.updateActiveAccountInfo = this.updateActiveAccountInfo.bind(this)
  }

  updateDBAccounts (json) {
    this.setState({dbAccounts: json})
  }

  updateActiveAccount (account) {
    this.setState({activeAccount: account})
  }

  updateActiveAccountInfo (json) {
    this.setState({activeAccountInfo: json})
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

            <Route path='/users/:user/home'
                   render={props => (<UserHome {...props}
                     activeAccount={this.state.activeAccount}
                     updateActiveAccountInfo={this.updateActiveAccountInfo}
                     activeAccountInfo={this.state.activeAccountInfo} />)} />

            <Route path='/login_account'
              render={props => (<LogInPage {...props}
                onAccountNameInput={this.onLoginAccountNameInput}
                accountName={this.state.loginAccount}
                updateDBAccounts={this.updateDBAccounts}
                dbAccounts={this.state.dbAccounts}
                updateActiveAccount={this.updateActiveAccount} />)} />

            <Route path='/create_account'
              render={props => (<CreateAccountPage {...props}
                onAccountNameInput={this.onCreateAccountNameInput}
                accountName={this.state.createAccount}
                updateDBAccounts={this.updateDBAccounts}
                dbAccounts={this.state.dbAccounts}
                updateActiveAccount={this.updateActiveAccount}/>)} />
        </div>
      </Router>
    )
  }
}
