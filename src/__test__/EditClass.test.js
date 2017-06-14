import React from 'react'
import EditClass from '../components/EditClass'
import { shallow } from 'enzyme'
import { FAKE_CHARACTER_CLASSES, FAKE_PRESTIGES } from '../test-data'

/* global it describe expect beforeEach jest */

describe('Editclass', () => {
  let wrapper, updateClassCallback, updatePrestigeCallback, app

  beforeEach(() => {
    updateClassCallback = jest.fn()
    updatePrestigeCallback = jest.fn()

    wrapper = shallow(<EditClass
      activeCharacterClass='Fighter'
      activeCharacterPrestige='Champion'
      updateClass={updateClassCallback}
      updatePrestige={updatePrestigeCallback}
      dbCharacterClasses={FAKE_CHARACTER_CLASSES}
      dbPrestiges={FAKE_PRESTIGES} />)

    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#classTitle').exists()).toBe(true)
    expect(wrapper.find('#classSubtitle').exists()).toBe(true)
  })

  it('displays 12 class buttons', () => {
    expect(wrapper.find('#classButtons').find('Button').length).toBe(12)
  })

  it('updates the showModal state when class w/ Prestiges are clicked', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#Fighter-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('makes the correct callback to update the activeCharacterClass', () => {
    wrapper.find('#Fighter-btn').simulate('click')

    expect(updateClassCallback.mock.calls).toEqual([['Fighter']])
  })

  it('makes the correct callback to update the activeCharacterPrestige', () => {
    app.setPrestige('Stout')

    expect(updatePrestigeCallback.mock.calls).toEqual([['Stout']])
  })

  it('colors the button green ("success") if it is already the selected class/Prestige', () => {
    expect(app.checkButtonStyle('Fighter')).toEqual('success')
    expect(app.checkButtonStyle('Champion')).toEqual('success')
  })

  it('colors the button correctly ("default") if it is not the already selected class/Prestige', () => {
    expect(app.checkButtonStyle('Rogue')).toEqual('default')
    expect(app.checkButtonStyle('Assassin')).toEqual('default')
  })
})
