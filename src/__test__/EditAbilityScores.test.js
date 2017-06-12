import React from 'react'
import EditAbilityScores from '../components/EditAbilityScores'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach */

describe('EditAbilityScores', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<EditAbilityScores
                        abilityScores={{STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10, }}
                        abilityPointsRemaining={27}/>)
  })

  it('displays the title and subtitle', () => {
    expect(wrapper.find('#abScoreTitle').exists()).toBe(true)
    expect(wrapper.find('#abScoreSubTitle').exists()).toBe(true)
  })

  it('displays all 6 ability packages (label, amount, up/down buttons) and the points form', () => {
    const packages = wrapper.find('Form')
    expect(packages.length).toBe(7)
  })

  it('displays a reset button', () => {
    expect(wrapper.find('#reset-btn').exists()).toBe(true)
  })


})
