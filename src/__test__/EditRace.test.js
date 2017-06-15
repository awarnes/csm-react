import React from 'react'
import EditRace from '../components/EditRace'
import { shallow } from 'enzyme'
import { FAKE_RACES, FAKE_SUBRACES } from '../test-data'

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
      updateSubrace={updateSubraceCallback}
      dbRaces={FAKE_RACES}
      dbSubraces={FAKE_SUBRACES} />)

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
