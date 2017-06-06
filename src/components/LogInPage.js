import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, FormGroup } from 'react-bootstrap'

export default class LogInPage extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
  }

  getValidationState () {
    let checkInfo = this.props.accountName

    if(checkInfo.length < 3) {
      return "warning"
    } else if (checkInfo.length >= 3) {
      return "success"
    }
  }



  render () {
    return (
      <div>
        <h1>Please enter your account name to continue!</h1>
        <FormGroup
          validationState={this.getValidationState()}>
          <FormControl
            type='text'
            placeholder='Enter Account Name...'
            onChange={this.props.onAccountNameInput}
            id='accountName-input'
            value={this.props.accountName}
            />
          <FormControl.Feedback />
          <Button type='button' id='loginAccount-btn'>Enter</Button>
        </FormGroup>
      </div>
    )
  }
}

LogInPage.propTypes = {
  onAccountNameInput: PropTypes.func,
  accountName: PropTypes.string
}
