
# git-log

Git log stream using jsgit.

[![build status](https://secure.travis-ci.org/juliangruber/git-log.png)](http://travis-ci.org/juliangruber/git-log)

## Example

```js
var log = require('git-log');

log(__dirname + '/.git').on('data', console.log);
```

```bash
$ node example.js
{ message: 'initial commit\n',
  hash: '9407e380dfff07d86fa1b1c36ec704b2bdd96e9c',
  tree: [ 'c08f6e872c2a0b58afcb0f0ee68e7807875905d4' ],
  date: Wed Sep 04 2013 09:51:17 GMT+0200 (CEST),
  author: { name: 'Julian Gruber', email: 'julian@juliangruber.com' },
  committer: [ { name: 'Julian Gruber', email: 'julian@juliangruber.com' } ] }
```

## API

### var stream = log(path)

Create a readable stream that emits commits for the git repository in `path`,
starting from the newest one.

### stream.on('data', fn)

For every commit, call `fn` with an object with keys `message`, `hash`, `tree`,
`date`, `author`, `committer`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install git-log
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
