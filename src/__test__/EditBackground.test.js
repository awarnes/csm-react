import React from 'react'
import EditBackground from '../components/EditBackground'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach */

describe('EditBackground', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<EditBackground />)
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#backgroundTitle').exists()).toBe(true)
    expect(wrapper.find('#backgroundSubtitle').exists()).toBe(true)
  })
})
