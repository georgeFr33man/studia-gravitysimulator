import Cart3 from 'src/models/Cart3';

export default class OrbitBody
{
  constructor(name, radius, pos, vel, mass) {
    this.name = name; //string
    this.radius = radius; //scalar
    this.mass = mass; //scalar
    this.pos = pos
    this.vel = vel; //cart3 vector
    this.startpos = new Cart3(pos);
    this.startvel = new Cart3(vel);
    this.startmass = mass;
    this.startrad = radius;
    this.history = [new Cart3(pos)];
    this.fixed = false;
    this.renderPos = new Cart3();
    this.destroyed = false;
    this.deltaV; //cart3
    this.deltaX; //cart3
  }

  reset() {
    this.pos = new Cart3(this.startpos);
    this.vel = new Cart3(this.startvel);
    this.mass = this.startmass;
    this.radius = this.startrad;
    this.history = [new Cart3(this.startpos)];
    this.scaledHistory = undefined;
    this.oldPos = undefined;
    this.destroyed = false;
    this.deltaV = undefined;
    this.deltaX = undefined;
  }

  resetScaledHistory() {
    this.scaledHistory = undefined;
  }

  updatePosition() {
    this.oldPos = new Cart3(this.pos); // This is needed to switch to verlet
    this.pos.addTo(this.deltaX);
    this.vel.addTo(this.deltaV);
  }
}
