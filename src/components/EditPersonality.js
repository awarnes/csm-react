import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects
import {SUCCESS_STYLE, DEFAULT_STYLE} from '../utils'
import { Button, Modal } from 'react-bootstrap'

const personalityDescriptions = {pTrait: 'Your personality trait shows how you prefer to interact with the world at a fundamental level.',
  ideal: 'Your idea is what you strive to achieve in this life.',
  bond: 'Your bond is who you owe allegiance to, and will sacrifice anything for.',
  flaw: 'Your flaw is something you do that makes life more difficult for yourself or others.',
  free: 'Here you can choose any traits, ideals, bonds, or flaws you like!'}

export default class EditPersonality extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      modalDisplay: ''
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderPersonalityButtons = this.renderPersonalityButtons.bind(this)
    this.renderPersonalityDescription = this.renderPersonalityDescription.bind(this)
  }

  openModal (type) {
    this.setState({showModal: true, modalDisplay: type})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  checkIfIncluded (words) {
    return _.get(this.props.activeCharacterPersonality, this.state.modalDisplay, '').includes(words) ? SUCCESS_STYLE : DEFAULT_STYLE
  }

  renderPersonalityDescription () {
    return personalityDescriptions[this.state.modalDisplay]
  }

  renderPersonalityButtons () {
    let personalityButtons
    if (this.state.modalDisplay !== 'free' && this.props.dbBackgrounds) {
      personalityButtons = _.get(this.props.dbBackgrounds, [`${this.props.activeCharacterBackground}`, `${this.state.modalDisplay}`], []).map((words, index) => {
        return <Button id={`${this.state.modalDisplay}-${index}-btn`}
          key={`${this.state.modalDisplay}-${index}-btn`}
          onClick={() => {
            this.props.updatePersonality(words, this.state.modalDisplay)
          }}
          bsStyle={this.checkIfIncluded(words)}
        >{`${index + 1}: ${words}`}</Button>
      })
    } else if (this.state.modalDisplay === 'free' && this.props.dbBackgrounds) {
      personalityButtons = Object.keys(this.props.dbBackgrounds).map((background) => {
        return _.get(this.props.dbBackgrounds, [`${background}`, `${this.state.modalDisplay}`], []).map((words, index) => {
          return <Button id={`${this.state.modalDisplay}-${index}-btn`}
            key={`${this.state.modalDisplay}-${index}-btn`}
            onClick={() => {
              this.props.updatePersonality(words, this.state.modalDisplay)
            }}
            bsStyle={this.checkIfIncluded(words)}
          >{`${index + 1}: ${words}`}</Button>
        })
      })
    }
    return personalityButtons
  }

  render () {
    const renderedPersonalityButtons = this.renderPersonalityButtons()
    const renderedPersonalityDescription = this.renderPersonalityDescription()
    const modalTitle = this.state.modalDisplay === 'free' ? 'Please choose a button below!' : `Please choose a ${this.state.modalDisplay}!`

    return (
      <div>
        <h4 id='personalityTitle'>Choose your personality traits!</h4>
        <h6 id='personalitySubtitle'>Your personality is usually based on your background; how you grew up. However, if you choose you can select anything that you like the sound of!</h6>
        <div id='personalityButtons'>
          <Button id='backgroundTrait' onClick={() => { this.openModal('ptrait') }}>Background Personality Trait</Button>
          <Button id='backgroundIdeal' onClick={() => { this.openModal('ideal') }}>Background Ideal</Button>
          <Button id='backgroundBond' onClick={() => { this.openModal('bond') }}>Background Bond</Button>
          <Button id='backgroundFlaw' onClick={() => { this.openModal('flaw') }}>Background Flaw</Button>
          <hr />
          <Button id='freeChoice'>Free choice!</Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderedPersonalityDescription}
            {renderedPersonalityButtons}
          </Modal.Body>
          <Modal.Footer>
            <Button id='closeModal-btn' onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditPersonality.propTypes = {
  dbBackgrounds: PropTypes.object,
  activeCharacterBackground: PropTypes.string,
  activeCharacterPersonality: PropTypes.object,
  updatePersonality: PropTypes.func
}
