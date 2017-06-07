import React from 'react'
import LogInPage from '../components/LogInPage'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach jest */

describe('Log In Page', () => {
  let wrapper, callback, app

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<LogInPage onAccountNameInput={callback} accountName={'John'} />)
    app = wrapper.instance()
  })

  it('displays a text box and button', () => {
    expect(wrapper.find('#accountName-input').exists()).toBe(true)

    expect(wrapper.find('#loginAccount-btn').exists()).toBe(true)
  })

  it('makes the correct call to update the text box as the user types', () => {
    let textbox = wrapper.find('#accountName-input')

    textbox.simulate('change', {target: {value: 'a'}})

    expect(callback.mock.calls).toEqual([[{'target': {'value': 'a'}}]])
  })

  it('validates that the length is reasonable for a username', () => {
    expect(app.getValidationState()).toBe('success')
  })

  it('verifies that the account does exist when the login button is pressed', () => {
    wrapper.find('#loginAccount-btn').simulate('click')
  })
})
