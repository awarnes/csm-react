import React, { Component } from 'react'
import './App.css'

// import TopInfo from './components/TopInfo'
import BattleScreen from '../public/old_components/BattleScreen'
// import FlairScreen from './components/FlairScreen'
// import MainScreen from './components/MainScreen'

const SKILLS = {acrobatics: [true, 'DEX', 0],
  animal_handling: [false, 'WIS', 0.5],
  arcana: [true, 'INT', 0],
  athletics: [false, 'STR', 0.5],
  deception: [true, 'CHA', 0],
  history: [false, 'INT', 0.5],
  insight: [true, 'WIS', 0],
  intimidation: [false, 'CHA', 0.5],
  investigation: [true, 'INT', 0],
  medicine: [true, 'WIS', 0],
  nature: [false, 'INT', 0.5],
  perception: [true, 'WIS', 1],
  performance: [false, 'CHA', 0.5],
  persuasion: [true, 'CHA', 0],
  religion: [false, 'INT', 0.5],
  sleight_of_hand: [true, 'DEX', 0],
  stealth: [true, 'DEX', 0],
  survival: [false, 'WIS', 0.5]}

const CHARACTER = {name: 'Apheir',
  username: 'Admin',
  level: 1,
  klass: 'Sorcerer',
  prestige: 'Dragon',
  race: 'Half-Elf',
  background: 'Entertainer',
  alignment: 'Lawful-Evil',
  xp: 0,
  abScores: [['Strength', 10, false],
                    ['Dexterity', 12, false], ['Constitution', 14, true], ['Wisdom', 12, false],
                    ['Intelligence', 8, false], ['Charisma', 19, true]],
  armor: 'None',
  cp: 0,
  sp: 0,
  gp: 0,
  pp: 0,
  speed: 30,
  totalHP: 8,
  currHP: 8,
  tempHP: 0,
  skills: SKILLS}

export default class App extends Component {
  render () {
    return (
      <div className='App'>

        {/* <TopInfo */}
        {/* character={CHARACTER} */}
        {/* /> */}
        {/* <FlairScreen */}
        {/* character={CHARACTER} */}
        {/* /> */}
        <BattleScreen
          character={CHARACTER}
        />
        {/* <MainScreen */}
        {/* character={CHARACTER} */}
        {/* /> */}

      </div>
    )
  }
}
