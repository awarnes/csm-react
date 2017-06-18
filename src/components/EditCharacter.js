import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Row, Col, Button, Well } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'

import EditAbilityScores from './EditAbilityScores'
import EditRace from './EditRace'
import EditClass from './EditClass'
import EditBackground from './EditBackground'
import EditSkills from './EditSkills'
import EditEquipment from './EditEquipment'
import EditName from './EditName'

import { BASE_ABILITY_SCORES } from '../utils'

export default class EditCharacter extends Component {
  constructor (props) {
    super(props)

    this.renderCharacterSummary = this.renderCharacterSummary.bind(this)
  }

  renderCharacterSummary () {
    return 'Hello!'
  }

  componentWillMount () {
    this.props.updateActiveCharacter(this.props.match.params.uid)
  }

  render () {
    let abilityScores, activeCharacterRace, activeCharacterSubrace, activeCharacterClass, activeCharacterPrestige
    let activeCharacterBackground, activeCharacterSkills, activeCharacterEquipment

    abilityScores = this.props.activeCharacter.abilityScores || BASE_ABILITY_SCORES

    activeCharacterRace = this.props.activeCharacter.race || ''

    activeCharacterSubrace = this.props.activeCharacter.subrace || ''

    activeCharacterClass = this.props.activeCharacter.klass || ''

    activeCharacterPrestige = this.props.activeCharacter.prestige || ''

    activeCharacterBackground = this.props.activeCharacter.background || ''

    activeCharacterSkills = this.props.activeCharacter.skills || []

    activeCharacterEquipment = this.props.activeCharacter.equipment || {}

    return (
      <Grid>
        <Row>
          <Col id='summary-section' xsHidden sm={3}>
            <Well bsSize='sm'>
              <h1 id='characterName'>{this.props.activeCharacter.charName}</h1>
              {this.renderCharacterSummary()}
            </Well>
          </Col>

          <Col id='navigation-section' xs={8} sm={6}>
            <Row bsClass='text-center'>
              <Button
                type='button'
                bsSize='large'
                id='editAbilityScores-btn'>
                <Link id='editAbilityScores-link' to={`${this.props.match.url}/AbilityScores`}>Ability Scores</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large'><Link id='editRaces-link' to={`${this.props.match.url}/Races`}>Race</Link></Button>
              <Button
                type='button' bsSize='large'><Link id='editClasses-link' to={`${this.props.match.url}/Classes`}>Class</Link></Button>
              <Button
                type='button' bsSize='large'><Link id='editBackgrounds-link' to={`${this.props.match.url}/Backgrounds`}>Background</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large'><Link id='editSkills-link' to={`${this.props.match.url}/Skills`}>Skills</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Spells</Link></Button>
              <Button
                type='button' bsSize='large'><Link id='editEquipment-link' to={`${this.props.match.url}/Equipment`}>Equipment</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large'><Link to={`${this.props.match.url}/Name`}>Name</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Description</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Personality</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Finalize</Link></Button>
              <Button
                type='button' bsSize='large'><Link to={`/users/${this.props.activeAccount}/home`}>Back</Link></Button>
            </Row>
          </Col>

          <Col id='editing-section' xs={4} sm={3}>
            <Well>
              <Route path={`${this.props.match.url}/AbilityScores`} render={props => (<EditAbilityScores {...props}
                abilityScores={abilityScores}
                updateAbilityScore={this.props.updateAbilityScore} />)} />

              <Route path={`${this.props.match.url}/Races`} render={props => (<EditRace {...props}
                activeCharacterRace={activeCharacterRace}
                activeCharacterSubrace={activeCharacterSubrace}
                updateRace={this.props.updateRace}
                updateSubrace={this.props.updateSubrace}
                dbRaces={this.props.dbRaces}
                dbSubraces={this.props.dbSubraces} />)} />

              <Route path={`${this.props.match.url}/Classes`} render={props => (<EditClass {...props}
                activeCharacterClass={activeCharacterClass}
                activeCharacterPrestige={activeCharacterPrestige}
                updateClass={this.props.updateClass}
                updatePrestige={this.props.updatePrestige}
                dbCharacterClasses={this.props.dbCharacterClasses}
                dbPrestiges={this.props.dbPrestiges} />)} />

              <Route path={`${this.props.match.url}/Backgrounds`} render={props => (<EditBackground {...props}
                activeCharacterBackground={activeCharacterBackground}
                updateBackground={this.props.updateBackground}
                dbBackgrounds={this.props.dbBackgrounds} />)} />

              <Route path={`${this.props.match.url}/Skills`} render={props => (<EditSkills {...props}
                activeCharacterBackground={activeCharacterBackground}
                activeCharacterClass={activeCharacterClass}
                activeCharacterSkills={activeCharacterSkills}
                dbBackgrounds={this.props.dbBackgrounds}
                dbCharacterClasses={this.props.dbCharacterClasses}
                dbSkills={this.props.dbSkills}
                updateSkill={this.props.updateSkill} />)} />

              <Route path={`${this.props.match.url}/Equipment`} render={props => (<EditEquipment {...props}
                dbEquipment={this.props.dbEquipment}
                activeCharacterEquipment={activeCharacterEquipment}
                updateEquipment={this.props.updateEquipment} />)} />

              <Route path={`${this.props.match.url}/Name`} render={props => (<EditName {...props}
                activeCharacterName={this.props.activeCharacterName}
                updateName={this.props.updateName} />)} />

            </Well>
          </Col>

        </Row>
      </Grid>
    )
  }
}

EditCharacter.propTypes = {
  match: PropTypes.object,
  activeCharacter: PropTypes.object,
  updateActiveCharacter: PropTypes.func,
  activeAccount: PropTypes.string,
  updateAbilityScore: PropTypes.func,
  updateRace: PropTypes.func,
  updateSubrace: PropTypes.func,
  updateClass: PropTypes.func,
  updatePrestige: PropTypes.func,
  updateBackground: PropTypes.func,
  updateSkill: PropTypes.func,
  updateEquipment: PropTypes.func,
  dbCharacterClasses: PropTypes.object,
  dbPrestiges: PropTypes.object,
  dbRaces: PropTypes.object,
  dbSubraces: PropTypes.object,
  dbSkills: PropTypes.object,
  dbBackgrounds: PropTypes.object,
  dbEquipment: PropTypes.object,
  updateName: PropTypes.func,
  activeCharacterName: PropTypes.string
}
