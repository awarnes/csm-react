import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects
import _ from 'lodash'
import { Grid, Row, Col, Button, Well } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'

import EditAbilityScores from './EditAbilityScores'
import EditRace from './EditRace'
import EditClass from './EditClass'
import EditBackground from './EditBackground'
import EditSkills from './EditSkills'
import EditEquipment from './EditEquipment'
import EditName from './EditName'
import EditDescription from './EditDescription'
import EditSpells from './EditSpells'
import EditPersonality from './EditPersonality'

import { BASE_ABILITY_SCORES } from '../utils'

const CHARACTER_TRAITS = ['abilityScores', 'race', 'subrace', 'klass', 'prestige', 'background', 'skills', 'equipment', 'spellbook', 'personality']

export default class EditCharacter extends Component {
  constructor (props) {
    super(props)

    this.renderCharacterSummary = this.renderCharacterSummary.bind(this)
  }

  renderCharacterSummary () {
    let info
    const summary = CHARACTER_TRAITS.map((trait) => {
      if (typeof _.get(this.props.activeCharacter, trait, '') === 'object') {
        info = Object.keys(_.get(this.props.activeCharacter, trait, [])).map((key) => {
          return <p key={`${trait}-${key}-info`}>{key}: {_.get(this.props.activeCharacter, [trait, key], '')}</p>
        })
      } else {
        info = <p key={`${trait}-info`}>{trait}: {_.get(this.props.activeCharacter, trait, '')}</p>
      }

      return <div key={`${trait}-info`}>
        {info}
      </div>
    })
    return summary
  }

  componentWillMount () {
    this.props.updateActiveCharacter(this.props.match.params.uid)
  }

  render () {
    let abilityScores, activeCharacterRace, activeCharacterSubrace, activeCharacterClass, activeCharacterPrestige
    let activeCharacterBackground, activeCharacterSkills, activeCharacterEquipment, activeCharacterSpellBook
    let activeCharacterPersonality

    abilityScores = this.props.activeCharacter.abilityScores || BASE_ABILITY_SCORES

    activeCharacterRace = this.props.activeCharacter.race || ''

    activeCharacterSubrace = this.props.activeCharacter.subrace || ''

    activeCharacterClass = this.props.activeCharacter.klass || ''

    activeCharacterPrestige = this.props.activeCharacter.prestige || ''

    activeCharacterBackground = this.props.activeCharacter.background || ''

    activeCharacterSkills = this.props.activeCharacter.skills || []

    activeCharacterEquipment = this.props.activeCharacter.equipment || {}

    activeCharacterSpellBook = this.props.activeCharacter.spellbook || []

    activeCharacterPersonality = this.props.activeCharacter.personality || {}

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
                type='button' bsSize='large'><Link id='editSpells-link' to={`${this.props.match.url}/Spells`} >Spells</Link></Button>
              <Button
                type='button' bsSize='large'><Link id='editEquipment-link' to={`${this.props.match.url}/Equipment`}>Equipment</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large'><Link id='editName-link' to={`${this.props.match.url}/Name`}>Name</Link></Button>
              <Button
                type='button' bsSize='large'><Link id='editDescription-link' to={`${this.props.match.url}/Description`}>Description</Link></Button>
              <Button
                type='button' bsSize='large'><Link to={`${this.props.match.url}/Personality`}>Personality</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large'><Link to={`/users/${this.props.activeAccount}/home`}>Finalize</Link></Button>
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

              <Route path={`${this.props.match.url}/Spells`} render={props => (<EditSpells {...props}
                dbSpells={this.props.dbSpells}
                updateSpellBook={this.props.updateSpellBook}
                activeCharacterSpellBook={activeCharacterSpellBook} />)} />

              <Route path={`${this.props.match.url}/Equipment`} render={props => (<EditEquipment {...props}
                dbEquipment={this.props.dbEquipment}
                activeCharacterEquipment={activeCharacterEquipment}
                updateEquipment={this.props.updateEquipment} />)} />

              <Route path={`${this.props.match.url}/Name`} render={props => (<EditName {...props}
                activeCharacterName={this.props.activeCharacterName}
                updateName={this.props.updateName} />)} />

              <Route path={`${this.props.match.url}/Description`} render={props => (<EditDescription {...props}
                activeCharacterName={this.props.descText}
                updateDescription={this.props.updateDescription} />)} />

              <Route path={`${this.props.match.url}/Personality`} render={props => (<EditPersonality {...props}
                activeCharacterBackground={activeCharacterBackground}
                dbBackgrounds={this.props.dbBackgrounds}
                activeCharacterPersonality={activeCharacterPersonality}
                updatePersonality={this.props.updatePersonality} />)} />

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
  activeCharacterName: PropTypes.string,
  descText: PropTypes.string,
  updateDescription: PropTypes.func,
  updateSpellBook: PropTypes.func,
  dbSpells: PropTypes.array,
  updatePersonality: PropTypes.func
}
