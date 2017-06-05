import React from 'react'
import LogInPage from '../components/LogInPage'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach jest */

describe('Log In Page', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<LogInPage onAccountNameInput={callback} />)
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
})
