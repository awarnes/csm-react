import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button, Modal } from 'react-bootstrap'

export default class EditEquipment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      modalDisplay: ''
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderEquipmentButtons = this.renderEquipmentButtons.bind(this)
  }

  openModal (displayName) {
    this.setState({showModal: true, modalDisplay: displayName})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  setEquipment (currentEquipment) {

  }

  renderEquipmentButtons () {
    const displayInfo = this.state.modalDisplay.toLowerCase() || 'armor'
    if (this.props.dbEquipment) {
      let equipmentButtons = Object.keys(this.props.dbEquipment[displayInfo]).map((item) => {
        return <Button id={`${item}-btn`}
                       key={`${item}-btn`}
                       onClick={() => {
                         console.log(item)
                       }}>{item}</Button>
      })
      return equipmentButtons
    }
    return null
  }

  render () {
    return (
      <div>
        <h4 id='equipmentTitle'>Choose your Equipment!</h4>
        <h6 id='equipmentSubtitle'>Equipment helps you carry out tasks, protects you, and are the tools you use to smite enemies!</h6>
        <div id='equipmentButtons'>
          <Button id='armor-btn' onClick={() => { this.openModal('Armor') }}>Armor</Button>
          <Button id='weapons-btn' onClick={() => { this.openModal('Weapons') }}>Weapons</Button>
          <Button id='items-btn' onClick={() => { this.openModal('Items') }}>Items</Button>
          <Button id='tools-btn' onClick={() => { this.openModal('Tools') }}>Tools</Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select your {this.state.modalDisplay}!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderEquipmentButtons()}
          </Modal.Body>
          <Modal.Footer>
            <Button id='closeModal-btn' onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditEquipment.propTypes = {
  dbEquipment: PropTypes.object,
  dbCharacterClasses: PropTypes.object,
  activeCharacterEquipment: PropTypes.object,
  activeCharacterClass: PropTypes.string
}
