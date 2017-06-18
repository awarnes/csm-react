import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {SUCCESS_STYLE, WARNING_STYLE} from '../utils'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

export default class EditName extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
  }

  getValidationState () {
    return this.props.activeCharacterName.length < 2 ? WARNING_STYLE : SUCCESS_STYLE
  }

  render () {
    return (
      <div>
        <h4 id='nameTitle'>Edit your Character's Name!</h4>
        <h6 id='nameSubtitle'>If you want to change your character's name, type a new one into the box below.</h6>
        <FormGroup validationState='success'>
          <FormControl
            id='characterName-text'
            value={this.props.activeCharacterName}
            placeholder='Enter name here...'
            onChange={this.props.updateName} />
          <FormControl.Feedback />
          <HelpBlock>It will save as you type!</HelpBlock>
        </FormGroup>
      </div>
    )
  }
}

EditName.propTypes = {
  activeCharacterName: PropTypes.string,
  updateName: PropTypes.func
}
