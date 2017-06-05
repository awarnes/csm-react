import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl } from 'react-bootstrap'

export default class LogInPage extends Component {
  render () {
    return (
      <div>
        <h1>Please create an account!</h1>
        <FormControl
          type='text'
          placeholder='Enter Account Name...'
          onChange={this.props.onAccountNameInput}
          id='accountName-input'
          />
        <Button type='button' id='loginAccount-btn'>Enter</Button>
      </div>
    )
  }
}

LogInPage.propTypes = {
  onAccountNameInput: PropTypes.func
}
