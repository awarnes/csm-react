import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
// import fetch from 'jest-fetch-mock'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

/* global it describe expect beforeEach */

describe('integration test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe('the landing page', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>)
    })

    it('displays a landing page with a welcome message and login/create buttons', () => {
      let message = wrapper.find('#welcome')
      let subtitle = wrapper.find('#subtitle')
      let button = wrapper.find('#loginAccount-btn')
      let button2 = wrapper.find('#createAccount-btn')

      expect(message.text()).toEqual('Welcome to CSM!')
      expect(subtitle.text()).toEqual('Please choose an option below!')
      expect(button.exists()).toBe(true)
      expect(button2.exists()).toBe(true)
    })

    it('routes to other pages when links are clicked', () => {
      wrapper.find('#createAccount-link').simulate('click', {button: 0})

      expect(wrapper.find('#createAccount-link').exists()).toBe(false)
    })
  })

  describe('the log-in page', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>)

      wrapper.find('#loginAccount-link').simulate('click', {button: 0})
    })

    it('allows a user to enter their account name, fetches their account information, sets it in state as this.state.activeAccount', () => {
      expect(wrapper.state('activeAccount')).toEqual('')

      wrapper.find('#accountName-input').simulate('change', {target: {value: 'John'}})

      wrapper.find('#loginAccount-btn').simulate('click')

      expect(wrapper.state('activeAccount')).toEqual('John')
    })
  })
})
