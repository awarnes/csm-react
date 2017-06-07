import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, FormGroup } from 'react-bootstrap'

/* global fetch */

export default class LogInPage extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
    this.checkValidationState = this.checkValidationState.bind(this)
  }

  getValidationState () {
    let checkInfo = this.props.accountName

    let found = Object.keys(this.props.dbAccounts).findIndex((name) => {
      return name === checkInfo
    })

    if (found === -1) {
      return 'warning'
    } else if (found !== -1) {
      return 'success'
    }
  }

  checkValidationState () {
    if (this.getValidationState() === 'warning') {
      return true
    } else {
      return false
    }
  }

  componentWillMount () {
    fetch('https://csm-5e.firebaseio.com/users.json')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.props.updateDBAccounts(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h1>Please enter your account name to continue!</h1>
        <FormGroup
          id='loginFormGroup'
          validationState={this.getValidationState()}>
          <FormControl
            type='text'
            placeholder='Enter Account Name...'
            onChange={this.props.onAccountNameInput}
            id='accountName-input'
            value={this.props.accountName}
            />
          <FormControl.Feedback />
          <Button type='button' id='loginAccount-btn' onClick={this.onLoginClick} disabled={this.checkValidationState()}>Log In</Button>
        </FormGroup>
      </div>
    )
  }
}

LogInPage.propTypes = {
  onAccountNameInput: PropTypes.func,
  accountName: PropTypes.string,
  updateDBAccounts: PropTypes.func,
  dbAccounts: PropTypes.object
}
