var query = require('..');
var assert = require('assert');

describe('fields', function () {
  it('should compile', function () {
    var ret = query('level:error');
    assert.deepStrictEqual(ret, { level: 'error' });
  });
});

describe('operators', function () {
  it('should compile', function () {
    var ret = query('level:error OR level:alert');
    assert.deepStrictEqual(ret, {
      $or: [{ level: 'error' }, { level: 'alert' }],
    });

    var ret = query('level: error OR level: alert');
    assert.deepStrictEqual(ret, {
      $or: [{ level: 'error' }, { level: 'alert' }],
    });
  });

  it('should compile when nested', function () {
    var ret = query('(level:error AND type:upload) OR type:alert');
    assert.deepStrictEqual(ret, {
      $or: [{ $and: [{ level: 'error' }, { type: 'upload' }] }, { type: 'alert' }],
    });
  });
});

describe('comparison', function () {
  it('should compile greater than', function () {
    var ret = query('level>5');
    assert.deepStrictEqual(ret, {
      level: { $gt: 5 },
    });

    var ret = query('level > 5');
    assert.deepStrictEqual(ret, {
      level: { $gt: 5 },
    });
  });

  it('should compile greater equal than', function () {
    var ret = query('level>=5');
    assert.deepStrictEqual(ret, {
      level: { $gte: 5 },
    });

    var ret = query('level >= 5');
    assert.deepStrictEqual(ret, {
      level: { $gte: 5 },
    });
  });

  it('should compile less than', function () {
    var ret = query('level<5');
    assert.deepStrictEqual(ret, {
      level: { $lt: 5 },
    });

    var ret = query('level < 5');
    assert.deepStrictEqual(ret, {
      level: { $lt: 5 },
    });
  });

  it('should compile less equal than', function () {
    var ret = query('level<=5');
    assert.deepStrictEqual(ret, {
      level: { $lte: 5 },
    });

    var ret = query('level <= 5');
    assert.deepStrictEqual(ret, {
      level: { $lte: 5 },
    });
  });

  it('should compile not equal', function () {
    var ret = query('level!=5');
    assert.deepStrictEqual(ret, {
      level: { $ne: 5 },
    });

    var ret = query('level != 5');
    assert.deepStrictEqual(ret, {
      level: { $ne: 5 },
    });
  });

  it('should compile nested', function () {
    var ret = query('(age > 20 AND age < 50) OR gender:male');
    assert.deepStrictEqual(ret, {
      $or: [{ $and: [{ age: { $gt: 20 } }, { age: { $lt: 50 } }] }, { gender: 'male' }],
    });
  });
});

describe('regex with option insensitive', function () {
  it('should compile', function () {
    var ret = query('(hostname:/^regex value.*/i)');
    assert.deepStrictEqual(ret, { hostname: /^regex value.*/i });
  });
});
