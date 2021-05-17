import Engine from 'src/models/Engine';
import OrbitBody from 'src/models/OrbitBody';
import Cart3 from 'src/models/Cart3';
import {SpaceObject} from 'src/models/SpaceObject';
import Victor from 'victor';

export class GravitySystem
{
  MAX_MARKER_SIZE = 20;
  MIN_MARKER_SIZE = 5;

  constructor(variables, app) {
    this.app = app;
    this.mass = {
      first: Number.parseInt(variables.object1.mass),
      second: Number.parseInt(variables.object2.mass),
    };
    this.speed = {
      first: Number.parseInt(variables.object1.speed),
      second: Number.parseInt(variables.object2.speed),
    };
    this.objectRadius = {
      first: Number.parseInt(variables.object1.radius),
      second: Number.parseInt(variables.object2.radius),
    };
    this.radius = Number.parseInt(variables.initials.radius);
    this.reductedMass = (this.mass.second * this.mass.first)
      / (this.mass.second + this.mass.first);
    this.timeFrame = 0;
    this.history = {
      object1: {x: [], y: []},
      object2: {x: [], y: []},
    };
    this.buildSpaceObjects();
    this.createGravitySystem();
  }

  createGravitySystem() {
    this.engine = new Engine();
    let object1 = new OrbitBody(
      this.spaceObjects.first.name,
      this.spaceObjects.first.radius,
      new Cart3(
        this.spaceObjects.first.vector.x, 0, this.spaceObjects.first.vector.y), //cart3 vector
      new Cart3(0, 0, this.spaceObjects.first.speed), //cart3 vector
      this.spaceObjects.first.mass,
    );
    let object2 = new OrbitBody(
      this.spaceObjects.second.name,
      this.spaceObjects.second.radius,
      new Cart3(
        this.spaceObjects.second.vector.x, 0,
        this.spaceObjects.second.vector.y,
      ), //cart3 vector
      new Cart3(0, 0, this.spaceObjects.second.speed), //cart3 vector
      this.spaceObjects.second.mass,
    );
    this.engine.addPlanet(object1);
    this.engine.addPlanet(object2);
  }

  buildSpaceObjects() {
    this.spaceObjects = {
      first: new SpaceObject(
        160000000,
        0,
        this.mass.first,
        this.speed.first,
        this.markerSizes.first,
        this.objectRadius.first,
      '#B71C1C',
      this.app.$t('chart.data.object') + ' 1',
      ),
      second: new SpaceObject(
        160000000 + this.radius,
        0,
        this.mass.second,
        this.speed.second,
        this.markerSizes.second,
        this.objectRadius.second,
        '#01579B',
        this.app.$t('chart.data.object') + ' 2',
      ),
    };
  }

  get markerSizes() {
    let objectSize1 = this.MAX_MARKER_SIZE;
    let objectSize2 = this.MAX_MARKER_SIZE;
    let sizeFactor = 0;
    if (this.mass.first > this.mass.second) {
      sizeFactor = (this.MAX_MARKER_SIZE *
        (this.mass.second / this.mass.first));
      objectSize2 = sizeFactor < this.MIN_MARKER_SIZE
        ? this.MIN_MARKER_SIZE
        : sizeFactor;
    } else if (this.mass.second > this.mass.first) {
      sizeFactor = (this.MAX_MARKER_SIZE *
        (this.mass.first / this.mass.second));
      objectSize1 = sizeFactor < this.MIN_MARKER_SIZE
        ? this.MIN_MARKER_SIZE
        : sizeFactor;
    }
    return {
      first: objectSize1,
      second: objectSize2,
    };
  }

  generate() {
    return [
      ...this.generateHelpingVectors(),
      this.spaceObjects.first.generate(),
      this.spaceObjects.second.generate(),
    ];
  }

  generateHelpingVectors() {
    return [
      this.vectorSM,
      this.vectorR1,
      this.vectorR2,
      this.vectorR,
      ...this.historyVectors
    ];
  }

  next(speed = 10, historyLength = 10) {
    // calculates next time step
    let calculated = this.engine.precalculate(speed);
    this.spaceObjects.first.vector = new Victor(
      calculated[0].pos.x, calculated[0].pos.z);
    this.spaceObjects.second.vector = new Victor(
      calculated[1].pos.x, calculated[1].pos.z);
    this.centerSystem();
    this.addToHistory(speed, historyLength);
    return this.generate();
  }

  centerSystem() {
    let massCenterCopy = JSON.parse(JSON.stringify(this.massCenter));
    if (massCenterCopy.y < 0) {
      this.spaceObjects.first.vector.addScalarY(Math.abs(massCenterCopy.y));
      this.spaceObjects.second.vector.addScalarY(Math.abs(massCenterCopy.y));
    } else {
      this.spaceObjects.first.vector.subtractScalarY(Math.abs(massCenterCopy.y));
      this.spaceObjects.second.vector.subtractScalarY(Math.abs(massCenterCopy.y));
    }
  }

  addToHistory(speed, historyLength) {
    if (this.history.object1.x.length > (40 * historyLength - (speed * 8))) {
      this.history.object1.x.shift();
      this.history.object1.y.shift();
      this.history.object2.x.shift();
      this.history.object2.y.shift();

    }
    this.history.object1.x.push(this.spaceObjects.first.vector.x);
    this.history.object1.y.push(this.spaceObjects.first.vector.y);
    this.history.object2.x.push(this.spaceObjects.second.vector.x);
    this.history.object2.y.push(this.spaceObjects.second.vector.y);
  }

  get massCenter() {
    let x = (
      this.mass.first * this.spaceObjects.first.vector.x
      + this.mass.second * this.spaceObjects.second.vector.x
    ) / (this.mass.first + this.mass.second);
    let y = (
      this.mass.first * this.spaceObjects.first.vector.y
      + this.mass.second * this.spaceObjects.second.vector.y
    ) / (this.mass.first + this.mass.second);
    return new Victor(x, y);
  }

  get vectorR() {
    return this.dashLine(
      this.app.$t('chart.data.vectorR'),
      [this.spaceObjects.first.vector.x, this.spaceObjects.second.vector.x],
      [this.spaceObjects.first.vector.y, this.spaceObjects.second.vector.y],
      '#673AB7'
    );
  }

  get vectorR1() {
    return this.dashLine(
      this.app.$t('chart.data.vectorR') + '1',
      [0, this.spaceObjects.first.vector.x],
      [0, this.spaceObjects.first.vector.y],
      '#6D4C41'
    );
  }

  get vectorR2() {
    return this.dashLine(
      this.app.$t('chart.data.vectorR') + '2',
      [0, this.spaceObjects.second.vector.x],
      [0, this.spaceObjects.second.vector.y],
      '#43A047'
    );
  }

  get historyVectors() {
    return [
      this.dashLine(
        this.app.$t('chart.data.history') + '1',
        this.history.object1.x,
        this.history.object1.y,
        '#C62828',
      ),
      this.dashLine(
        this.app.$t('chart.data.history') + '2',
        this.history.object2.x,
        this.history.object2.y,
        '#0277BD',
      ),
    ];
  }

  get vectorSM() {
    return this.dashLine(
      this.app.$t('chart.data.vectorSM'),
      [0, this.massCenter.x],
      [0, this.massCenter.y],
      '#F9A825',
      'lines+markers',
    );
  }

  dashLine(name, x, y, color, mode = 'lines') {
    return {
      name,
      x: x,
      y: y,
      mode,
      line: {
        width: 2,
        dash: 'dot',
      },
      marker: {
        color,
        line: {
          color
        }
      }
    };
  }
}
