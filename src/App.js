import React, { Component } from 'react'
import _ from 'lodash'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './components/LandingPage'
import LogInPage from './components/LogInPage'
import CreateAccountPage from './components/CreateAccountPage'
import UserHome from './components/UserHome'
import EditCharacter from './components/EditCharacter'

import { BASE_ABILITY_SCORES } from './utils'

/* global fetch */

const SERVER_ROOT = 'https://csm-5e.firebaseio.com'

const DATA_LOOKUP = [
  {url: 'backgrounds', state: 'dbBackgrounds'},
  {url: 'skills', state: 'dbSkills'},
  {url: 'klasses', state: 'dbCharacterClasses'},
  {url: 'prestiges', state: 'dbPrestiges'},
  {url: 'races', state: 'dbRaces'},
  {url: 'subraces', state: 'dbSubraces'},
  {url: 'equipment', state: 'dbEquipment'}
]

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
      characterName: '',
      dbBackgrounds: {},
      dbSkills: {},
      dbCharacterClasses: {},
      dbPrestiges: {},
      dbRaces: {},
      dbSubraces: {},
      dbEquipment: {}
    }

    this.onLoginAccountNameInput = this.onLoginAccountNameInput.bind(this)
    this.onCreateAccountNameInput = this.onCreateAccountNameInput.bind(this)
    this.updateDbAccounts = this.updateDbAccounts.bind(this)
    this.updateActiveAccount = this.updateActiveAccount.bind(this)
    this.updateActiveAccountInfo = this.updateActiveAccountInfo.bind(this)
    this.clearActiveAccount = this.clearActiveAccount.bind(this)
    this.onCharacterNameInput = this.onCharacterNameInput.bind(this)

    this.updateActiveCharacter = this.updateActiveCharacter.bind(this)
    this.updateAbilityScore = this.updateAbilityScore.bind(this)
    this.updateRace = this.updateRace.bind(this)
    this.updateSubrace = this.updateSubrace.bind(this)
    this.updateClass = this.updateClass.bind(this)
    this.updatePrestige = this.updatePrestige.bind(this)
    this.updateBackground = this.updateBackground.bind(this)
    this.updateSkill = this.updateSkill.bind(this)

    this.createCharacter = this.createCharacter.bind(this)
  }

  updateDbAccounts () {
    fetch(`${SERVER_ROOT}/users.json`)
      .then((response) => response.json())
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

  updateAbilityScore (abilityScores) {
    const newScores = Object.assign({}, BASE_ABILITY_SCORES, this.state.activeCharacter.abilityScores, abilityScores)

    const newActiveCharacter = Object.assign({}, this.state.activeCharacter, {abilityScores: newScores})
    this.setState({activeCharacter: newActiveCharacter}, () => {
      const putData = {
        method: 'PUT',
        body: JSON.stringify(this.state.activeCharacter)
      }

      fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
    })
  }

  updateRace (race) {
    const newRace = Object.assign({}, this.state.activeCharacter, {race})

    this.setState({activeCharacter: newRace}, () => {
      const putData = {
        method: 'PUT',
        body: JSON.stringify(this.state.activeCharacter)
      }

      fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
    })
  }

  updateSubrace (subrace) {
    const newSubrace = Object.assign({}, this.state.activeCharacter, {subrace})

    this.setState({activeCharacter: newSubrace}, () => {
      const putData = {
        method: 'PUT',
        body: JSON.stringify(this.state.activeCharacter)
      }

      fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
    })
  }

  updateClass (characterClass) {
    const newCharacterClass = Object.assign({}, this.state.activeCharacter, {klass: characterClass})

    this.setState({activeCharacter: newCharacterClass}, () => {
      const putData = {
        method: 'PUT',
        body: JSON.stringify(this.state.activeCharacter)
      }

      fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
    })
  }

  updatePrestige (prestige) {
    const newPrestige = Object.assign({}, this.state.activeCharacter, {prestige})

    this.setState({activeCharacter: newPrestige}, () => {
      const putData = {
        method: 'PUT',
        body: JSON.stringify(this.state.activeCharacter)
      }

      fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
    })
  }

  updateBackground (background) {
    const newBackground = Object.assign({}, this.state.activeCharacter, {background})

    this.setState({activeCharacter: newBackground}, () => {
      this.state.dbBackgrounds[this.state.activeCharacter.background].skills.forEach((skill) => {
        this.updateSkill(skill)
      })

      const putData = {
        method: 'PUT',
        body: JSON.stringify(this.state.activeCharacter)
      }

      fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
    })
  }

  updateSkill (skill) {
    const currentCharacter = Object.assign({}, this.state.activeCharacter)
    const newSkills = _.get(currentCharacter, 'skills', [])

    if (newSkills.indexOf(skill) === -1) {
      newSkills.push(skill)
    } else {
      newSkills.splice(newSkills.indexOf(skill), 1)
    }

    const newActiveCharacter = Object.assign({}, this.state.activeCharacter, {skills: newSkills})
    this.setState({activeCharacter: newActiveCharacter})

    const putData = {
      method: 'PUT',
      body: JSON.stringify(this.state.activeCharacter)
    }

    fetch(`${SERVER_ROOT}/characters/${this.state.activeCharacterId}.json`, putData)
      .catch((error) => {
        console.log(error)
      })
  }

  updateActiveCharacter (uid) {
    this.setState({activeCharacterId: uid})

    fetch(`${SERVER_ROOT}/characters/${uid}.json`)
      .then((response) => response.json())
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
      .then((response) => response.json())
      .then((charUid) => {
        this.setState({activeCharacterId: charUid.name})

        let characterInfo = Object.assign({}, this.state.activeAccountInfo, {[charUid.name]: this.state.characterName})
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

  componentWillMount () {
    DATA_LOOKUP.forEach((url, state) => {
      fetch(`${SERVER_ROOT}/${url}`)
      .then((response) => response.json())
      .then((value) => {
        this.setState({[state]: value})
      })
      .catch((error) => {
        console.log(`ERROR fetching ${url}: ` + error)
      })
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
              activeAccount={this.state.activeAccount}
              updateActiveCharacter={this.updateActiveCharacter}
              updateAbilityScore={this.updateAbilityScore}
              updateRace={this.updateRace}
              updateSubrace={this.updateSubrace}
              updateClass={this.updateClass}
              updatePrestige={this.updatePrestige}
              updateBackground={this.updateBackground}
              dbCharacterClasses={this.state.dbCharacterClasses}
              dbPrestiges={this.state.dbPrestiges}
              dbRaces={this.state.dbRaces}
              dbSubraces={this.state.dbSubraces}
              dbSkills={this.state.dbSkills}
              dbBackgrounds={this.state.dbBackgrounds}
              updateSkill={this.updateSkill}
              dbEquipment={this.state.dbEquipment}
            />)} />
        </div>
      </Router>
    )
  }
}
