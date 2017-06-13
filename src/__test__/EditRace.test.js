import React from 'react'
import EditRace from '../components/EditRace'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

// fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach */

describe('EditRace', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<EditRace />)
    wrapper.setState({races: {
      Dwarf: {desc: 'Digs stuff up.', subraces: {'Hill Dwarf': true, 'Mountain Dwarf': true}},
      Elf: {desc: 'Outlives stuff.', subraces: {'High Elf': true, 'Wood Elf': true, 'Drow': true}},
      Halfling: {desc: 'Stuff their belly.', subraces: {Lightfoot: true, Stout: true}},
      Human: {desc: 'Conquers stuff.', subraces: {}},
      Dragonborn: {desc: 'Proud of their stuff.', subraces: {}},
      Gnome: {desc: 'Tinkers with stuff.', subraces: {'Forest Gnome': true, 'Rock Gnome': true}},
      'Half-Elf': {desc: 'Double the stuff.', subraces: {}},
      'Half-Orc': {desc: 'Tough stuff.', subraces: {}},
      Tiefling: {desc: 'Burns stuff.', subraces: {}},
    }, subraces: {
      'Hill Dwarf': {desc: 'Wise and tough.'},
      'Mountain Dwarf': {desc: 'Strong and armored.'},
      'High Elf': {desc: 'Intelligent spell-casters.'},
      'Wood Elf': {desc: 'Wise and fleet of foot.'},
      'Drow': {desc: 'Charismatic under-dwellers.'},
      'Lightfoot': {desc: 'Charismatic and sneaky.'},
      'Stout': {desc: 'Tough and more tough.'},
      'Forest Gnome': {desc: 'Friends with animals.'},
      'Rock Gnome': {desc: 'Friends with machines.'},
    }})
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#raceTitle').exists()).toBe(true)
    expect(wrapper.find('#raceSubtitle').exists()).toBe(true)
  })

  it('displays 9 race buttons', () => {
    expect(wrapper.find('Button').length).toBe(9)
  })

  it('updates the showModal state when races w/ subraces are clicked', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#elf-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('doesnt update the showModal state when races w/o subraces are clicked', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#human-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })
})
