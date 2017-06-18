import React from 'react'
import EditName from '../components/EditName'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach jest */

describe('EditName', () => {
  let wrapper, updateNameCallback, app
  beforeEach(() => {
    updateNameCallback = jest.fn()
    wrapper = shallow(<EditName activeCharacterName={''} updateName={updateNameCallback} />)
    app = wrapper.instance()
  })

  it('displays the name title and subtitle', () => {
    expect(wrapper.find('#nameTitle').exists()).toBe(true)
    expect(wrapper.find('#nameSubtitle').exists()).toBe(true)
  })

  it('displays a text box to enter a character\'s name', () => {
    expect(wrapper.find('#characterName-text').exists()).toBe(true)
  })

  it('makes calls the updateName callback correctly when the text box is typed in', () => {
    wrapper.find('#characterName-text').simulate('change', 'Sauce')

    expect(updateNameCallback.mock.calls).toEqual([['Sauce']])
  })

  it('validates the correct state of the activeCharacterName when it is too short', () => {
    expect(app.getValidationState()).toEqual('warning')
  })

  it('validates the correct state of the activeCharacterName when it is long enough', () => {
    wrapper = shallow(<EditName activeCharacterName={'Sauce'} updateName={updateNameCallback} />)
    app = wrapper.instance()
    expect(app.getValidationState()).toEqual('success')
  })
})
