import React from 'react'
import LandingPage from '../components/LandingPage'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach */

describe('The Landing Page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<LandingPage />)
  })

  it('has a react-router Link inside a button for creating an account', () => {
    let button = wrapper.find('#createAccount-btn')
    let link = wrapper.find('#createAccount-link')
    expect(link.parent()).toEqual(button)
  })

  it('has a react-router Link inside a button for logging into an existing account', () => {
    let button = wrapper.find('#loginAccount-btn')
    let link = wrapper.find('#loginAccount-link')
    expect(link.parent()).toEqual(button)
  })
})
