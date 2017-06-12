import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './components/LandingPage'
import LogInPage from './components/LogInPage'
import CreateAccountPage from './components/CreateAccountPage'
import UserHome from './components/UserHome'

import EditCharacter from './components/EditCharacter'

/* global fetch */

const SERVER_ROOT = 'https://csm-5e.firebaseio.com'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      createAccount: '',
      loginAccount: '',
      activeAccount: '',
      activeAccountInfo: {},
      dbAccounts: {},
      activeCharacterId: '',
      activeCharacter: {},
      characterName: ''
    }

    this.onLoginAccountNameInput = this.onLoginAccountNameInput.bind(this)
    this.onCreateAccountNameInput = this.onCreateAccountNameInput.bind(this)
    this.updateDbAccounts = this.updateDbAccounts.bind(this)
    this.updateActiveAccount = this.updateActiveAccount.bind(this)
    this.updateActiveAccountInfo = this.updateActiveAccountInfo.bind(this)
    this.clearActiveAccount = this.clearActiveAccount.bind(this)
    this.onCharacterNameInput = this.onCharacterNameInput.bind(this)
    this.updateActiveCharacter = this.updateActiveCharacter.bind(this)
    this.createCharacter = this.createCharacter.bind(this)
  }

  updateDbAccounts () {
    fetch(`${SERVER_ROOT}/users.json`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json === null) {
          this.setState({dbAccounts: {}})
        } else {
          this.setState({dbAccounts: json})
        }
      })
      .catch((error) => {
        console.log(error)
      })
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

  clearActiveAccount () {
    this.setState({activeAccount: '', activeAccountInfo: {}})
  }

  onCharacterNameInput (event) {
    this.setState({characterName: event.target.value})
  }

  updateActiveCharacter (uid) {
    fetch(`${SERVER_ROOT}/characters/${uid}.json`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({activeCharacter: json})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  createCharacter () {
    const postData = {
      method: 'POST',
      body: JSON.stringify({charName: this.state.characterName})
    }

    fetch(`${SERVER_ROOT}/characters.json`, postData)
      .then((response) => {
        return response.json()
      })
      .then((charUid) => {
        this.setState({activeCharacterId: charUid.name})

        let characterInfo = Object.assign(this.state.activeAccountInfo, {[charUid.name]: this.state.characterName})
        const putData = {
          method: 'PUT',
          body: JSON.stringify(characterInfo)
        }

        return fetch(`${SERVER_ROOT}/users/${this.state.activeAccount}/characters.json`, putData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (<LandingPage {...props} />)} />

          <Route path='/login_account'
            render={props => (<LogInPage {...props}
              onAccountNameInput={this.onLoginAccountNameInput}
              accountName={this.state.loginAccount}
              updateDbAccounts={this.updateDbAccounts}
              dbAccounts={this.state.dbAccounts}
              updateActiveAccount={this.updateActiveAccount} />)} />

          <Route path='/create_account'
            render={props => (<CreateAccountPage {...props}
              onAccountNameInput={this.onCreateAccountNameInput}
              accountName={this.state.createAccount}
              updateDbAccounts={this.updateDbAccounts}
              dbAccounts={this.state.dbAccounts}
              updateActiveAccount={this.updateActiveAccount} />)} />

          <Route path='/users/:user/home'
            render={props => (<UserHome {...props}
              updateActiveAccountInfo={this.updateActiveAccountInfo}
              updateActiveAccount={this.updateActiveAccount}
              activeAccountInfo={this.state.activeAccountInfo}
              clearActiveAccount={this.clearActiveAccount}
              createCharacter={this.createCharacter}
              onCharacterNameInput={this.onCharacterNameInput}
              characterName={this.state.characterName} />)} />

          <Route path='/characters/:uid/edit'
            render={props => (<EditCharacter {...props}
              activeCharacter={this.state.activeCharacter}
              updateActiveCharacter={this.updateActiveCharacter} />)} />
        </div>
      </Router>
    )
  }
}
