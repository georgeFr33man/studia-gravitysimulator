export default class Cart3
{
  constructor(x, y, z) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.timestamp = 0;

    if (x instanceof Cart3) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      if (x !== undefined) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }
  }

  /* self modification */
  subFrom(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  }

  /* non modifying */
  sub(a) {
    return new Cart3(this.x - a.x, this.y - a.y, this.z - a.z);
  }

  mult(m) {
    return new Cart3(this.x * m, this.y * m, this.z * m);
  }

  multBy(m) {
    this.x *= m;
    this.y *= m;
    this.z *= m;
    return this;
  }

  divBy(m) {
    this.x /= m;
    this.y /= m;
    this.z /= m;
    return this;
  }

  add(a) {
    return new Cart3(this.x + a.x, this.y + a.y, this.z + a.z);
  }

  addTo(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  }

  invSumCube() {
    return Math.pow(this.x * this.x + this.y * this.y + this.z * this.z, -1.5);
  };

  abs() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  };

  toString() {
    return this.x + ',' + this.y + ',' + this.z;
  };
}
