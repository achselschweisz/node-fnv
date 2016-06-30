'use strict';
/* global suite: false, setup: false, test: false,
    teardown: false, suiteSetup: false, suiteTeardown: false */
const assert = require('assert');
const FNV = require('../');


suite('FNV', function() {


  test('Chainable .update()', () => {
    assert.strictEqual(new FNV().update('foobar').digest('hex'), 'bf9cf968');
  });


  test('#init', () => {
    const h = new FNV();

    assert.strictEqual(h.digest('hex'), '811c9dc5');
  });


  test('#empty', () => {
    const h = new FNV();

    h.update(Buffer(''));
    const digest = h.digest();
    assert(digest);
  });


  test('#foobar', () => {
    const h = new FNV();

    h.update(Buffer('foobar'));
    assert.strictEqual(h.digest('hex'), 'bf9cf968');
  });


  test('#a', () => {
    const h = new FNV();

    h.update(Buffer('a'));
    assert.strictEqual(h.digest('hex'), 'e40c292c');
  });


  test('#foobar-zero', () => {
    const h = new FNV();

    h.update(Buffer('foobar\0'));
    assert.strictEqual(h.digest('hex'), '0c1c9eb8');
  });


  test('#foo split bar', () => {
    const h = new FNV();

    h.update(Buffer('foo'));
    h.update(Buffer('bar'));
    assert.strictEqual(h.digest('hex'), 'bf9cf968');
  });


  test('#type string', function() {
    let h = new FNV();

    h.update('');
    assert.strictEqual(h.digest('hex'), '811c9dc5');
    h.update('foobar');
    assert.strictEqual(h.digest('hex'), 'bf9cf968');

    h = new FNV();

    h.update('a');
    assert.strictEqual(h.digest('hex'), 'e40c292c');

    const val = h.value();
    assert.strictEqual(val, -468965076);
  });


  test('#type not supported', function() {
    const h = new FNV();

    assert.throws(
      function() {
        h.update({foo: 42});
      }
    );
  });
});