import React from 'react'
import EditEquipment from '../components/EditEquipment'
import { shallow } from 'enzyme'
import { FAKE_EQUIPMENT, FAKE_CHARACTER_CLASSES } from '../test-data'

/* global it describe expect beforeEach */

describe('EditEquipment', () => {
  let wrapper, app

  beforeEach(() => {
    wrapper = shallow(<EditEquipment dbEquipment={FAKE_EQUIPMENT}
      dbCharacterClasses={FAKE_CHARACTER_CLASSES}
      activeCharacterEquipment={{items: 'apple'}}
      activeCharacterClass={'Barbarian'} />)
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

  it('')
})
