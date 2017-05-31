import React, { Component } from 'react'

export default class SavingThrow extends Component {
  render () {
    let prof = Math.ceil((this.props.character.level / 4) + 1)

    let bonus
    let sign

    if (this.props.score[2]) {
      bonus = prof + Math.floor((this.props.score[1] - 10) / 2)
    } else {
      bonus = Math.floor((this.props.score[1] - 10) / 2)
    }

    if (bonus >= 0) {
      sign = '+'
    } else {
      sign = ''
    }

    return (
      <div>
        <p>{sign}{bonus} {this.props.score[0]}</p>
      </div>
    )
  }
}
