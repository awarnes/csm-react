import React from 'react'
import EditSpells from '../components/EditSpells'
import { shallow } from 'enzyme'

import { SPELLS } from '../../spells'

/* global describe beforeEach it expect jest */

describe('EditSpells', () => {
  let wrapper, updateSpellBookCallback, app

  beforeEach(() => {
    updateSpellBookCallback = jest.fn()
    wrapper = shallow(<EditSpells updateSpellBook={updateSpellBookCallback}
      dbSpells={SPELLS}
      activeCharacterSpellBook={['apple', 'sauce']} />)
    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#spellsTitle').exists()).toBe(true)
    expect(wrapper.find('#spellsSubtitle').exists()).toBe(true)
  })

  it('displays 10 different level buttons', () => {
    expect(wrapper.find('#spellLevels').find('Button').length).toBe(10)
  })

  it('changes local state when openModal is called', () => {
    expect(wrapper.state('showModal')).toBe(false)
    expect(wrapper.state('modalDisplay')).toEqual('')

    app.openModal('2')

    expect(wrapper.state('showModal')).toBe(true)
    expect(wrapper.state('modalDisplay')).toEqual('2')
  })

  it('changes local state when closeModal is called', () => {
    wrapper.setState({showModal: true})

    app.closeModal()

    expect(wrapper.state('showModal')).toBe(false)
  })

  it('makes the proper callback when a cantrip button is clicked', () => {
    wrapper.find('#cantrip-btn').simulate('click')

    wrapper.find('#Thunderclap-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Thunderclap']])
  })

  it('makes the proper callback when a level 1 button is clicked', () => {
    wrapper.find('#level1-btn').simulate('click')

    wrapper.find('#Catapult-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Catapult']])
  })

  it('makes the proper callback when a level 2 button is clicked', () => {
    wrapper.find('#level2-btn').simulate('click')

    wrapper.find('#Aid-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Aid']])
  })

  it('makes the proper callback when a level 3 button is clicked', () => {
    wrapper.find('#level3-btn').simulate('click')

    wrapper.find('#Fireball-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Fireball']])
  })

  it('makes the proper callback when a level 4 button is clicked', () => {
    wrapper.find('#level4-btn').simulate('click')

    wrapper.find('#Banishment-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Banishment']])
  })

  it('makes the proper callback when a level 5 button is clicked', () => {
    wrapper.find('#level5-btn').simulate('click')

    wrapper.find('#Awaken-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Awaken']])
  })

  it('makes the proper callback when a level 6 button is clicked', () => {
    wrapper.find('#level6-btn').simulate('click')

    wrapper.find('#Contingency-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Contingency']])
  })

  it('makes the proper callback when a level 7 button is clicked', () => {
    wrapper.find('#level7-btn').simulate('click')

    wrapper.find('#Whirlwind-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Whirlwind']])
  })

  it('makes the proper callback when a level 8 button is clicked', () => {
    wrapper.find('#level8-btn').simulate('click')

    wrapper.find('#Antipathy/Sympathy-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Antipathy/Sympathy']])
  })

  it('makes the proper callback when a level 9 button is clicked', () => {
    wrapper.find('#level9-btn').simulate('click')

    wrapper.find('#Wish-btn').simulate('click')

    expect(updateSpellBookCallback.mock.calls).toEqual([['Wish']])
  })
})
