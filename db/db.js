import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.BOOKS_CONNECTION_HOST,
    user: process.env.BOOKS_CONNECTION_USER,
    password: process.env.BOOKS_CONNECTION_PASSWORD,
    database: process.env.BOOKS_CONNECTION_DB,
});
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

export const initTable = () => {
    connection.query(`CREATE TABLE IF NOT EXISTS \`books\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`title\` varchar(50) DEFAULT NULL,
        \`author\` varchar(50) DEFAULT NULL,
        \`isbn\` varchar(17) DEFAULT NULL,
        \`description\` text,
        \`status\` int DEFAULT 0,
        \`image\` mediumtext,
        \`borrower\` varchar(50) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8`);
}

export default connection;