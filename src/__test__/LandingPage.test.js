import React from 'react'
import LandingPage from '../components/LandingPage'
// import fetch from 'jest-fetch-mock'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach */

describe('The Landing Page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<LandingPage />)
  })

  it('has a react-router Link inside a button', () => {
    let button = wrapper.find('#login-btn')
    let link = wrapper.find('Link')
    expect(link.parent()).toEqual(button)
  })
})
