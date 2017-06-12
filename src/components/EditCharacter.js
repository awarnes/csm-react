import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Row, Col, Button, Well } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'

import EditAbilityScores from './EditAbilityScores'

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
    const abilityScores = this.props.activeCharacter.hasOwnProperty('abilityScores')
      ? this.props.activeCharacter.abilityScores : {STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8}
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
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Race</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Class</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Background</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Skills</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Spells</Link></Button>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Equipment</Link></Button>
            </Row>

            <Row bsClass='text-center'>
              <Button
                type='button' bsSize='large' disabled><Link to='/' style={{pointerEvents: 'none'}}>Name</Link></Button>
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
  updateAbilityScore: PropTypes.func
}
