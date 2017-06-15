import React from 'react'
import EditAbilityScores from '../components/EditAbilityScores'
import { shallow } from 'enzyme'

/* global it describe expect beforeEach jest */

describe('EditAbilityScores', () => {
  let wrapper, callback, app

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<EditAbilityScores
      abilityScores={{STR: 10, DEX: 15, CON: 8, INT: 10, WIS: 10, CHA: 10}}
      updateAbilityScore={callback} />)
    app = wrapper.instance()
  })

  it('displays the title and subtitle', () => {
    expect(wrapper.find('#abScoreTitle').exists()).toBe(true)
    expect(wrapper.find('#abScoreSubtitle').exists()).toBe(true)
  })

  it('displays all 6 ability packages (label, amount, up/down buttons) and the points form', () => {
    const packages = wrapper.find('Form')
    expect(packages.length).toBe(7)
  })

  it('displays a reset button', () => {
    expect(wrapper.find('#reset-btn').exists()).toBe(true)
  })

  it('sends the increment callback correctly', () => {
    app.increaseScore('STR')

    expect(callback.mock.calls).toEqual([[{STR: 11, DEX: 15, CON: 8, INT: 10, WIS: 10, CHA: 10}]])
  })

  it('sends the decrement callback correctly', () => {
    app.decreaseScore('STR')

    expect(callback.mock.calls).toEqual([[{STR: 9, DEX: 15, CON: 8, INT: 10, WIS: 10, CHA: 10}]])
  })

  it('sends the reset callback correctly', () => {
    app.resetScores()

    expect(callback.mock.calls).toEqual([[{STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8}]])
  })

  it('disables the increment button when the score is 15', () => {
    expect(app.checkChangeStatus('DEX', 'increase')).toBe(true)
  })

  it('disables the decrement button when the score is 8', () => {
    expect(app.checkChangeStatus('CON', 'decrease')).toBe(true)
  })

  it('calculates the remaining points correctly', () => {
    expect(app.pointsRemaining()).toBe(10)
  })
})
