import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Col, Button, ButtonGroup, ControlLabel } from 'react-bootstrap'

export default class EditAbilityScores extends Component {
  constructor (props) {
    super(props)

    this.renderAbilityScorePackages = this.renderAbilityScorePackages.bind(this)
    this.pointsRemaining = this.pointsRemaining.bind(this)
    this.increaseScore = this.increaseScore.bind(this)
    this.decreaseScore = this.decreaseScore.bind(this)
  }

  pointsRemaining () {
    let points = 27

    Object.values(this.props.abilityScores).map((score) => {
      if (score === 15) {
        points -= 9
      } else if (score === 14) {
        points -= 7
      } else {
        points -= (score - 8)
      }
      return null
    })

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
    const cost = score === 14 ? 7 : score - 8
    if (this.pointsRemaining() - cost >= 0) {
      score += 1
      this.props.updateAbilityScore(ability, score)
    }
  }

  decreaseScore (ability) {
    let score = this.props.abilityScores[ability]

    score -= 1
    this.props.updateAbilityScore(ability, score)
  }

  renderAbilityScorePackages () {
    const abilityScores = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']

    let abScorePackages = abilityScores.map((ability) => {
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
                onClick={() => {this.increaseScore(labelName)}}
                disabled={this.checkChangeStatus(labelName, 'increase')}>+</Button>

              <Button
                id={`${labelName}-decrease`}
                type='button'
                onClick={() => {this.decreaseScore(labelName)}}
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
        <h6 id='abScoreSubTitle'>Ability scores help determine what kind of adventurer you will be.</h6>
        {this.renderAbilityScorePackages()}
        <Form horizontal>
          <FormGroup controlId='pointsRemaining'>
            <Col componentClass={ControlLabel} xs={6}>
              Points Remaining:
            </Col>
            <Col xs={6}>
              <ControlLabel id="pointsRemaining">{this.pointsRemaining()}</ControlLabel>
            </Col>
          </FormGroup>
        </Form>
        <Button
          type='button'
          id='reset-btn'
        >Reset Scores</Button>
      </div>
    )
  }
}

EditAbilityScores.propTypes = {
  abilityScores: PropTypes.object,
  updateAbilityScore: PropTypes.func
}