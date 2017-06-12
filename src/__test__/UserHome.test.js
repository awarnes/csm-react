import React from 'react'
import UserHome from '../components/UserHome'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach jest */

describe('The UserHome page', () => {
  let wrapper, callback, callback2

  beforeEach(() => {
    callback = jest.fn()
    callback2 = jest.fn()
    wrapper = shallow(<UserHome
      updateActiveAccountInfo={callback}
      activeAccountInfo={{Apple: {characters: {'12345': 'Apple', '67890': 'Sauce'}}}}
      clearActiveAccount={callback2}
      match={{params: {user: 'Apple'}}}
      />)
  })

  it('displays a welcome message', () => {
    expect(wrapper.find('#welcome-user').exists()).toBe(true)
  })

  it('displays user character(s)', () => {
    const char = wrapper.find('#char-12345')
    expect(char.exists()).toBe(true)
    expect(char.hasClass('list-item')).toBe(true)
  })

  it('displays the edit button as a child of the list-item', () => {
    let editBtn = wrapper.find('#char-12345-edit-btn')
    expect(editBtn.exists()).toBe(true)
    expect(editBtn.parent()).toEqual(wrapper.find('#char-12345'))
  })

  it('displays the play button as a child of the list-item and is disabled', () => {
    const playBtn = wrapper.find('#char-12345-play-btn')
    expect(playBtn).toBe(true)
    expect(playBtn.hasClass('disabled')).toBe(true)
  })

  it('the quit button calls clearActiveAccount to erase activeAccount state correctly', () => {
    console.log(wrapper)
    wrapper.find('#quit-link').simulate('click', {button: 0})

    expect(callback2.mock.calls).toEqual([['']])
  })

  it('the quit button routes to a different page', () => {
    expect(wrapper.find('#welcome-user').exists()).toBe(true)

    wrapper.find('#quit-link').simulate('click', {button: 0})

    expect(wrapper.find('#welcome-user').exists()).toBe(false)
  })
})
