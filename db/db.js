import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'library',
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
        \`isbn\` varchar(13) DEFAULT NULL,
        \`description\` text,
        \`status\` int DEFAULT NULL,
        \`image\` mediumtext,
        \`borrower\` varchar(50) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8`);
}

export default connection;