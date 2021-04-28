export default class OrbitData
{
  constructor() {
    this.planetColors = [
      'white',
      'yellow',
      'orange',
      'cyan',
      'red',
      'green',
      'magenta',
      'blue'];
    this.planetArray = [];
    this.presets = [
      [
        {
          'name': 'Sun',
          'radius': 695000,
          'mass': 132750000192.00,
          'pos': {'x': 0, 'y': 0, 'z': 0},
          'vel': {'x': 0, 'y': 0, 'z': 0},
          'color': 'yellow',
          'startpos': {'x': 0, 'y': 0, 'z': 0},
          'startvel': {'x': 0, 'y': 0, 'z': 0},
        },
        {
          'name': 'Earth',
          'radius': 6378,
          'mass': 398850,
          'pos': {'x': 150000000, 'y': 0, 'z': 0},
          'vel': {'x': 0, 'y': 0, 'z': 29.8},
          'color': 'blue',
          'startpos': {'x': 150000000, 'y': 0, 'z': 0},
          'startvel': {'x': 0, 'y': 0, 'z': 29.8},
        },
      ],
      [
        {
          'name': 'Sun',
          'radius': 695000,
          'mass': 132750000192.00,
          'pos': {'x': 57900000, 'y': 0, 'z': 23.94},
          'vel': {'x': 0, 'y': 0, 'z': 0},
          'color': 'yellow',
          'startpos': {'x': 57900000, 'y': 0, 'z': 0},
          'startvel': {'x': 0, 'y': 0, 'z': 23.94},
        },
        {
          'name': 'Sun 2',
          'radius': 695000,
          'mass': 132750000192.00,
          'pos': {'x': -57900000, 'y': 0, 'z': -23.94},
          'vel': {'x': 0, 'y': 0, 'z': 0},
          'color': 'orange',
          'startpos': {'x': -57900000, 'y': 0, 'z': 0},
          'startvel': {'x': 0, 'y': 0, 'z': -23.94},
        },
      ],
    ];
  }

  resetPlanets() {
    for (let i = 0; i < this.planetArray.length; i++) {
      this.planetArray[i].reset();
    }
  }
}
