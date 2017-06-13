export default {


  firebase: {

    users: {
      John: {
        createdAt: '(date)',
        characters: ['uid1', 'uid2', 'uid3', 'uid4']
      }
    },
    characters: {
      uid1: {
        username: 'string',
        charName: 'string',
        abilityScores: {strength: {score: 'int', prof: 'bool'}},
        race: 'string',
        subrace: 'string',
        klass: {rogue: 1},
        prestige: 'string',
        background: 'string',
        skills: {acrobatics: {prof: 'bool', ability: 'string', profMod: 'float'}},
        equipment: {armor: ['string', 'string'], weapons: ['dagger', 'staff'], items: ['thing1', 'thing2']},
        spells: ['spell1', 'spell2', 'spell3', 'spell4'],
        rpInfo: {desc: 'string', age: 42, weight: 142, height: 112, hairColor: 'blue', skinColor: 'tan', eyeColor: 'red'},
        personality: {pTrait: 'acolyte-1', flaw: 'string', ideal: 'string', bond: 'string'}
      }
    },
    races: {
      Dwarf: {desc: 'Digs stuff up.', subraces: {'Hill Dwarf': true, 'Mountain Dwarf': true}},
      Elf: {desc: 'Outlives stuff.', subraces: {'High Elf': true, 'Wood Elf': true, 'Drow': true}},
      Halfling: {desc: 'Stuff their belly.', subraces: {Lightfoot: true, Stout: true}},
      Human: {desc: 'Conquers stuff.', subraces: {}},
      Dragonborn: {desc: 'Proud of their stuff.', subraces: {}},
      Gnome: {desc: 'Tinkers with stuff.', subraces: {'Forest Gnome': true, 'Rock Gnome': true}},
      'Half-Elf': {desc: 'Double the stuff.', subraces: {}},
      'Half-Orc': {desc: 'Tough stuff.', subraces: {}},
      Tiefling: {desc: 'Burns stuff.', subraces: {}},
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
      'Rock Gnome': {desc: 'Friends with machines.'},
    },
    klasses: {
      rogue: {desc: 'string', prestiges: {assassin: true}}
    },
    prestiges: {
      assassin: {desc: 'string'}
    },
    backgrounds: {
      acolyte: {
        pTrait: ['trait1', 'trait2', 'trait3'],
        flaw: ['trait1', 'trait2', 'trait3'],
        ideal: ['trait1', 'trait2', 'trait3'],
        bond: ['trait1', 'trait2', 'trait3']
      }
    },
    skills: {
      acrobatics: {ability: 'string', desc: 'string'}
    },
    equipment: {
      armor: {
        leather: {desc: 'string'}
      },
      weapons: {
        dagger: {desc: 'string'}
      },
      items: {
        rope: {desc: 'string'}
      }
    },
    spells: {
      acidArrow: {desc: 'string'}
    }

  }


}