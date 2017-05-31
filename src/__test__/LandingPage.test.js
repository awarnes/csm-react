/* global
  it
  describe
  expect
  beforeEach
  jest
 */

import React from 'react'
import LandingPage from '../components/LandingPage'
// import fetch from 'jest-fetch-mock'
import { shallow } from 'enzyme'

describe('The Landing Page', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<LandingPage
      onCreateCharacter={callback}
                            />)
  })

  it('performs upstream callback when create character button clicked', () => {
    wrapper.find('#createCharacter-btn').simulate('click')

    expect(callback.mock.calls).toEqual([[]])
  })
})
