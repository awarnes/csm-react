import React from 'react'
import UserHome from '../components/UserHome'
import fetch from 'jest-fetch-mock'
import { FAKE_USERS } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_USERS))

/* global it describe expect beforeEach jest */

describe('The UserHome page', () => {
  let wrapper, callback, callback2, callback3, callback4, callback5

  beforeEach(() => {
    callback = jest.fn()
    callback2 = jest.fn()
    callback3 = jest.fn()
    callback4 = jest.fn()
    callback5 = jest.fn()
    wrapper = shallow(<UserHome
      updateActiveAccountInfo={callback}
      activeAccountInfo={{12345: 'Apple', 67890: 'Sauce'}}
      clearActiveAccount={callback2}
      match={{params: {user: 'Apple'}}}
      updateActiveAccount={callback3}
      createCharacter={callback4}
      onCharacterNameInput={callback5}
      characterName={'Apple'} />)
  })

  it('displays a welcome message', () => {
    expect(wrapper.find('#welcome-user').exists()).toBe(true)
  })

  it('displays user character(s)', () => {
    const char = wrapper.find('#char-(12345)')
    expect(char.exists()).toBe(true)
  })

  it('displays the edit button as a child of the list-group-item', () => {
    let editBtn = wrapper.find('#char-(12345)-edit-btn')
    expect(editBtn.exists()).toBe(true)
    expect(editBtn.parent()).toEqual(wrapper.find('#char-(12345)'))
  })

  it('displays the play button as a child of the list-group-item and is disabled', () => {
    const playBtn = wrapper.find('#char-(12345)-play-btn')
    expect(playBtn.exists()).toBe(true)
    expect(playBtn.parent()).toEqual(wrapper.find('#char-(12345)'))
    expect(playBtn.props().disabled).toBe(true)
  })

  it('the quit button calls clearActiveAccount to erase activeAccount state correctly', () => {
    wrapper.find('#quit-link').simulate('click')

    expect(callback2.mock.calls).toEqual([[]])
  })

  it('clicking the Create Character button sets the showModal state correctly', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#createCharacter-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('clicking the close modal button updates showModal state correctly', () => {
    wrapper.setState({showModal: true})

    wrapper.find('#closeModal-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(false)
  })

  it('performs the create character call correctly and closes the modal correctly when clicking the createNewCharacter-btn', () => {
    wrapper.setState({showModal: true})

    wrapper.find('#createNewCharacter-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(false)
    expect(callback4.mock.calls).toEqual([[]])
  })
})
