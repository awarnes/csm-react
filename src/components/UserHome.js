import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* global fetch */

export default class UserHome extends Component {
  constructor (props) {
    super(props)

    this.renderAccountInfo = this.renderAccountInfo.bind(this)
  }

  renderAccountInfo () {
    let dispArray = []

    Object.entries(this.props.activeAccountInfo).forEach((entry) => {
      dispArray.push(entry)
    })

    return dispArray
  }

  componentWillMount () {
    fetch(`https://csm-5e.firebaseio.com/users/${this.props.activeAccount}.json`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.props.updateActiveAccountInfo(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h1 id='welcome-user'>Hello, {this.props.match.params.user}!</h1>
        <p>{this.renderAccountInfo()}</p>
      </div>
    )
  }
}

UserHome.propTypes = {
  activeAccount: PropTypes.string,
  updateActiveAccountInfo: PropTypes.func,
  activeAccountInfo: PropTypes.object,
  match: PropTypes.object
}
