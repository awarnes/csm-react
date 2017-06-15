import React from 'react'
import EditEquipment from '../components/EditEquipment'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach */

describe('EditEquipment', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<EditEquipment />)
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
})
