import React from 'react'
import EditSkills from '../components/EditSkills'
import { shallow } from 'enzyme'
import { FAKE_BACKGROUNDS, FAKE_CHARACTER_CLASSES, FAKE_SKILLS } from '../test-data'

/* global it describe expect beforeEach jest */

describe('EditSkills', () => {
  let wrapper, app, updateSkillCallback

  beforeEach(() => {
    updateSkillCallback = jest.fn()
    wrapper = shallow(<EditSkills
      updateSkill={updateSkillCallback}
      dbBackgrounds={FAKE_BACKGROUNDS}
      dbCharacterClasses={FAKE_CHARACTER_CLASSES}
      dbSkills={FAKE_SKILLS}
      activeCharacterClass={'Barbarian'}
      activeCharacterBackground={'Entertainer'}
      activeCharacterSkills={['Acrobatics', 'Performance']}
    />)
    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#skillsTitle').exists()).toBe(true)
    expect(wrapper.find('#skillsSubtitle').exists()).toBe(true)
  })

  it('displays which skills a character has from their background', () => {
    expect(wrapper.find('#backgroundSkills').exists()).toBe(true)
    expect(wrapper.find('#backgroundSkills').find('ListGroupItem').length).toBe(2)
  })

  it('displays a button for Class Skills and one for All Skills', () => {
    expect(wrapper.find('#classSkills-btn').exists()).toBe(true)
    expect(wrapper.find('#allSkills-btn').exists()).toBe(true)
  })

  it('updates the state of showModal when openModal is called', () => {
    expect(wrapper.state('showModal')).toBe(false)

    app.openModal()

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('updates the state of showModal when closeModal is called', () => {
    wrapper.setState({showModal: true})

    expect(wrapper.state('showModal')).toBe(true)

    app.closeModal()

    expect(wrapper.state('showModal')).toBe(false)
  })

  it('updates the state for what to display in the modal when "Class Skills" and "All Skills" buttons are clicked', () => {
    expect(wrapper.state('modalDisplay')).toEqual('')

    wrapper.find('#classSkills-btn').simulate('click')
    expect(wrapper.state('modalDisplay')).toEqual('class')

    wrapper.find('#allSkills-btn').simulate('click')
    expect(wrapper.state('modalDisplay')).toEqual('all')
  })

  it('displays skills associated with the current character\'s class in a modal when the "Class Skills" button is clicked', () => {
    wrapper.find('#classSkills-btn').simulate('click')

    expect(wrapper.find('Modal').find('Button').length).toBe(7)
  })

  it('makes the correct callback when a skill button is clicked', () => {
    wrapper.find('#classSkills-btn').simulate('click')

    wrapper.find('Modal').find('#Survival-btn').simulate('click')

    expect(updateSkillCallback.mock.calls).toEqual([['Survival']])
  })
})
