const sql = require('mssql');

const config = {
  server: 'localhost',
  database: 'FlipkartClone',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    driver: 'msnodesqlv8',
    trustedConnection: true
  }
};

module.exports = { sql, config }; 