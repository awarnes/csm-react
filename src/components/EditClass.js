import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button, Modal } from 'react-bootstrap'

/* global fetch */

const SUCCESS_STYLE = 'success'
const DEFAULT_STYLE = 'default'

export default class EditClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      klasses: {},
      prestiges: {}
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setClass = this.setClass.bind(this)
    this.setPrestige = this.setPrestige.bind(this)
    this.checkButtonStyle = this.checkButtonStyle.bind(this)
    this.renderClassButtons = this.renderClassButtons.bind(this)
    this.renderPrestigeButtons = this.renderPrestigeButtons.bind(this)
  }

  openModal () {
    this.setState({showModal: true})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  setClass (klass) {
    this.props.updateClass(klass)

    this.openModal()
  }

  setPrestige (prestige) {
    this.props.updatePrestige(prestige)

    this.closeModal()
  }

  checkButtonStyle (property) {
    if (this.props.activeCharacterClass === property || this.props.activeCharacterPrestige === property) {
      return SUCCESS_STYLE
    } else {
      return DEFAULT_STYLE
    }
  }

  renderClassButtons () {
    const classButtons = Object.entries(this.state.klasses).map((entry) => {
      return <Button type='button'
        id={`${entry[0]}-btn`}
        key={`${entry[0]}-btn`}
        onClick={() => { this.setClass(entry[0]) }}
        bsStyle={this.checkButtonStyle(entry[0])}>{entry[0]}</Button>
    })

    return classButtons
  }

  renderPrestigeButtons () {
    if (Object.keys(this.state.klasses).indexOf(this.props.activeCharacterClass) !== -1) {
      const prestigeButtons = Object.keys(this.state.prestiges).filter((key) => {
        return Object.keys(this.state.klasses[this.props.activeCharacterClass].prestiges).indexOf(key) !== -1
      }).map((entry) => {
        return <Button type='button'
          id={`${entry}-btn`}
          key={`${entry}-btn`}
          onClick={() => { this.setPrestige(entry) }}
          bsStyle={this.checkButtonStyle(entry)}>{entry}</Button>
      })

      return prestigeButtons
    }
  }

  componentWillMount () {
    fetch('https://csm-5e.firebaseio.com/klasses.json')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({klasses: json})
      })
      .catch((error) => {
        console.log('Classes: ' + error)
      })

    fetch('https://csm-5e.firebaseio.com/prestiges.json')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({prestiges: json})
      })
      .catch((error) => {
        console.log('Prestiges: ' + error)
      })
  }

  render () {
    return (
      <div>
        <h4 id='classTitle'>Choose your Class!</h4>
        <h6 id='classSubtitle'>Your class determines how you are able to interact with the world and what paths you will ultimately take.</h6>
        <div id='classButtons'>
          {this.renderClassButtons()}
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select a Prestige Class!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderPrestigeButtons(this.props.activeCharacterClass)}
          </Modal.Body>
          <Modal.Footer>
            <Button id='closeModal-btn' onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditClass.propTypes = {
  activeCharacterClass: PropTypes.string,
  activeCharacterPrestige: PropTypes.string,
  updateClass: PropTypes.func,
  updatePrestige: PropTypes.func
}
