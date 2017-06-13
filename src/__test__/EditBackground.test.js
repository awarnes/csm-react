import React from 'react'
import EditBackground from '../components/EditBackground'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach jest */

describe('EditBackground', () => {
  let wrapper, updateBackgroundCallback, app

  beforeEach(() => {
    updateBackgroundCallback = jest.fn()

    wrapper = shallow(<EditBackground
      activeCharacterBackground='Acolyte'
      updateBackground={updateBackgroundCallback} />)

    wrapper.setState({backgrounds: {
      Acolyte: {},
      Charlatan: {},
      Criminal: {},
      Entertainer: {},
      'Folk Hero': {},
      'Guild Artisan': {},
      Hermit: {},
      Noble: {},
      Outlander: {},
      Sage: {},
      Sailor: {},
      Soldier: {},
      Urchin: {}
    }})

    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#backgroundTitle').exists()).toBe(true)
    expect(wrapper.find('#backgroundSubtitle').exists()).toBe(true)
  })

  it('displays 13 background buttons', () => {
    expect(wrapper.find('#backgroundButtons').find('Button').length).toBe(13)
  })

  it('makes the correct callback to update the activeCharacterBackground', () => {
    wrapper.find('#Acolyte-btn').simulate('click')

    expect(updateBackgroundCallback.mock.calls).toEqual([['Acolyte']])
  })

  it('colors the button green ("success") if it is already the selected background', () => {
    expect(app.checkButtonStyle('Acolyte')).toEqual('success')
  })

  it('colors the button correctly ("default") if it is not the already selected background', () => {
    expect(app.checkButtonStyle('Sailor')).toEqual('default')
  })
})
