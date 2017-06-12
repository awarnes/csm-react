import React from 'react'
import LogInPage from '../components/LogInPage'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach jest */

describe('Log In Page', () => {
  let wrapper, callback, callback2, callback3, app

  beforeEach(() => {
    callback = jest.fn()
    callback2 = jest.fn()
    callback3 = jest.fn()
    wrapper = shallow(<LogInPage onAccountNameInput={callback} accountName={'John'} updateDbAccounts={callback2}
      dbAccounts={FAKE_SERVER_DATA.users} updateActiveAccount={callback3} />)
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

  it('validates that accountName is in the database correctly', () => {
    expect(app.getValidationState()).toBe('success')
  })

  it('validates that accountName is not in the database correctly', () => {
    wrapper = shallow(<LogInPage onAccountNameInput={callback} accountName={'Akon'} updateDbAccounts={callback2}
      dbAccounts={FAKE_SERVER_DATA.users} updateActiveAccount={callback3} />)
    app = wrapper.instance()

    expect(app.getValidationState()).toBe('warning')
  })

  it('updates the activeAccount when login button/link is pressed', () => {
    wrapper.find('#loginAccount-link').simulate('click')

    expect(callback3.mock.calls).toEqual([['John']])
  })
})
