const mysql = require('mysql2');
export const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'u6703928',
    password: '6703928',
    database: 'u6703928_csc350',
});