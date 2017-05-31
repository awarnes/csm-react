import React, { Component } from 'react'

import AbilityScore from './AbilityScore'
import SavingThrow from './SavingThrow'
import ArmorAndGold from './ArmorAndGold'
import ACInitSpeed from './ACInitSpeed'
import TopInfo from './TopInfo'
import HpBox from './HpBox'

export default class BattleScreen extends Component {
  render () {
    let abilityScores = []
    let savingThrows = []

    this.props.character.abScores.forEach((score) => {
      abilityScores.push(<AbilityScore score={score} key={`${score[0]}as`} />)
      savingThrows.push(<SavingThrow score={score} character={this.props.character} key={`${score[0]}st`} />)
    })
    return (
      <div>
        <TopInfo
          character={this.props.character}
                    />
        <section>
          <div>
            {abilityScores}
          </div>

          <div>
            {savingThrows}
          </div>
          <div>
            <p>Proficiency: {Math.ceil((this.props.character.level / 4) + 1)}</p>
          </div>
          <div>
            <ArmorAndGold
              character={this.props.character}
                            />
          </div>
          <div>
            <p>Passive Wisdom: {10 + (Math.floor((this.props.character.abScores[3][1] - 10) / 2))}</p>
          </div>

          <ACInitSpeed
            character={this.props.character}
                        />
          <HpBox
            character={this.props.character}
                        />
        </section>
      </div>
    )
  }
}
