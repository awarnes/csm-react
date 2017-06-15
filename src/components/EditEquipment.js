import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button } from 'react-bootstrap'
// import {BASE_ABILITY_SCORES} from '../utils'

export default class EditEquipment extends Component {
  render () {
    return (
      <div>
        <h4 id="equipmentTitle">Choose your Equipment!</h4>
        <h6 id="equipmentSubtitle">Equipment helps you carry out tasks, protects you, and are the tools you use to smite enemies!</h6>
        <div id="equipmentButtons">
          <Button id="armor-btn">Armor</Button>
          <Button id="weapons-btn">Weapons</Button>
          <Button id="items-btn">Item</Button>
          <Button id="tools-btn">Tools</Button>
        </div>
      </div>
    )
  }
}

EditEquipment.propTypes = {
  dbEquipment: PropTypes.object
}
