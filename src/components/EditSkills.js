import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

/* global fetch */

const SUCCESS_STYLE = 'success'
// const DEFAULT_STYLE = 'default'

export default class EditSkills extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      modalDisplay: ''
    }

    this.renderBackgroundSkills = this.renderBackgroundSkills.bind(this)
    this.checkProficient = this.checkProficient.bind(this)
  }

  checkProficient (skill) {
    if (this.props.activeCharacterSkills.indexOf(skill) !== -1) {
      return SUCCESS_STYLE
    } else {
      return 'danger'
    }
  }

  renderBackgroundSkills () {
    const characterBackground = this.props.activeCharacterBackground
    let backgroundSkills
    if (characterBackground !== "" && this.props.dbBackgrounds !== {}) {
      backgroundSkills = this.props.dbBackgrounds[characterBackground].skills.map((skill) => {
        return <ListGroupItem id={`${skill}-item`} bsStyle={this.checkProficient(skill)}>{skill}</ListGroupItem>
      })

    } else {
      backgroundSkills = <ListGroupItem header="It looks like you haven't chosen a background yet!">Among other things,
        a background will give you proficiency in a couple o</ListGroupItem>
    }

    return backgroundSkills
  }

  componentWillMount () {

  }
  render () {
    return (
      <div>
        <h4 id='skillsTitle'>Choose your Skills!</h4>
        <h6 id='skillsSubtitle'>Skills give you the ability to perform extreme feats.
           You get some skills from your background (what you have done in the past),
          and are given a choice of skills from your class (what you will do in the future).</h6>

        <div id='skillTypeButtons' />
        <Panel header={`Background: ${this.props.activeCharacterBackground}`}>
          <ListGroup id='backgroundSkills'>
            {this.renderBackgroundSkills()}
          </ListGroup>
        </Panel>
      </div>
    )
  }
}

EditSkills.propTypes = {
  activeCharacterSkills: PropTypes.array,
  updateSkill: PropTypes.func,
  activeCharacterBackground: PropTypes.string,
  activeCharacterClass: PropTypes.string,
  dbBackgrounds: PropTypes.object,
  dbCharacterClasses: PropTypes.object,
  dbSkills: PropTypes.object
}
