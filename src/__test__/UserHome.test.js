import React from 'react'
import UserHome from '../components/UserHome'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach jest */

describe('The UserHome page', () => {
  let wrapper, callback, app

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<UserHome />)
    app = wrapper.instance()
  })

  it('displays a welcome message', () => {
    expect(wrapper.find('#welcome-user').exists()).toBe(true)
  })

  it('displays user character(s)', () => {
    expect(wrapper.find('#char-12345').exists()).toBe(true)
    /* expect list-item to exist (above)
        expect there to be an edit link/button
        expect there to be a play button
        expect the play button to be disabled
     */
  })

  it('the quit button calls to erase activeAccount state correctly', () => {
    wrapper.find('#quit-link').simulate('click', {button: 0})

    expect(callback.mock.calls).toEqual([['']])
  })

  it('the quit button routes to a different page', () => {
    expect(wrapper.find('#welcome-user').exists()).toBe(true)

    wrapper.find('#quit-link').simulate('click', {button: 0})

    expect(wrapper.find('#welcome-user').exists()).toBe(false)
  })


})