export const FAKE_SERVER_DATA = {
  users: {
    John: {
      characters:
        {'12345': 'Apple', '67890': 'Sauce'},
      createdAt: '2017-06-08T03:01:30.166Z'
    }
  },
  characters: {
    '12345': {
      name: 'Apple'
    }
  },
  races: {
    Dwarf: {desc: 'Digs stuff up.', subraces: {'Hill Dwarf': true, 'Mountain Dwarf': true}},
    Elf: {desc: 'Outlives stuff.', subraces: {'High Elf': true, 'Wood Elf': true, 'Drow': true}},
    Halfling: {desc: 'Stuff their belly.', subraces: {Lightfoot: true, Stout: true}},
    Human: {desc: 'Conquers stuff.'},
    Dragonborn: {desc: 'Proud of their stuff.'},
    Gnome: {desc: 'Tinkers with stuff.', subraces: {'Forest Gnome': true, 'Rock Gnome': true}},
    'Half-Elf': {desc: 'Double the stuff.'},
    'Half-Orc': {desc: 'Tough stuff.'},
    Tiefling: {desc: 'Burns stuff.'}
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
    'Rock Gnome': {desc: 'Friends with machines.'}
  }
}
