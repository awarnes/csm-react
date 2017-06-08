import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA.users))

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
        <App />
        )
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

      expect(wrapper.find('#welcome').exists()).toBe(false)
    })
  })

  describe('the log-in page', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/login_account']}>
          <App />
        </MemoryRouter>
        )
    })

    it('routes to different page when quit button is pressed', () => {
      wrapper.find('#quit-link').simulate('click', {button: 0})

      expect(wrapper.find('#quit-link').exists()).toBe(false)
    })
  })
})
