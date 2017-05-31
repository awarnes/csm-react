import React, { Component } from 'react'
import PropType from 'prop-types'

export default class HpBox extends Component {
  render () {
    return (
      <div>
        <div>
          <p>Hit Points:</p>
          <p>{this.props.character.currHP}/{this.props.character.totalHP}</p>
        </div>
        <div>
          <p>Temporary Hit Points:</p>
          <p>{this.props.character.tempHP}</p>
        </div>
        <div>
          <p>Where death saves will go!</p>
        </div>
      </div>
    )
  }
}

HpBox.propTypes = {
  character: PropType.object
}
