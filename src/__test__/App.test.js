import React from 'react'
import App from '../App'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

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

  it('updates the state of this.state.dbAccounts when updateDBAccounts is called', () => {
    expect(wrapper.state('dbAccounts')).toEqual({})

    app.updateDBAccounts({apple: 'john'})

    expect(wrapper.state('dbAccounts')).toEqual({apple: 'john'})
  })

  it('updates the state of this.state.activeAccount when updateActiveAccount is called', () => {
    expect(wrapper.state('activeAccount')).toEqual('')

    app.updateActiveAccount('john')

    expect(wrapper.state('activeAccount')).toEqual('john')
  })

  it('updates the state of this.state.activeAccountInfo when updateActiveAccountInfo is called', () => {
    expect(wrapper.state('activeAccountInfo')).toEqual({})

    app.updateActiveAccountInfo({apple: 'john'})

    expect(wrapper.state('activeAccountInfo')).toEqual({apple: 'john'})
  })

  describe('when routing', () => {
    it('displays the landing page when at "/" ', () => {
      wrapper = shallow(<MemoryRouter initialEntries={['']}><App /></MemoryRouter>)

      expect(wrapper.find('#welcome').exists()).toBe(true)
      expect(wrapper.find('#subtitle').exists()).toBe(true)
    })

    it('displays the login page when at "/login_account" ', () => {
      wrapper = shallow(<MemoryRouter initialEntries={['/login_account']}><App /></MemoryRouter>)

      expect(wrapper.find('#quit-link').exists()).toBe(true)
      expect(wrapper.find('#loginAccount-btn').exists()).toBe(true)
    })

  })
})
