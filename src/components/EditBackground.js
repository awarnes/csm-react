import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {SUCCESS_STYLE, DEFAULT_STYLE} from '../utils'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button } from 'react-bootstrap'

export default class EditBackground extends Component {
  constructor (props) {
    super(props)

    this.setBackground = this.setBackground.bind(this)
    this.checkButtonStyle = this.checkButtonStyle.bind(this)
    this.renderBackgroundButtons = this.renderBackgroundButtons.bind(this)
  }

  setBackground (background) {
    this.props.updateBackground(background)
  }

  checkButtonStyle (property) {
    return this.props.activeCharacterBackground === property ? SUCCESS_STYLE : DEFAULT_STYLE
  }

  renderBackgroundButtons () {
    const backgroundButtons = Object.entries(this.props.dbBackgrounds).map((entry) => {
      return <Button type='button'
        id={`${entry[0]}-btn`}
        key={`${entry[0]}-btn`}
        onClick={() => { this.setBackground(entry[0]) }}
        bsStyle={this.checkButtonStyle(entry[0])}>{entry[0]}</Button>
    })

    return backgroundButtons
  }

  render () {
    return (
      <div>
        <h4 id='backgroundTitle'>Choose your Background!</h4>
        <h6 id='backgroundSubtitle'>Your background gives your character history as well as access to a few skills.</h6>
        <div id='backgroundButtons'>
          {this.renderBackgroundButtons()}
        </div>
      </div>
    )
  }
}

EditBackground.propTypes = {
  activeCharacterBackground: PropTypes.string,
  updateBackground: PropTypes.func,
  dbBackgrounds: PropTypes.object
}
