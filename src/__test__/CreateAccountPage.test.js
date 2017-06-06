import React from 'react'
import CreateAccountPage from '../components/CreateAccountPage'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach jest */

describe('Log In Page', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<CreateAccountPage onAccountNameInput={callback} />)
  })

  it('displays a text box and button', () => {
    expect(wrapper.find('#accountName-input').exists()).toBe(true)

    expect(wrapper.find('#createAccount-btn').exists()).toBe(true)
  })

  it('makes the correct call to update the text box as the user types', () => {
    let textbox = wrapper.find('#accountName-input')

    textbox.simulate('change', {target: {value: 'a'}})

    expect(callback.mock.calls).toEqual([[{'target': {'value': 'a'}}]])
  })
})
