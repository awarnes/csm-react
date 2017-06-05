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

  it('updates the state of this.state.accountName when onAccountNameInput is called', () => {
    expect(wrapper.state('accountName')).toEqual('')

    app.onAccountNameInput({target: {value: 'apple'}})

    expect(wrapper.state('accountName')).toEqual('apple')
  })
})
