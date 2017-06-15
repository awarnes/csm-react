import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'airbnb-js-shims' // to allow jest to understand Object.entries for parsing the character objects

import { Form, FormGroup, Col, Button, ButtonGroup, ControlLabel } from 'react-bootstrap'
import {BASE_ABILITY_SCORES} from '../utils'

const STARTING_POINTS = 27
const ABILITY_SCORES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']

export default class EditAbilityScores extends Component {
  constructor (props) {
    super(props)

    this.renderAbilityScorePackages = this.renderAbilityScorePackages.bind(this)
    this.pointsRemaining = this.pointsRemaining.bind(this)
    this.increaseScore = this.increaseScore.bind(this)
    this.decreaseScore = this.decreaseScore.bind(this)
    this.resetScores = this.resetScores.bind(this)
  }

  pointsRemaining () {
    let points = Object.values(this.props.abilityScores).reduce((pointsLeft, score) => {
      let delta = (score - 8)
      if (score === 15) {
        delta = 9
      } else if (score === 14) {
        delta = 7
      }

      return pointsLeft - delta
    }, STARTING_POINTS)

    return points
  }

  checkChangeStatus (ability, type) {
    if (type === 'increase' && this.props.abilityScores[ability] >= 15) {
      return true
    }

    if (type === 'decrease' && this.props.abilityScores[ability] <= 8) {
      return true
    }
  }

  increaseScore (ability) {
    let score = this.props.abilityScores[ability]
    const cost = score === 14 ? 2 : ((score + 1) - 8) - (score - 8)
    if (this.pointsRemaining() - cost >= 0) {
      score += 1
      let newScores = Object.assign({}, this.props.abilityScores, {[ability]: score})
      this.props.updateAbilityScore(newScores)
    }
  }

  decreaseScore (ability) {
    let score = this.props.abilityScores[ability] - 1
    let newScores = Object.assign({}, this.props.abilityScores, {[ability]: score})
    this.props.updateAbilityScore(newScores)
  }

  resetScores () {
    this.props.updateAbilityScore(BASE_ABILITY_SCORES)
  }

  renderAbilityScorePackages () {
    let abScorePackages = ABILITY_SCORES.map((ability) => {
      let labelName = ability.slice(0, 3).toUpperCase()
      return <Form key={`${labelName}-pkg`} horizontal>
        <FormGroup controlId={`${labelName}-pkg`}>
          <Col xs={8}>
            <ControlLabel>
              {ability}
            </ControlLabel>
          </Col>
          <Col xs={2}>
            <ControlLabel id={`${labelName}-score`}>{this.props.abilityScores[labelName]}</ControlLabel>
          </Col>
          <Col xs={2}>
            <ButtonGroup vertical>
              <Button
                id={`${labelName}-increase`}
                type='button'
                onClick={() => { this.increaseScore(labelName) }}
                disabled={this.checkChangeStatus(labelName, 'increase')}>+</Button>

              <Button
                id={`${labelName}-decrease`}
                type='button'
                onClick={() => { this.decreaseScore(labelName) }}
                disabled={this.checkChangeStatus(labelName, 'decrease')}>-</Button>
            </ButtonGroup>
          </Col>
        </FormGroup>
      </Form>
    })

    return abScorePackages
  }

  render () {
    return (
      <div className='text-center'>
        <h4 id='abScoreTitle'>Choose Your Ability Scores</h4>
        <h6 id='abScoreSubtitle'>Ability scores help determine what kind of adventurer you will be.</h6>
        {this.renderAbilityScorePackages()}
        <Form horizontal>
          <FormGroup controlId='pointsRemaining'>
            <Col componentClass={ControlLabel} xs={6}>
              Points Remaining:
            </Col>
            <Col xs={6}>
              <ControlLabel id='pointsRemaining'>{this.pointsRemaining()}</ControlLabel>
            </Col>
          </FormGroup>
        </Form>
        <Button
          type='button'
          id='reset-btn'
          onClick={() => { this.resetScores() }}
        >Reset Scores</Button>
      </div>
    )
  }
}

EditAbilityScores.propTypes = {
  abilityScores: PropTypes.object,
  updateAbilityScore: PropTypes.func
}
