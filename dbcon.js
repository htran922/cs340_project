var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_lapank',
  password        : '4930',
  database        : 'cs340_lapank'
});
module.exports.pool = pool;
