import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button, Modal } from 'react-bootstrap'

/* global fetch */

export default class EditBackground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgrounds: {}
    }
  }

  componentWillMount () {
    fetch('https://csm-5e.firebaseio.com/backgrounds.json')
      .then((response) => {
        return response.json()
      })
      .then((backgrounds) => {
        this.setState({backgrounds})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
     <div>
       <h4 id="backgroundTitle">Choose your Background!</h4>
       <h6 id="backgroundSubtitle">Your background gives your character context in life as well as a few skills.</h6>
     </div>
    )
  }
}