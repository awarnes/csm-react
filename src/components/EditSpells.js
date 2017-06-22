import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {SUCCESS_STYLE, DEFAULT_STYLE} from '../utils'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Button, Modal } from 'react-bootstrap'

export default class EditSpells extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      modalDisplay: ''
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.checkSpellBook = this.checkSpellBook.bind(this)
    this.renderSpellButtons = this.renderSpellButtons.bind(this)
  }

  openModal (spellLevel) {
    this.setState({showModal: true, modalDisplay: spellLevel})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  checkSpellBook (spell) {
    return this.props.activeCharacterSpellBook.includes(spell) ? SUCCESS_STYLE : DEFAULT_STYLE
  }

  renderSpellButtons () {
    const spellList = this.props.dbSpells.filter((spell) => {
      return spell.level === this.state.modalDisplay
    })
    const spellButtons = spellList.map((spell) => {
      const safeSpellName = `${spell.name}-btn`.replace(/\/s/, '-')
      return <Button id={safeSpellName}
        key={safeSpellName}
        onClick={() => {
          this.props.updateSpellBook(`${spell.name}`)
        }}
        bsStyle={this.checkSpellBook(`${spell.name}`)}
          >{spell.name}</Button>
    }
      )
    return spellButtons
  }

  render () {
    const levelTitle = this.state.modalDisplay === 'cantrip' ? 'Cantrips!' : `Level ${this.state.modalDisplay} spells!`
    const renderedSpells = this.renderSpellButtons()

    return (
      <div className='text-center'>
        <h4 id='spellsTitle'>Choose your spells!</h4>
        <h6 id='spellsSubtitle'>Spells allow you to interact with and change the world around you.<br /> <strong>* WARNING: Currently, there is no spell checking against classes. If you don't have a spell casting feature, speak with your DM before choosing any spells! *</strong></h6>

        <div id='spellLevels'>
          <Button id='cantrip-btn' onClick={() => { this.openModal('cantrip') }}>Cantrips</Button>
          <Button id='level1-btn' onClick={() => { this.openModal('1') }}>First Level</Button>
          <Button id='level2-btn' onClick={() => { this.openModal('2') }}>Second Level</Button>
          <Button id='level3-btn' onClick={() => { this.openModal('3') }}>Third Level</Button>
          <Button id='level4-btn' onClick={() => { this.openModal('4') }}>Fourth Level</Button>
          <Button id='level5-btn' onClick={() => { this.openModal('5') }}>Fifth Level</Button>
          <Button id='level6-btn' onClick={() => { this.openModal('6') }}>Sixth Level</Button>
          <Button id='level7-btn' onClick={() => { this.openModal('7') }}>Seventh Level</Button>
          <Button id='level8-btn' onClick={() => { this.openModal('8') }}>Eighth Level</Button>
          <Button id='level9-btn' onClick={() => { this.openModal('9') }}>Ninth Level</Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Choose some {levelTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderedSpells}
          </Modal.Body>
          <Modal.Footer>
            <Button id='closeModal-btn' onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditSpells.propTypes = {
  dbSpells: PropTypes.array,
  updateSpellBook: PropTypes.func,
  activeCharacterSpellBook: PropTypes.array
}
