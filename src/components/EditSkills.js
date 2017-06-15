import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { ListGroup, ListGroupItem, Panel, Button, Modal } from 'react-bootstrap'

/* global alert */

const SUCCESS_STYLE = 'success'
const DEFAULT_STYLE = 'default'

export default class EditSkills extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      modalDisplay: ''
    }

    this.renderBackgroundSkills = this.renderBackgroundSkills.bind(this)
    this.checkProficient = this.checkProficient.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setSkill = this.setSkill.bind(this)
    this.renderSkillButtons = this.renderSkillButtons.bind(this)
  }

  openModal (type) {
    this.setState({showModal: true, modalDisplay: type})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  checkProficient (skill) {
    if (this.props.activeCharacterSkills.indexOf(skill) !== -1) {
      return SUCCESS_STYLE
    } else {
      return DEFAULT_STYLE
    }
  }

  setSkill (skill) {
    let activeClassSkills = this.props.dbCharacterClasses[this.props.activeCharacterClass].skills.filter((skill) => {
      return this.props.activeCharacterSkills.includes(skill)
    }).filter((skill) => {
      return !this.props.dbBackgrounds[this.props.activeCharacterBackground].skills.includes(skill)
    })

    const classSkillLimit = this.props.dbCharacterClasses[this.props.activeCharacterClass].skills[0]

    const checkClassSkill = !this.props.activeCharacterSkills.includes(skill)

    if (this.state.modalDisplay === 'class' && activeClassSkills.length === classSkillLimit && checkClassSkill) {
      alert(`As a ${this.props.activeCharacterClass} you can only choose ${classSkillLimit} skills. Please check the 'All Skills' tab for more information.`)
    } else {
      this.props.updateSkill(skill)
    }
  }

  renderBackgroundSkills () {
    const characterBackground = this.props.activeCharacterBackground
    let backgroundSkills
    if (characterBackground !== '' && this.props.dbBackgrounds !== {}) {
      backgroundSkills = this.props.dbBackgrounds[characterBackground].skills.map((skill) => {
        return <ListGroupItem id={`${skill}-item`} key={`${skill}-item`} bsStyle={this.checkProficient(skill)}>{skill}</ListGroupItem>
      })
    } else {
      backgroundSkills = <ListGroupItem header="It looks like you haven't chosen a background yet!">Among other things, a background gives you direct access to a few skills.</ListGroupItem>
    }

    return backgroundSkills
  }

  renderSkillButtons () {
    let skillButtons

    if (this.state.modalDisplay === 'class') {
      skillButtons = this.props.dbCharacterClasses[this.props.activeCharacterClass].skills.map((skill, index) => {
        if (index > 0) {
          return <Button type='button'
            id={`${skill}-btn`}
            key={`${skill}-btn`}
            onClick={() => {
              this.setSkill(skill)
            }}
            bsStyle={this.checkProficient(skill)}
          >{skill}</Button>
        }
      })
    } else if (this.state.modalDisplay === 'all') {
      skillButtons = Object.keys(this.props.dbSkills).map((skill) => {
        return <Button type='button'
          id={`${skill}-btn`}
          key={`${skill}-btn`}
          onClick={() => { this.setSkill(skill) }}
          bsStyle={this.checkProficient(skill)}
        >{skill}</Button>
      })
    }

    return skillButtons
  }

  render () {
    let renderedSkills, modalTitle
    if (this.state.modalDisplay === 'class') {
      renderedSkills = this.renderSkillButtons()
      modalTitle = `Please select ${this.props.dbCharacterClasses[this.props.activeCharacterClass].skills[0]} skills for ${this.props.activeCharacterClass}:`
    } else {
      renderedSkills = this.renderSkillButtons()
      modalTitle = `If your DM has allowed, please select any other skills:`
    }

    return (
      <div>
        <h4 id='skillsTitle'>Choose your Skills!</h4>
        <h6 id='skillsSubtitle'>Skills give you the ability to perform extreme feats. You get some skills from your background (what you have done in the past), and are given a choice of skills given your class (what you will do in the future).</h6>

        <div id='skillTypeButtons'>
          <Button id='classSkills-btn' type='button' onClick={() => { this.openModal('class') }}>Class Skills</Button>
          <Button id='allSkills-btn' type='button' onClick={() => { this.openModal('all') }}>All Skills</Button>
        </div>
        <Panel header={`Background: ${this.props.activeCharacterBackground}`}>
          <ListGroup id='backgroundSkills'>
            {this.renderBackgroundSkills()}
          </ListGroup>
        </Panel>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderedSkills}
          </Modal.Body>
          <Modal.Footer>
            <Button id='closeModal-btn' onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditSkills.propTypes = {
  activeCharacterSkills: PropTypes.array,
  activeCharacterBackground: PropTypes.string,
  updateSkill: PropTypes.func,
  activeCharacterClass: PropTypes.string,
  dbBackgrounds: PropTypes.object,
  dbCharacterClasses: PropTypes.object,
  dbSkills: PropTypes.object
}
