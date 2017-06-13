import React from 'react'
import EditRace from '../components/EditRace'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach jest */

describe('EditRace', () => {
  let wrapper, updateRaceCallback, updateSubraceCallback, app

  beforeEach(() => {
    updateRaceCallback = jest.fn()
    updateSubraceCallback = jest.fn()

    wrapper = shallow(<EditRace
      activeCharacterRace='Elf'
      activeCharacterSubrace='Wood Elf'
      updateRace={updateRaceCallback}
      updateSubrace={updateSubraceCallback} />)

    wrapper.setState({races: {
      Dwarf: {desc: 'Digs stuff up.', subraces: {'Hill Dwarf': true, 'Mountain Dwarf': true}},
      Elf: {desc: 'Outlives stuff.', subraces: {'High Elf': true, 'Wood Elf': true, 'Drow': true}},
      Halfling: {desc: 'Stuff their belly.', subraces: {Lightfoot: true, Stout: true}},
      Human: {desc: 'Conquers stuff.', subraces: {}},
      Dragonborn: {desc: 'Proud of their stuff.', subraces: {}},
      Gnome: {desc: 'Tinkers with stuff.', subraces: {'Forest Gnome': true, 'Rock Gnome': true}},
      'Half-Elf': {desc: 'Double the stuff.', subraces: {}},
      'Half-Orc': {desc: 'Tough stuff.', subraces: {}},
      Tiefling: {desc: 'Burns stuff.', subraces: {}}
    },
      subraces: {
        'Hill Dwarf': {desc: 'Wise and tough.'},
        'Mountain Dwarf': {desc: 'Strong and armored.'},
        'High Elf': {desc: 'Intelligent spell-casters.'},
        'Wood Elf': {desc: 'Wise and fleet of foot.'},
        'Drow': {desc: 'Charismatic under-dwellers.'},
        'Lightfoot': {desc: 'Charismatic and sneaky.'},
        'Stout': {desc: 'Tough and more tough.'},
        'Forest Gnome': {desc: 'Friends with animals.'},
        'Rock Gnome': {desc: 'Friends with machines.'}
      }})

    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#raceTitle').exists()).toBe(true)
    expect(wrapper.find('#raceSubtitle').exists()).toBe(true)
  })

  it('displays 9 race buttons', () => {
    expect(wrapper.find('#raceButtons').find('Button').length).toBe(9)
  })

  it('updates the showModal state when races w/ subraces are clicked', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#Elf-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('doesnt update the showModal state when races w/o subraces are clicked', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#Human-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('makes the correct callback to update the activeCharacterRace', () => {
    wrapper.find('#Human-btn').simulate('click')

    expect(updateRaceCallback.mock.calls).toEqual([['Human']])
  })

  it('makes the correct callback to update the activeCharacterSubrace', () => {
    app.setSubrace('Stout')

    expect(updateSubraceCallback.mock.calls).toEqual([['Stout']])
  })

  it('colors the button green ("success") if it is already the selected race/subrace', () => {
    expect(app.checkButtonStyle('Elf')).toEqual('success')
    expect(app.checkButtonStyle('Wood Elf')).toEqual('success')
  })

  it('colors the button correctly ("default") if it is not the already selected race/subrace', () => {
    expect(app.checkButtonStyle('Human')).toEqual('default')
    expect(app.checkButtonStyle('Stout')).toEqual('default')
  })
})
