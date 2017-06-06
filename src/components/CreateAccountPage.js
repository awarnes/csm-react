import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl } from 'react-bootstrap'

export default class CreateAccountPage extends Component {
  render () {
    return (
      <div>
        <h1>Please enter an account name to continue!</h1>
        <FormControl
          type='text'
          placeholder='Enter Account Name...'
          onChange={this.props.onAccountNameInput}
          id='accountName-input'
          />
        <Button type='button' id='createAccount-btn'>Enter</Button>
      </div>
    )
  }
}

CreateAccountPage.propTypes = {
  onAccountNameInput: PropTypes.func
}
