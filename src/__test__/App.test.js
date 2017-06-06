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

  it('updates the state of this.state.createAccount when onCreateAccountNameInput is called', () => {
    expect(wrapper.state('createAccount')).toEqual('')

    app.onCreateAccountNameInput({target: {value: 'apple'}})

    expect(wrapper.state('createAccount')).toEqual('apple')
  })

  it('updates the state of this.state.loginAccount when onLoginAccountNameInput is called', () => {
    expect(wrapper.state('loginAccount')).toEqual('')

    app.onLoginAccountNameInput({target: {value: 'apple'}})

    expect(wrapper.state('loginAccount')).toEqual('apple')
  })
})
