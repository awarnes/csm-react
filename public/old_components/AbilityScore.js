import React, { Component } from 'react'

export default class AbilityScore extends Component {
  render () {
    let bonus = Math.floor((this.props.score[1] - 10) / 2)

    let sign

    if (bonus >= 0) {
      sign = '+'
    } else {
      sign = ''
    }

    return (
      <p>
        {this.props.score[0]} <br />
        {this.props.score[1]} <br />
        {sign}{bonus}
      </p>
    )
  }
}
