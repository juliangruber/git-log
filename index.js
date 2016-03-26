
/**
 * Module dependencies.
 */

var load = require('git-fs-repo');
var walk = require('git-walk-refs');
var parseHuman = require('git-parse-human');
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
    var log = {
      message: rev._message,
      hash: rev.hash,
      tree: rev._attrs.tree,
      date: new Date(rev.human.time),
      author: {
        name: rev.human.name,
        email: rev.human.email
      }
    };

    if (rev._attrs.committer) {
      log.committer = rev._attrs.committer.map(toHuman);
    }

    if (rev._attrs.tagger) {
      log.tagger = rev._attrs.tagger.map(toHuman);
    }

    this.queue(log);
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

function toHuman(str) {
  var h = parseHuman(str);
  return {
    name: h.name,
    email: h.email
  };
}
