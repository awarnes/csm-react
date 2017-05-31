import React, { Component } from 'react'

export default class TopInfo extends Component {
  render () {
    let charClass, charRace

    if (this.props.character.prestige) {
      charClass = `${this.props.character.prestige} ${this.props.character.klass}`
    } else {
      charClass = this.props.character.klass
    }

    if (this.props.character.subrace !== 'None') {
      charRace = `${this.props.character.race} (${this.props.character.subrace})`
    } else {
      charRace = this.props.character.race
    }

    return (
      <div>
        <div>
          <p>{this.props.character.name}</p>
          <p>{this.props.character.username}</p>
        </div>
        <div>
          <p>{this.props.character.level}</p>
          <p>{charClass}</p>
          <p>{charRace}</p>
          <p>{this.props.character.background}</p>
          <p>{this.props.character.alignment}</p>
          <p>{this.props.character.xp}</p>
        </div>
      </div>
    )
  }
}
