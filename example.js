var log = require('./');

log(__dirname + '/.git').on('data', console.log);
