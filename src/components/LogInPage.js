import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class LogInPage extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
    this.checkValidationState = this.checkValidationState.bind(this)
    this.handleLogInClick = this.handleLogInClick.bind(this)
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

  handleLogInClick () {
    this.props.updateActiveAccount(this.props.accountName)
  }

  componentWillMount () {
    this.props.updateDbAccounts()
  }

  render () {
    const linkStyle = this.checkValidationState() ? {pointerEvents: 'none'} : {}

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
          <Button type='button' id='loginAccount-btn' onClick={e => e.preventDefault()} disabled={this.checkValidationState()}>
            <Link id='loginAccount-link' style={linkStyle} to={`/users/${this.props.accountName}/home`} onClick={this.handleLogInClick}>Log In</Link></Button>
        </FormGroup>

        <Button type='button' id='quit-btn'><Link id='quit-link' to='/'>Quit</Link></Button>
      </div>
    )
  }
}

LogInPage.propTypes = {
  onAccountNameInput: PropTypes.func,
  accountName: PropTypes.string,
  updateDbAccounts: PropTypes.func,
  dbAccounts: PropTypes.object,
  updateActiveAccount: PropTypes.func
}
