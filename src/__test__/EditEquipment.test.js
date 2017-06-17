import React from 'react'
import EditEquipment from '../components/EditEquipment'
import { shallow } from 'enzyme'
import { FAKE_EQUIPMENT } from '../test-data'
import {SUCCESS_STYLE, DEFAULT_STYLE} from '../utils'

/* global it describe expect beforeEach jest */

describe('EditEquipment', () => {
  let wrapper, app, updateEquipmentCallback

  beforeEach(() => {
    updateEquipmentCallback = jest.fn()
    wrapper = shallow(<EditEquipment
      dbEquipment={FAKE_EQUIPMENT}
      activeCharacterEquipment={{armor: ['Leather']}}
      updateEquipment={updateEquipmentCallback} />)
    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#equipmentTitle').exists()).toBe(true)
    expect(wrapper.find('#equipmentSubtitle').exists()).toBe(true)
  })

  it('displays the buttons for "Armor", "Weapons", "Items", and "Tools"', () => {
    expect(wrapper.find('#armor-btn').exists()).toBe(true)
    expect(wrapper.find('#weapons-btn').exists()).toBe(true)
    expect(wrapper.find('#items-btn').exists()).toBe(true)
    expect(wrapper.find('#tools-btn').exists()).toBe(true)
  })

  it('modifies state of showModal and modalDisplay when openModal is called', () => {
    expect(wrapper.state('showModal')).toBe(false)
    expect(wrapper.state('modalDisplay')).toBe('')

    app.openModal('Weapons')

    expect(wrapper.state('showModal')).toBe(true)
    expect(wrapper.state('modalDisplay')).toBe('Weapons')
  })

  it('modifies the state of showModal when closeModal is called', () => {
    wrapper.setState({showModal: true})

    app.closeModal()

    expect(wrapper.state('showModal')).toBe(false)
  })

  it('returns the correct style when something is NOT in the activeEquipment', () => {
    wrapper.setState({modalDisplay: 'armor'})

    expect(app.checkButtonStyle('apple')).toEqual(DEFAULT_STYLE)
  })

  it('returns the correct style when something is in the activeEquipment', () => {
    wrapper.setState({modalDisplay: 'armor'})

    expect(app.checkButtonStyle('Leather')).toEqual(SUCCESS_STYLE)
  })

  it('displays the correct number of buttons when the Armor button is clicked.', () => {
    wrapper.find('#armor-btn').simulate('click')

    expect(wrapper.find('Modal').find('Button').length).toBe(14)
  })

  it('displays the correct number of buttons when the Weapons button is clicked.', () => {
    wrapper.find('#weapons-btn').simulate('click')

    expect(wrapper.find('Modal').find('Button').length).toBe(39)
  })

  it('displays the correct number of buttons when the Items button is clicked.', () => {
    wrapper.find('#items-btn').simulate('click')

    expect(wrapper.find('Modal').find('Button').length).toBe(100)
  })

  it('displays the correct number of buttons when the Tools button is clicked.', () => {
    wrapper.find('#tools-btn').simulate('click')

    expect(wrapper.find('Modal').find('Button').length).toBe(39)
  })

  it('makes the correct callback when an armor button is clicked', () => {
    wrapper.find('#armor-btn').simulate('click')

    wrapper.find('#Leather-btn').simulate('click')

    expect(updateEquipmentCallback.mock.calls).toEqual([['Leather', 'armor']])
  })

  it('makes the correct callback when a weapon button is clicked', () => {
    wrapper.find('#weapons-btn').simulate('click')

    wrapper.find('#Dagger-btn').simulate('click')

    expect(updateEquipmentCallback.mock.calls).toEqual([['Dagger', 'weapons']])
  })

  it('makes the correct callback when an item button is clicked', () => {
    wrapper.find('#items-btn').simulate('click')

    wrapper.find('#Abacus-btn').simulate('click')

    expect(updateEquipmentCallback.mock.calls).toEqual([['Abacus', 'items']])
  })

  it('makes the correct callback when a tool button is clicked', () => {
    wrapper.find('#tools-btn').simulate('click')

    wrapper.find('#Drum-btn').simulate('click')

    expect(updateEquipmentCallback.mock.calls).toEqual([['Drum', 'tools']])
  })
})
