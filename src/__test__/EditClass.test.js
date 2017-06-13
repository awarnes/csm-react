import React from 'react'
import EditClass from '../components/EditClass'
import fetch from 'jest-fetch-mock'
import { FAKE_SERVER_DATA } from '../test-data'
import { shallow } from 'enzyme'

global.fetch = fetch

fetch.mockResponse(JSON.stringify(FAKE_SERVER_DATA))

/* global it describe expect beforeEach jest */

describe('Editclass', () => {
  let wrapper, updateClassCallback, updatePrestigeCallback, app

  beforeEach(() => {
    updateClassCallback = jest.fn()
    updatePrestigeCallback = jest.fn()

    wrapper = shallow(<EditClass
      activeCharacterClass='Fighter'
      activeCharacterPrestige='Champion'
      updateClass={updateClassCallback}
      updatePrestige={updatePrestigeCallback} />)

    wrapper.setState({klasses: {
      Barbarian: {desc: 'A fierce warrior of primitive background who can enter a battle rage.', prestiges: {'Path of the Berzerker': true, 'Path of the Totem Warrior': true}},
      Bard: {desc: 'An inspiring magician whose power echoes the music of creation.', prestiges: {'College of Lore': true, 'College of Valor': true}},
      Cleric: {desc: 'A priestly champion who wields divine magic in service of a higher power.', prestiges: {'Knowledge Domain': true, 'Life Domain': true, 'Light Domain': true, 'Nature Domain': true, 'Tempest Domain': true, 'Trickery Domain': true, 'War Domain': true}},
      Druid: {desc: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms', prestiges: {'Circle of the Land': true, 'Circle of the Moon': true}},
      Fighter: {desc: 'A master of martial combat, skilled with a variety of weapons and armor.', prestiges: {'Champion': true, 'Battle Master': true, 'Eldritch Knight': true}},
      Monk: {desc: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.', prestiges: {'Way of the Open Hand': true, 'Way of Shadow': true, 'Way of the Four Elements': true}},
      Paladin: {desc: 'A holy warrior bound to a sacred oath.', prestiges: {'Oath of Devotion': true, 'Oath of the Ancients': true, 'Oath of Vengeance': true}},
      Ranger: {desc: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.', prestiges: {'Hunter': true, 'Beast Master': true}},
      Rogue: {desc: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.', prestiges: {'Thief': true, 'Assassin': true, 'Arcane Trickster': true}},
      Sorcerer: {desc: 'A spellcaster who draws on inherent magic from a gift or bloodline.', prestiges: {'Draconic Bloodline': true, 'Wild Magic': true}},
      Warlock: {desc: 'A wielder of magic that is derived from a bargain with an extraplanar entity.', prestiges: {'The Archfey': true, 'The Fiend': true, 'The Great Old One': true}},
      Wizard: {desc: 'A scholarly magic-user capable of manipulating the structures of reality.', prestiges: {'School of Abjuration': true, 'School of Conjuration': true, 'School of Divination': true, 'School of Enchantment': true, 'School of Evocation': true, 'School of Illusion': true, 'School of Necromancy': true, 'School of Transmutation': true}}
    },
      prestiges: {
        'Path of the Berserker': {desc: 'The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker’s rage, you thrill in the chaos of battle, heedless of your own health or well-being.'},
        'Path of the Totem Warrior': {desc: 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might, adding magical fuel to your barbarian rage.'},
        'College of Lore': {desc: 'Bards of the College of Lore know something about most things. These bards use their gifts to hold audiences spellbound. The loyalty of these bards lies in the pursuit of beauty and truth, not in fealty to a monarch or following the tenets of a deity.'},
        'College of Valor': {desc: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past. With their songs, they inspire others to reach the same heights of accomplishment as the heroes of old. They gather in mead halls or around great bonfires to sing the deeds of the mighty.'},
        'Knowledge Domain': {desc: 'The gods of knowledge value learning and understanding above all. Followers of these gods study esoteric lore, collect old tomes, and learn all they can.'},
        'Life Domain': {desc: 'The Life domain focuses on the vibrant positive energy that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath.'},
        'Light Domain': {desc: 'Gods of light promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. '},
        'Nature Domain': {desc: 'Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests, to friendly deities associated with particular springs and groves.'},
        'Tempest Domain': {desc: 'Gods of the Tempest Domain govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage.'},
        'Trickery Domain': {desc: 'Gods of trickery are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals.'},
        'War Domain': {desc: 'War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific. The gods of war keep watch over warriors and reward them for their great deeds.'},
        'Circle of the Land': {desc: 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. As a member of this circle, your magic is influenced by the land where you were initiated into the circle’s mysterious rites.'},
        'Circle of the Moon': {desc: 'Druids of the Circle of the Moon are fierce guardians of the wilds. They haunt the deepest parts of the wilderness and are as changeable as the moon. A druid of this circle may prowl as a great cat one night, soar over the treetops as an eagle the next day, and crash through the undergrowth in bear form to drive off a trespassing monster.'},
        'Champion': {desc: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.'},
        'Battle Master': {desc: 'Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy.'},
        'Eldritch Knight': {desc: 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards.'},
        'Way of the Open Hand': {desc: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies, and practice advanced meditation that can protect them from harm.'},
        'Way of Shadow': {desc: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge.'},
        'Way of the Four Elements': {desc: 'Monks of the Way of the Four Elements follow a tradition that teaches the harnessing of the elements. Some members of this tradition dedicate themselves to a single element, but others weave the elements together.'},
        'Oath of Devotion': {desc: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor.'},
        'Oath of the Ancients': {desc: 'The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of light in the cosmic struggle against darkness.'},
        'Oath of Vengeance': {desc: 'The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, or when a thieves’ guild grows too violent. Sometimes called avengers or dark knights—their own purity is not as important as delivering justice.'},
        'Hunter': {desc: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness. As you walk the Hunter’s path, you learn specialized techniques for fighting the threats you face, from rampaging ogres and hordes of orcs to towering ants and terrifying dragons.'},
        'Beast Master': {desc: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world. United in focus, beast and ranger work as one to fight the monstrous foes that threaten civilization and the wilderness alike.'},
        'Thief': {desc: 'You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype, but so do rogues who prefer to think of themselves as professional treasure seekers, explorers, delvers, and investigators.'},
        'Assassin': {desc: 'You focus your training on the grim art of death. Those who adhere to this archetype are diverse: hired killers, spies, bounty hunters, and even specially anointed priests trained to exterminate the enemies of their deity.'},
        'Arcane Trickster': {desc: 'Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion. These rogues include pickpockets and burglars, but also pranksters, mischief-makers, and a significant number of adventurers.'},
        'Draconic Bloodline': {desc: 'Your innate magic comes from a draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a drain or who might even have claimed a dragon parent.'},
        'Wild Magic': {desc: 'Your innate magic comes from the wild forces of chaos that underlie the order of creation. You might have endured exposure to some form of raw magic, perhaps through a planar portal leading to Limbo. Perhaps you were blessed by a powerful fey creature or marked by a demon.'},
        'The Archfey': {desc: 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born.'},
        'The Fiend': {desc: 'You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you.'},
        'The Great Old One': {desc: 'Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. Its motives are incomprehensible to mortals, and its knowledge so immense and ancient that even the greatest libraries pale in comparison to the vast secrets it holds.'},
        'School of Abjuration': {desc: 'The School of Abjuration emphasizes magic that blocks, banishes, or protects. Members of this school are sought when baleful spirits require exorcism, when import locations must be guarded against magical spying, and when portals to other planes of existence must be closed.'},
        'School of Conjuration': {desc: 'The School of Conjuration favors spells that produce objects and creatures out of thin air. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence.'},
        'School of Divination': {desc: 'The School of Divination strives to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernement, remote viewing, supernatural knowledge, and foresight.'},
        'School of Enchantment': {desc: 'The School of Enchantment uses magic to entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms, others are tyrants who magically bind the unwilling into their service.'},
        'School of Evocation': {desc: 'The School of Evocation focuses on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid.'},
        'School of Illusion': {desc: 'The School of Illusion focuses on magic that dazzles the sense, befuddles the mind, and tricks even the wisest folk.'},
        'School of Necromancy': {desc: 'The School of Necromancy explores the cosmic forces of life, death, and undeath. As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things.'},
        'School of Transmutation': {desc: 'The School of Transmutation focuses on spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. Your magic gives you the tools to become a smith on reality’s forge.'}
      }})

    app = wrapper.instance()
  })

  it('displays a title and subtitle', () => {
    expect(wrapper.find('#classTitle').exists()).toBe(true)
    expect(wrapper.find('#classSubtitle').exists()).toBe(true)
  })

  it('displays 12 class buttons', () => {
    expect(wrapper.find('#classButtons').find('Button').length).toBe(12)
  })

  it('updates the showModal state when class w/ Prestiges are clicked', () => {
    expect(wrapper.state('showModal')).toBe(false)

    wrapper.find('#Fighter-btn').simulate('click')

    expect(wrapper.state('showModal')).toBe(true)
  })

  it('makes the correct callback to update the activeCharacterClass', () => {
    wrapper.find('#Fighter-btn').simulate('click')

    expect(updateClassCallback.mock.calls).toEqual([['Fighter']])
  })

  it('makes the correct callback to update the activeCharacterPrestige', () => {
    app.setPrestige('Stout')

    expect(updatePrestigeCallback.mock.calls).toEqual([['Stout']])
  })

  it('colors the button green ("success") if it is already the selected class/Prestige', () => {
    expect(app.checkButtonStyle('Fighter')).toEqual('success')
    expect(app.checkButtonStyle('Champion')).toEqual('success')
  })

  it('colors the button correctly ("default") if it is not the already selected class/Prestige', () => {
    expect(app.checkButtonStyle('Rogue')).toEqual('default')
    expect(app.checkButtonStyle('Assassin')).toEqual('default')
  })
})
