import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects
import {SUCCESS_STYLE, DEFAULT_STYLE} from '../utils'
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
    this.checkButtonStyle = this.checkButtonStyle.bind(this)
  }

  openModal (displayName) {
    this.setState({showModal: true, modalDisplay: displayName})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  checkButtonStyle (item) {
    if (_.has(this.props.activeCharacterEquipment, `${this.state.modalDisplay}`)) {
      if (this.props.activeCharacterEquipment[`${this.state.modalDisplay}`].includes(item)) {
        return SUCCESS_STYLE
      } else {
        return DEFAULT_STYLE
      }
    }
  }
  renderEquipmentButtons () {
    let equipmentButtons

    if (this.state.modalDisplay === 'armor') {
      equipmentButtons = Object.keys(this.props.dbEquipment['armor']).map((item) => {
        return <Button id={`${item}-btn`}
          key={`${item}-btn`}
          onClick={() => { this.props.updateEquipment(item, this.state.modalDisplay) }}
          bsStyle={this.checkButtonStyle(item)}>{item}</Button>
      })
    } else if (this.state.modalDisplay === 'weapons') {
      equipmentButtons = Object.keys(this.props.dbEquipment['weapons']).map((item) => {
        return <Button id={`${item}-btn`}
          key={`${item}-btn`}
          onClick={() => { this.props.updateEquipment(item, this.state.modalDisplay) }}
          bsStyle={this.checkButtonStyle(item)}>{item}</Button>
      })
    } else if (this.state.modalDisplay === 'items') {
      equipmentButtons = Object.keys(this.props.dbEquipment['items']).map((item) => {
        return <Button id={`${item}-btn`}
          key={`${item}-btn`}
          onClick={() => { this.props.updateEquipment(item, this.state.modalDisplay) }}
          bsStyle={this.checkButtonStyle(item)}>{item}</Button>
      })
    } else if (this.state.modalDisplay === 'tools') {
      equipmentButtons = Object.keys(this.props.dbEquipment['tools']).map((item) => {
        return <Button id={`${item}-btn`}
          key={`${item}-btn`}
          onClick={() => { this.props.updateEquipment(item, this.state.modalDisplay) }}
          bsStyle={this.checkButtonStyle(item)}>{item}</Button>
      })
    }

    return equipmentButtons
  }

  render () {
    return (
      <div>
        <h4 id='equipmentTitle'>Choose your Equipment!</h4>
        <h6 id='equipmentSubtitle'>Equipment helps you carry out tasks, protects you, and are the tools you use to smite enemies!</h6>
        <div id='equipmentButtons'>
          <Button id='armor-btn' onClick={() => { this.openModal('armor') }}>Armor</Button>
          <Button id='weapons-btn' onClick={() => { this.openModal('weapons') }}>Weapons</Button>
          <Button id='items-btn' onClick={() => { this.openModal('items') }}>Items</Button>
          <Button id='tools-btn' onClick={() => { this.openModal('tools') }}>Tools</Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{textTransform: 'capitalize'}}>Select your {this.state.modalDisplay}!</Modal.Title>
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
  activeCharacterEquipment: PropTypes.object,
  updateEquipment: PropTypes.func
}
