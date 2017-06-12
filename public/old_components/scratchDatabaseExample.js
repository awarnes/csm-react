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
      elf: {desc: 'string', subraces: {drow: true}}
    },
    subraces: {
      drow: {desc: 'string'}
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