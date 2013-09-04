
/**
 * Module dependencies.
 */

var load = require('git-fs-repo');
var walk = require('git-walk-refs');
var human = require('git-parse-human');
var through = require('through');

/**
 * Expose `log`.
 */

module.exports = log;

/**
 * Git log stream.
 *
 * @param {String} path to repository
 * @return {Stream}
 */

function log(path) {
  var tr = through(function(rev) {
    this.queue({
      message: rev._message,
      hash: rev.hash,
      tree: rev._attrs.tree,
      date: new Date(rev.human.time),
      author: {
        name: rev.human.name,
        email: rev.human.email
      },
      committer: rev._attrs.committer.map(function(committer) {
        var h = human(committer);
        return {
          name: h.name,
          email: h.email
        };
      })
    });
  });

  load(path, function(err, repo) {
    if (err) return tr.emit('error', err);
    var hashes = repo.refs().map(get('hash'));
    walk(repo.find.bind(repo), hashes).pipe(tr);
  });

  return tr;
}

// getter helper
function get(prop) {
  return function(obj) {
    return obj[prop];
  }
}

