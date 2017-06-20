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
})
