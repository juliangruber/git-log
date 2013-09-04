var log = require('./');
var test = require('tape');

test('log', function(t) {
  t.plan(1);
  var rev;

  log(__dirname + '/.git')
  .on('data', function(r) { rev = r })
  .on('end', function() {
    t.deepEqual(rev, {
      message: 'initial commit\n',
      hash: '9407e380dfff07d86fa1b1c36ec704b2bdd96e9c',
      tree: [ 'c08f6e872c2a0b58afcb0f0ee68e7807875905d4' ],
      date: new Date('Wed Sep 04 2013 09:51:17 GMT+0200 (CEST)'),
      author: { name: 'Julian Gruber', email: 'julian@juliangruber.com' },
      committer: [ { name: 'Julian Gruber', email: 'julian@juliangruber.com' } ]
    });
  });
});

