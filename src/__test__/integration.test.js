import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
// import fetch from 'jest-fetch-mock'
import { mount } from 'enzyme'

/* global it describe expect beforeEach */

describe('integration test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe('the landing page', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<App />)
    })

    it('displays a landing page with a welcome message and entry button', () => {
      let message = wrapper.find('#welcome')
      let subtitle = wrapper.find('#subtitle')
      let button = wrapper.find('#createCharacter-btn')

      expect(message.text()).toEqual('Welcome to CSM!')
      expect(subtitle.text()).toEqual('Please choose an option below!')
      expect(button.exists()).toBe(true)
    })
  })
})
