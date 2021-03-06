import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {SUCCESS_STYLE, DEFAULT_STYLE} from '../utils'
import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'

export default class EditRace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setRace = this.setRace.bind(this)
    this.setSubrace = this.setSubrace.bind(this)
    this.checkButtonStyle = this.checkButtonStyle.bind(this)
    this.renderRaceButtons = this.renderRaceButtons.bind(this)
    this.renderSubraceButtons = this.renderSubraceButtons.bind(this)
  }

  openModal () {
    this.setState({showModal: true})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  setRace (race) {
    this.props.updateRace(race)

    if (this.props.dbRaces[race].hasOwnProperty('subraces')) {
      this.openModal()
    } else {
      setTimeout(() => { this.props.updateSubrace('') })
    }
  }

  setSubrace (subrace) {
    this.props.updateSubrace(subrace)

    this.closeModal()
  }

  checkButtonStyle (property) {
    if (this.props.activeCharacterRace === property || this.props.activeCharacterSubrace === property) {
      return SUCCESS_STYLE
    } else {
      return DEFAULT_STYLE
    }
  }

  renderRaceButtons () {
    const raceButtons = Object.entries(this.props.dbRaces).map((entry) => {
      const tooltip = (<Tooltip id={`${entry[0]}-tooltip`}>{entry[1].desc}</Tooltip>)

      return <OverlayTrigger key={`${entry[0]}-overlay`} placement='left' overlay={tooltip}>
        <Button type='button'
          id={`${entry[0]}-btn`}
          onClick={() => { this.setRace(entry[0]) }}
          bsStyle={this.checkButtonStyle(entry[0])}>{entry[0]}</Button>
      </OverlayTrigger>
    })

    return raceButtons
  }

  renderSubraceButtons () {
    if (Object.keys(this.props.dbRaces).indexOf(this.props.activeCharacterRace) !== -1 && this.props.dbRaces[this.props.activeCharacterRace].hasOwnProperty('subraces')) {
      const subraceButtons = Object.keys(this.props.dbSubraces).filter((key) => {
        return Object.keys(this.props.dbRaces[this.props.activeCharacterRace].subraces).indexOf(key) !== -1
      }).map((entry) => {
        const tooltip = (<Tooltip id={`${entry}-tooltip`}>{this.props.dbSubraces[entry].desc}</Tooltip>)

        return <OverlayTrigger key={`${entry}-overlay`} placement='left' overlay={tooltip}>
          <Button type='button'
            id={`${entry}-btn`}
            onClick={() => { this.setSubrace(entry) }}
            bsStyle={this.checkButtonStyle(entry)}>{entry}</Button>
        </OverlayTrigger>
      })

      return subraceButtons
    }
  }

  render () {
    return (
      <div>
        <h4 id='raceTitle'>Choose your Race!</h4>
        <h6 id='raceSubtitle'>Your race determines how you were born into the world and what innate abilities you have.</h6>
        <div id='raceButtons'>
          {this.renderRaceButtons()}
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select a Subrace!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderSubraceButtons(this.props.activeCharacterRace)}
          </Modal.Body>
          <Modal.Footer>
            <Button id='closeModal-btn' onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditRace.propTypes = {
  activeCharacterRace: PropTypes.string,
  activeCharacterSubrace: PropTypes.string,
  updateRace: PropTypes.func,
  updateSubrace: PropTypes.func,
  dbRaces: PropTypes.object,
  dbSubraces: PropTypes.object
}
