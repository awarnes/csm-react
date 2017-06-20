import React from 'react'
import EditCharacter from '../components/EditCharacter'
import { shallow, mount } from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

/* global it describe expect beforeEach jest */

describe('EditCharacter', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<EditCharacter
      match={{params: {uid: 12345}}}
      activeCharacter={{charName: 'Apheir'}}
      activeAccount='John'
      updateActiveCharacter={callback} />)
  })

  it('displays a character summary section', () => {
    expect(wrapper.find('#summary-section').exists()).toBe(true)
  })

  it('displays an editing section', () => {
    expect(wrapper.find('#editing-section').exists()).toBe(true)
  })

  it('has a section of navigation buttons', () => {
    expect(wrapper.find('#navigation-section').exists()).toBe(true)
  })

  describe('EditCharacter when activeCharacter contains relevant information', () => {
    let wrapper, callback

    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(<EditCharacter
        match={{params: {uid: 12345}}}
        activeCharacter={{charName: 'Apheir',
          abilityScores: {STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8},
          race: 'Halfling',
          subrace: 'Lightfoot',
          klass: 'Fighter',
          prestige: 'Champion',
          background: 'Acolyte',
          skills: ['Acrobatics', 'Performance']}}
        activeAccount='John'
        updateActiveCharacter={callback} />)
    })

    it('displays a character summary section', () => {
      expect(wrapper.find('#summary-section').exists()).toBe(true)
    })

    it('displays an editing section', () => {
      expect(wrapper.find('#editing-section').exists()).toBe(true)
    })

    it('has a section of navigation buttons', () => {
      expect(wrapper.find('#navigation-section').exists()).toBe(true)
    })
  })

  describe('the navigation section', () => {
    let wrapper, callback

    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(<EditCharacter
        match={{params: {uid: 12345}}}
        activeCharacter={{charName: 'Apheir'}}
        activeAccount='John'
        updateActiveCharacter={callback} />)
    })

    it('displays 12 Buttons', () => {
      expect(wrapper.find('Button').length).toBe(12)
    })

    it('displays 12 Links inside the buttons', () => {
      let links = wrapper.find('Link')
      expect(links.length).toBe(12)
    })
  })

  describe('the summary section', () => {
    let wrapper, callback, app

    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(<EditCharacter
        match={{params: {uid: 12345}}}
        activeCharacter={{charName: 'Apheir'}}
        activeAccount='John'
        updateActiveCharacter={callback} />)
      app = wrapper.instance()
    })

    it('displays the character name when the page loads', () => {
      expect(wrapper.find('#characterName').text()).toEqual('Apheir')
    })

    it('displays a welcome message when the page loads', () => {
      expect(app.renderCharacterSummary()).toEqual('Hello!')
    })
  })

  describe('the editing section', () => {
    let wrapper, callback

    beforeEach(() => {
      callback = jest.fn()
      wrapper = mount(
        <MemoryRouter>
          <EditCharacter
            match={{params: {uid: 12345}, url: '/characters/12345/edit'}}
            activeCharacter={{charName: 'Apheir'}}
            activeAccount='John'
            updateActiveCharacter={callback}
            />
        </MemoryRouter>)
    })

    it('displays the base edit page when at "/characters/:uid/edit"', () => {
      wrapper.node.history.push('/characters/12345/edit')

      expect(wrapper.node.history.location.pathname).toEqual('/characters/12345/edit')
      expect(wrapper.find('#editAbilityScores-btn').exists()).toBe(true)
      expect(wrapper.find('#editing-section').find('#abScoresTitle').exists()).toBe(false)
    })

    it('displays the EditAbilityScore page when at "/characters/:uid/edit/AbilityScores"', () => {
      wrapper.find('#editAbilityScores-link').simulate('click', {button: 0})
      expect(wrapper.node.history.location.pathname).toEqual('/characters/12345/edit/AbilityScores')
    })

    it('displays the EditEquipment page when at "/characters/:uid/edit/Equipment"', () => {
      wrapper.find('#editEquipment-link').simulate('click', {button: 0})
      expect(wrapper.node.history.location.pathname).toEqual('/characters/12345/edit/Equipment')
    })

    it('displays the EditSkills page when at "/characters/:uid/edit/Skills"', () => {
      wrapper.find('#editSkills-link').simulate('click', {button: 0})
      expect(wrapper.node.history.location.pathname).toEqual('/characters/12345/edit/Skills')
    })

    it('displays the EditName page when at "/characters/:uid/edit/Name"', () => {
      wrapper.find('#editName-link').simulate('click', {button: 0})
      expect(wrapper.node.history.location.pathname).toEqual('/characters/12345/edit/Name')
    })

    it('displays the EditDescription page when at "/characters/:uid/edit/Description"', () => {
      wrapper.find('#editDescription-link').simulate('click', {button: 0})
      expect(wrapper.node.history.location.pathname).toEqual('/characters/12345/edit/Description')
    })
  })
})
