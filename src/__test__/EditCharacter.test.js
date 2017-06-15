import React from 'react'
import EditCharacter from '../components/EditCharacter'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

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
})
