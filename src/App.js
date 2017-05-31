import React, { Component } from 'react'
import './App.css'

import LandingPage from './components/LandingPage'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }

    this.onCreateCharacter = this.onCreateCharacter.bind(this)
  }
  onCreateCharacter () {

  }
  render () {
    return (
      <div>
        <LandingPage />
      </div>
    )
  }
}
