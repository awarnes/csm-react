import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FormControl } from 'react-bootstrap'

export default class EditDescription extends Component {
  render () {
    return (
      <div>
        <h4 id='descTitle'>Edit your Charater's Description!</h4>
        <h6 id='descSubtitle'>Here you can create a story for your character, describe their physique, or leave it blank!</h6>

        <FormControl componentClass='textarea'
          id='descTextArea'
          onChange={this.props.updateDescription}
          value={this.props.descText}
        />
      </div>
    )
  }
}

EditDescription.propTypes = {
  updateDescription: PropTypes.func,
  descText: PropTypes.string
}
