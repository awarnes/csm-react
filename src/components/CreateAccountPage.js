import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl } from 'react-bootstrap'

export default class CreateAccountPage extends Component {

  // getValidationState () {
  //
  //   let checkAccount = this.props.accountName
  //
  //   fetch('https://csm-5e.firebaseio.com/users.json')
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((json) => {
  //       if(Object.keys(json).find((name) => {return name === checkAccount}) === 'undefined') {
  //         return 'success'
  //       }
  //       else return 'danger'
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

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
