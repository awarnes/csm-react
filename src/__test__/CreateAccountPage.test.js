import React from 'react'
import CreateAccountPage from '../components/CreateAccountPage'
import fetch from 'jest-fetch-mock'
import { FAKE_USERS } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_USERS))

/* global it describe expect beforeEach jest */

describe('Create Account Page', () => {
  let wrapper, callback, callback2, callback3

  beforeEach(() => {
    callback = jest.fn()
    callback2 = jest.fn()
    callback3 = jest.fn()
    wrapper = shallow(<CreateAccountPage onAccountNameInput={callback} accountName={'John'} updateDbAccounts={callback2}
      dbAccounts={FAKE_USERS} updateActiveAccount={callback3} />)
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

  it('validates that accountName is not in the database correctly', () => {
    wrapper = shallow(<CreateAccountPage onAccountNameInput={callback} accountName={'Akon'} updateDbAccounts={callback2}
      dbAccounts={FAKE_USERS} updateActiveAccount={callback3} />)
    let app = wrapper.instance()

    expect(app.getValidationState()).toBe('success')
  })

  it('updates the activeAccount when login button/link is pressed', () => {
    wrapper.find('#createAccount-link').simulate('click')

    expect(callback3.mock.calls).toEqual([['John']])
  })
})
