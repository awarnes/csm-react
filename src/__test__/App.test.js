import React from 'react'
import App from '../App'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

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

    app.updateDbAccounts({apple: 'john'})

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

  it('updates the state of activeAccount and activeAccountInfo when clearActiveAccount is called', () => {
    wrapper.setState({activeAccount: 'Blue', activeAccountInfo: {berry: 2}})

    expect(wrapper.state('activeAccount')).toEqual('Blue')
    expect(wrapper.state('activeAccountInfo')).toEqual({berry: 2})

    app.clearActiveAccount()

    expect(wrapper.state('activeAccount')).toEqual('')
    expect(wrapper.state('activeAccountInfo')).toEqual({})
  })

  it('updates the state of this.state.characterName when onCharacterNameInput is called', () => {
    expect(wrapper.state('characterName')).toEqual('')

    app.onCharacterNameInput({target: {value: 'apple'}})

    expect(wrapper.state('characterName')).toEqual('apple')
  })

  it('does not update the state of activeAccountInfo when createCharacter called if no information sent to database', () => {
    wrapper.setState({activeAccountInfo: {j: 'apple'}})

    app.createCharacter()

    expect(wrapper.state('activeAccountInfo')).toEqual({j: 'apple'})
  })

  describe('when routing', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<MemoryRouter><App /></MemoryRouter>)
    })

    it('displays the landing page when at "/" ', () => {
      expect(wrapper.find('#welcome').exists()).toBe(true)
      expect(wrapper.find('#subtitle').exists()).toBe(true)
      expect(wrapper.node.history.location.pathname).toEqual('/')
    })

    it('displays the login page when at "/login_account" ', () => {
      wrapper.node.history.push('/login_account')
      wrapper.find('#loginAccount-link').simulate('click', {button: 0})

      expect(wrapper.find('#quit-link').exists()).toBe(true)
      expect(wrapper.find('#loginAccount-btn').exists()).toBe(true)
      expect(wrapper.node.history.location.pathname).toEqual('/login_account')
    })

    /* Issues present with where the memory router actually is and what it thinks
      it should be displaying. The above code works fine, however the create account
      test does not think that there is any button or link for createAccount.
     */

    it('displays the create account page when at "/create_account"', () => {
      wrapper = mount(<MemoryRouter><App /></MemoryRouter>)
      wrapper.node.history.push('/create_account')

      expect(wrapper.node.history.location.pathname).toEqual('/create_account')
      expect(wrapper.find('#quit-link').exists()).toBe(true)
    })

    it('displays the user home page when at "/users/:user/home"', () => {
      wrapper.node.history.push('/users/John/home')
      wrapper.find('#loginAccount-link').simulate('click', {button: 0})

      expect(wrapper.node.history.location.pathname).toEqual('/users/John/home')
    })
  })
})
