'use strict';
/* implement http://tools.ietf.org/html/draft-eastlake-fnv-04 */



class FNV {

  constructor() {
    /* offset_basis */
    this.hash = 0x811C9DC5;
  }


  update(data) {
    if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
      throw new Error('FNV.update expectes String or Buffer');
    }
    if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data + '', 'utf8');
    }

    const len = data.length;

    for (let i = 0; i < len; i++) {
      this.hash = this.hash ^ data[i];
      /* 32 bit FNV_Prime = 2**24 + 2**8 + 0x93 */
      this.hash += (this.hash << 24) + (this.hash << 8) + (this.hash << 7) + (this.hash << 4) + (this.hash << 1);
    }

    // Make API chainable
    return this;
  }


  digest(encoding) {
    encoding = encoding || 'binary';
    const buf = Buffer.alloc(4);
    buf.writeInt32BE(this.hash & 0xffffffff, 0);
    return buf.toString(encoding);
  }


  value() {
    return this.hash & 0xffffffff;
  }
}


module.exports = FNV;
