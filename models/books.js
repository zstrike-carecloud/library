import mysql from 'mysql';
import fs from 'fs';

export class Books {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'library',
    });
    this.connection.connect((err) => {
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });
  }

  promisify(query, values = []) {
    return new Promise(async (resolve, reject) => {
      !values.length && this.connection.query(query, (err,rows) => {
        if(err) throw reject(err);
        console.log('Data received from Db:');
        console.log(rows);
        resolve(rows);
      });
      values.length && this.connection.query(query, values, (err,rows) => {
        if(err) throw reject(err);
        console.log('Data received from Db:');
        console.log(rows);
        resolve(rows);
      });
    }).then(value => value);
  }

  findAll() {
    return this.promisify('SELECT * FROM books');
  };

  findById({ id }) {
    return this.promisify(`SELECT * FROM books WHERE id = ${mysql.escape(id)}`)
  };

  add({ book }) {
    book.image = fs.readFileSync(__dirname + "/lotr.jpg");
    return this.promisify(`INSERT INTO books SET ?`, [book]);
  };

  edit({ id, book }) {
    const values = [book, id];
    const query = `
      UPDATE books SET ?
      WHERE ID = ?
    `;
    return this.promisify(query, values);
  };
}

  // con.end((err) => {
  //   // The connection is terminated gracefully
  //   // Ensures all remaining queries are executed
  //   // Then sends a quit packet to the MySQL server.
  // });