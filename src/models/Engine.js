import OrbitData from 'src/models/OrbitData';
import Cart3 from 'src/models/Cart3';

export default class Engine
{
  constructor() {
    //this.G = 6.6742e-11 // universal gravitational constant - factored out to 1
    this.toRad = Math.PI / 180.0; //convert degree to radians
    //this.frame_delay_ms = 4; // delay between frames. Not to be confused with frame rate
    this.drawingScale = 1e-9;
    //this.drawingScale = 1e-2;
    this.substeps = 4;
    this.fps = 0; //for performance monitoring
    this.tps = 0; //for performance monitoring
    this.algorithm = 'verlet';
    this.collisions = true;
    this.history = true;
    this.clipping = true;
    this.basestep = 360;
    this.timestepmulti = 10;
    this.maxDistance = 100000000000;
    this.bhTheta = 0.5;
    this.useBhTree = false;
    this.orbitData = new OrbitData();
  }

  //Takes cart3 for position and velocity
  addPlanet(orbitBody) {
    orbitBody.fixed = false;
    this.orbitData.planetArray.push(orbitBody);
  }

  precalcStep(dt, speed) {
    return this.updateObjects(this.orbitData.planetArray, dt, speed);
  }

  precalculate(speed = 10) {
    return this.precalcStep(3600, speed);
  }

  updateObjects(array, dt, speed) {
    //Calculate Accelerations
    for (let i = 0; i < speed; i ++) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].fixed || array[i].destroyed) {
          continue;
        }
        array[i].oldVel = array[i].vel;
        array[i] = this.verletIntegrate(array[i], dt, array);
        array[i].updatePosition();
        if (this.collisions) {
          array[i] = this.calcCollision(array[i], array);
        }
        if (this.clipping) {
          array[i] = this.calcClipping(array[i]);
        }
      }
      this.elapsedTime += dt;
      this.orbitData.planetArray = array;
    }
    return array;
  };

  calcCollision(pa, array) {
    let radius = new Cart3();
    for (let i = 0; i < array.length; i++) {
      let pb = array[i];
      if (pa !== undefined && pb !== undefined && pa !== pb && !pb.destroyed) {
        if (pa.mass >= pb.mass) { //otherwise, wait for pb to become pa
          radius.x = 0;
          radius.y = 0;
          radius.z = 0;
          radius.addTo(pa.pos).subFrom(pb.pos);
          if (radius.abs() < pa.radius + pb.radius) {
            //collision!
            let p_a = new Cart3(pa.oldVel).multBy(pa.mass);
            let p_b = new Cart3(pb.oldVel).multBy(pb.mass);
            let vf = new Cart3(p_a).addTo(p_b).divBy(pa.mass + pb.mass);
            pa.mass += pb.mass;
            // add 'volumes' of spheres together and get a new radius
            pa.radius = Math.cbtr(
              Math.pow(pa.radius, 3) + Math.pow(pb.radius, 3));
            pa.vel = vf;
            //array.splice(i,1);
            array[i].destroyed = true;
            break; //only one collision at a time for now.
          }
        }
      }
    }
    return pa;
  };

  calcClipping(pa) {
    if (pa.pos.abs() > this.maxDistance) {
      pa.destroyed = true;
    }
    return pa;
  }

  verletIntegrate(pa, dt, array) {
    // x1 = x0 + v0 * dt + 1/2 A(x0) * dt^2
    // xn1 = 2 * xn - xn-1 + A(xn) * dt^2 = xn + xn - xn-1 + A(xn) * dt^2
    //let Xn = new Cart3(pa.pos);
    let Xn = new Cart3();
    let accel = this.calcAccel(pa, pa.pos, array);
    if (pa.oldPos === undefined) {
      let vel = new Cart3(pa.vel);
      Xn.addTo(vel.multBy(dt)).addTo(accel.multBy(dt * dt).multBy(.5));
    } else {
      Xn.addTo(pa.pos).subFrom(pa.oldPos).addTo(accel.multBy(dt * dt));
    }
    pa.deltaX = new Cart3(Xn);
    pa.deltaV = new Cart3(Xn).divBy(dt).subFrom(pa.vel);
    return pa;
  }

  calcAccel(pa, pos, array) {
    let accel;
    accel = new Cart3();
    let radius = new Cart3();
    for (let i = 0; i < array.length; i++) {
      let pb = array[i];
      //don't compute self-gravitation
      if (pa !== undefined && pb !== undefined && pa !== pb && !pb.destroyed) {
        //1. vel += dt * radius * -G * mass * radius.abs()^(-3/2)
        //2. pos += dt * vel
        //G is normalized to 1, so removed here
        radius.x = 0;
        radius.y = 0;
        radius.z = 0;
        radius.addTo(pos).subFrom(pb.pos);
        accel.addTo(radius.multBy((-1 * pb.mass * radius.invSumCube())));
      }
    }
    return accel;
  }
}
