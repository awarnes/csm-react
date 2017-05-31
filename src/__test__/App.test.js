import React from 'react'
import App from '../App'
import { shallow } from 'enzyme'

/* global describe it beforeEach expect */

describe('The App', () => {
  let wrapper, app

  beforeEach(() => {
    wrapper = shallow(<App />)
    app = wrapper.instance()
  })

  it('changes the state of this.state.creatingCharacter when onCreateCharacter called', () => {
    expect(wrapper.state('creatingCharacter')).toBe(false)

    app.onCreateCharacter()

    expect(wrapper.state('creatingCharacter')).toBe(true)
  })
})
