import React from 'react'
import EditCharacter from '../components/EditCharacter'
import { MemoryRouter } from 'react-router-dom'
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

  describe('the navigation section', () => {
    let wrapper, callback

    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(<EditCharacter
        match={{params: {uid: 12345}}}
        activeCharacter={{charName: 'Apheir'}}
        updateActiveCharacter={callback} />)
    })

    it('displays 12 buttons', () => {
      expect(wrapper.find('Button').length).toBe(12)
    })

    it('displays 12 Links inside the buttons', () => {
      let links = wrapper.find('Link')
      expect(links.length).toBe(12)
      // links.map((link) => {
      //   expect(link.parent().type()).toBe(<Button />)
      // })
    })
  })

  describe('the summary section', () => {
    let wrapper, callback

    beforeEach(() => {
      callback = jest.fn()
      wrapper = shallow(<EditCharacter
        match={{params: {uid: 12345}}}
        activeCharacter={{charName: 'Apheir'}}
        updateActiveCharacter={callback} />)
    })

    it('displays the character name when the page loads', () => {
      expect(wrapper.find('#characterName').text()).toEqual('Apheir')
    })
  })

  // describe('the editing section', () => {
  //   let wrapper, callback, app
  //
  //   beforeEach(() => {
  //     callback = jest.fn()
  //     wrapper = shallow(<MemoryRouter>
  //                         <EditCharacter
  //                         match={{params: {uid: 12345}}}
  //                         activeCharacter={{charName: 'Apheir'}}
  //                         updateActiveCharacter={callback} />
  //                       </MemoryRouter>)
  //   })
  //
  //   it('displays the edit ability scores route when the edit ability scores button is clicked', () => {
  //     expect(wrapper.find('#abScoreTitle').exists()).toBe(false)
  //     console.log(wrapper.context)
  //     wrapper.node.props.children.find('#editAbilityScores-link').simulate('click', {button: 0})
  //
  //     expect(wrapper.find('#abScoreTitle').exists()).toBe(true)
  //   })
  // })
})
