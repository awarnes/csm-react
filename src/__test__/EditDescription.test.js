import React from 'react'
import EditDescription from '../components/EditDescription'
import { shallow } from 'enzyme'

/* global describe beforeEach expect it jest */

describe('EditDescription', () => {
  let wrapper, updateDescriptionCallback

  beforeEach(() => {
    updateDescriptionCallback = jest.fn()
    wrapper = shallow(<EditDescription updateDescription={updateDescriptionCallback} descText={''} />)
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#descTitle').exists()).toBe(true)
    expect(wrapper.find('#descSubtitle').exists()).toBe(true)
  })

  it('displays a large text area', () => {
    expect(wrapper.find('#descTextArea').exists()).toBe(true)
  })

  it('performs the callback correctly to update as the user types', () => {
    wrapper.find('#descTextArea').simulate('change', 'apple')

    expect(updateDescriptionCallback.mock.calls).toEqual([['apple']])
  })
})
