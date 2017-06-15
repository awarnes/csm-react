import React from 'react'
import App from '../App'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import fetch from 'jest-fetch-mock'
import { FAKE_USERS, FAKE_BACKGROUNDS } from '../test-data'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_USERS))

/* global describe it beforeEach expect */

describe('The App', () => {
  let wrapper, app

  beforeEach(() => {
    wrapper = shallow(<App />)
    app = wrapper.instance()
  })

  it('updates the state of this.state.createAccount when onCreateAccountNameInput is called', () => {
    expect(wrapper.state('createAccount')).toEqual('')

    app.onCreateAccountNameInput({target: {value: 'apple'}})

    expect(wrapper.state('createAccount')).toEqual('apple')
  })

  it('updates the state of this.state.loginAccount when onLoginAccountNameInput is called', () => {
    expect(wrapper.state('loginAccount')).toEqual('')

    app.onLoginAccountNameInput({target: {value: 'apple'}})

    expect(wrapper.state('loginAccount')).toEqual('apple')
  })

  it('updates the state of this.state.dbAccounts when updateDBAccounts is called', () => {
    expect(wrapper.state('dbAccounts')).toEqual({})

    app.updateDbAccounts()

    expect(wrapper.state('dbAccounts')).toEqual({})
  })

  it('updates the state of this.state.activeAccount when updateActiveAccount is called', () => {
    expect(wrapper.state('activeAccount')).toEqual('')

    app.updateActiveAccount('john')

    expect(wrapper.state('activeAccount')).toEqual('john')
  })

  it('updates the state of this.state.activeAccountInfo when updateActiveAccountInfo is called', () => {
    expect(wrapper.state('activeAccountInfo')).toEqual({})

    app.updateActiveAccountInfo({apple: 'john'})

    expect(wrapper.state('activeAccountInfo')).toEqual({apple: 'john'})
  })

  it('updates the state of activeAccount and activeAccountInfo when clearActiveAccount is called', () => {
    wrapper.setState({activeAccount: 'Blue', activeAccountInfo: {berry: 2}})

    expect(wrapper.state('activeAccount')).toEqual('Blue')
    expect(wrapper.state('activeAccountInfo')).toEqual({berry: 2})

    app.clearActiveAccount()

    expect(wrapper.state('activeAccount')).toEqual('')
    expect(wrapper.state('activeAccountInfo')).toEqual({})
  })

  it('updates the state of this.state.characterName when onCharacterNameInput is called', () => {
    expect(wrapper.state('characterName')).toEqual('')

    app.onCharacterNameInput({target: {value: 'apple'}})

    expect(wrapper.state('characterName')).toEqual('apple')
  })

  it('does not update the state of activeAccountInfo when createCharacter called if no information sent to database', () => {
    wrapper.setState({activeAccountInfo: {j: 'apple'}})

    app.createCharacter()

    expect(wrapper.state('activeAccountInfo')).toEqual({j: 'apple'})
  })

  it('updates the state of activeCharacter and activeCharacterId when this.updateActiveCharacter is called', () => {
    expect(wrapper.state('activeCharacter')).toEqual({})
    expect(wrapper.state('activeCharacterId')).toEqual('')

    app.updateActiveCharacter('12345')

    expect(wrapper.state('activeCharacter')).toEqual({})
    expect(wrapper.state('activeCharacterId')).toEqual('12345')
  })

  it('updates the ability scores for activeCharacter if no ability scores existed previously when this.updateAbilityScore is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}})

    app.updateAbilityScore({STR: 10, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8})

    expect(wrapper.state().activeCharacter.abilityScores).toEqual({STR: 10, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8})
  })

  it('updates the ability scores for activeCharacter if the abilityScores object does exist when this.updateAbilityScore is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', abilityScores: {STR: 10, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8}}})

    app.updateAbilityScore({STR: 9, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8})

    expect(wrapper.state().activeCharacter.abilityScores).toEqual({STR: 9, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8})
  })

  it('updates the race for activeCharacter if no race existed previously when this.updateRace is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}})

    app.updateRace('Human')

    expect(wrapper.state().activeCharacter.race).toEqual('Human')
  })

  it('updates the race for activeCharacter if the race object does exist when this.updateRace is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', race: 'Human'}})

    app.updateRace('Halfling')

    expect(wrapper.state().activeCharacter.race).toEqual('Halfling')
  })

  it('updates the subrace for activeCharacter if no subrace existed previously when this.updateSubrace is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}})

    app.updateSubrace('Lightfoot')

    expect(wrapper.state().activeCharacter.subrace).toEqual('Lightfoot')
  })

  it('updates the subrace for activeCharacter if the subrace object does exist when this.updateSubrace is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', subrace: 'Lightfoot'}})

    app.updateSubrace('Wood Elf')

    expect(wrapper.state().activeCharacter.subrace).toEqual('Wood Elf')
  })

  it('updates the class for activeCharacter if no class existed previously when this.updateClass is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}})

    app.updateClass('Fighter')

    expect(wrapper.state().activeCharacter.klass).toEqual('Fighter')
  })

  it('updates the class for activeCharacter if the class object does exist when this.updateClass is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', klass: 'Fighter'}})

    app.updateClass('Rogue')

    expect(wrapper.state().activeCharacter.klass).toEqual('Rogue')
  })

  it('updates the prestige for activeCharacter if no prestige existed previously when this.updatePrestige is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}})

    app.updatePrestige('Champion')

    expect(wrapper.state().activeCharacter.prestige).toEqual('Champion')
  })

  it('updates the prestige for activeCharacter if the prestige object DOES exist when this.updatePrestige is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', prestige: 'Champion'}})

    app.updatePrestige('Eldritch Knight')

    expect(wrapper.state().activeCharacter.prestige).toEqual('Eldritch Knight')
  })

  it('updates the background for activeCharacter if no background existed previously when this.updateBackground is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}, dbBackgrounds: FAKE_BACKGROUNDS})

    app.updateBackground('Entertainer')

    expect(wrapper.state().activeCharacter.background).toEqual('Entertainer')
  })

  it('updates the background for activeCharacter if the background object DOES exist when this.updateBackground is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', background: 'Entertainer'}, dbBackgrounds: FAKE_BACKGROUNDS})

    app.updateBackground('Folk Hero')

    expect(wrapper.state().activeCharacter.background).toEqual('Folk Hero')
  })

  it('updates the skills for activeCharacter if no skills existed previously when this.updateSkill is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple'}})

    app.updateSkill('Stealth')

    expect(wrapper.state().activeCharacter.skills).toEqual(['Stealth'])
  })

  it('updates the skills for activeCharacter if the skills object DOES exist when this.updateSkill is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', skills: ['Stealth']}})

    app.updateSkill('Intimidation')

    expect(wrapper.state().activeCharacter.skills).toEqual(['Stealth', 'Intimidation'])
  })

  it('removes a skill from activeCharacter if the skill already existed when this.updateSkill is called', () => {
    wrapper.setState({activeCharacter: {name: 'Apple', skills: ['Stealth']}})

    app.updateSkill('Stealth')

    expect(wrapper.state().activeCharacter.skills).toEqual([])
  })

  describe('when routing', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<MemoryRouter><App /></MemoryRouter>)
    })

    it('displays the landing page when at "/" ', () => {
      expect(wrapper.find('#welcome').exists()).toBe(true)
      expect(wrapper.find('#subtitle').exists()).toBe(true)
      expect(wrapper.node.history.location.pathname).toEqual('/')
    })

    it('displays the login page when at "/login_account" ', () => {
      wrapper.node.history.push('/login_account')
      wrapper.find('#loginAccount-link').simulate('click', {button: 0})

      expect(wrapper.find('#quit-link').exists()).toBe(true)
      expect(wrapper.find('#loginAccount-btn').exists()).toBe(true)
      expect(wrapper.node.history.location.pathname).toEqual('/login_account')
    })

    /* Issues present with where the memory router actually is and what it thinks
      it should be displaying. The above code works fine, however the create account
      test does not think that there is any button or link for createAccount.
     */

    it('displays the create account page when at "/create_account"', () => {
      wrapper = mount(<MemoryRouter><App /></MemoryRouter>)
      wrapper.node.history.push('/create_account')

      expect(wrapper.node.history.location.pathname).toEqual('/create_account')
      expect(wrapper.find('#quit-link').exists()).toBe(true)
    })

    it('displays the user home page when at "/users/:user/home"', () => {
      wrapper.node.history.push('/users/John/home')
      wrapper.find('#loginAccount-link').simulate('click', {button: 0})

      expect(wrapper.node.history.location.pathname).toEqual('/users/John/home')
    })
  })
})
