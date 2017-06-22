import React from 'react'
import EditPersonality from '../components/EditPersonality'
import { shallow } from 'enzyme'

import {FAKE_BACKGROUNDS} from '../test-data'

/* global it describe expect beforeEach jest */

describe('EditPersonality', () => {
  let wrapper, app, updatePersonalityCallback

  beforeEach(() => {
    updatePersonalityCallback = jest.fn()
    wrapper = shallow(<EditPersonality dbBackgrounds={FAKE_BACKGROUNDS}
      activeCharacterBackground={'Acolyte'}
      activeCharacterPersonality={{}}
      updatePersonality={updatePersonalityCallback} />)
    app = wrapper.instance()
  })

  it('displays a title and subtitle.', () => {
    expect(wrapper.find('#personalityTitle').exists()).toBe(true)
    expect(wrapper.find('#personalitySubtitle').exists()).toBe(true)
  })

  it('displays 5 buttons on the side panel.', () => {
    expect(wrapper.find('#personalityButtons').find('Button').length).toBe(5)
  })

  it('changes the local state when openModal is called', () => {
    expect(wrapper.state('showModal')).toBe(false)

    app.openModal('ptrait')

    expect(wrapper.state('showModal')).toBe(true)
    expect(wrapper.state('modalDisplay')).toEqual('ptrait')
  })

  it('changes the local state when closeModal is called', () => {
    wrapper.setState({showModal: true})
    app.closeModal()

    expect(wrapper.state('showModal')).toBe(false)
  })

  it('makes the proper callback when a button is clicked', () => {
    wrapper.find('#backgroundTrait').simulate('click')

    wrapper.find('#ptrait-0-btn').simulate('click')

    expect(updatePersonalityCallback.mock.calls).toEqual([['I idolize a particular hero of my faith, and constantly refer to their deeds and example.', 'ptrait']])
  })

  it('makes the proper callback when a button is clicked', () => {
    wrapper.find('#backgroundIdeal').simulate('click')

    wrapper.find('#ideal-0-btn').simulate('click')

    expect(updatePersonalityCallback.mock.calls).toEqual([['Tradition', 'ideal']])
  })

  it('makes the proper callback when a button is clicked', () => {
    wrapper.find('#backgroundBond').simulate('click')

    wrapper.find('#bond-0-btn').simulate('click')

    expect(updatePersonalityCallback.mock.calls).toEqual([['I would die to recover an ancient relic of my faith that was lost long ago.', 'bond']])
  })

  it('makes the proper callback when a button is clicked', () => {
    wrapper.find('#backgroundFlaw').simulate('click')

    wrapper.find('#flaw-0-btn').simulate('click')

    expect(updatePersonalityCallback.mock.calls).toEqual([['I judge others harshly, and myself even more severely.', 'flaw']])
  })
})
