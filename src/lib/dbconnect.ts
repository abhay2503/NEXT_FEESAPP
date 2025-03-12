import mysql from 'mysql2/promise';

// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Abhay@123',
//     database: 'studentfees'
// })


const connection = await mysql.createConnection({
    host: 'database-3.c7aaikuech7r.ap-south-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Abhaykalp',
    database: 'studentfees'
})



export default connection;