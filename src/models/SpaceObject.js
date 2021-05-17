import Victor from 'victor';

class SpaceObject
{
  /***
   *
   * @param x {Number}
   * @param y {Number}
   * @param mass {Number}
   * @param speed {Number}
   * @param size {Number}
   * @param radius {Number}
   * @param color {String}
   * @param name {String}
   */
  constructor(
    x,
    y,
    mass,
    speed,
    size,
    radius,
    color,
    name,
  ) {
    this.vector = new Victor(x, y);
    this.mass = mass;
    this.speed = speed;
    this.radius = radius;
    this.size = size;
    this.color = color;
    this.name = name;
  }

  /***
   *
   * @return {{mode: string, marker: {size: Number}, name: String, x: Number[], y: Number[]}}
   */
  generate() {
    return {
      name: this.name,
      x: [this.vector.x],
      y: [this.vector.y],
      mode: 'markers',
      marker: {
        color: this.color,
        size: this.size,
        line: {
          color: this.color,
        },
      },
    };
  }
}

export {SpaceObject};
