import mysql from 'mysql';

export class Books {
  constructor(db) {
    this.connection = db;
  }

  promisifyQuery(query, values = []) {
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
    }).then(value => value).catch(err => err);
  }

  findAll() {
    return this.promisifyQuery('SELECT * FROM books ORDER BY title, author ASC');
  };

  findById({ id }) {
    return this.promisifyQuery(`SELECT * FROM books WHERE id = ${mysql.escape(id)}`)
  };

  add({ book }) {
    return this.promisifyQuery(`INSERT INTO books SET ?`, [book]);
  };

  edit({ id, book }) {
    const values = [book, id];
    const query = `
      UPDATE books SET ?
      WHERE ID = ?
    `;
    return this.promisifyQuery(query, values);
  };

  delete({ id }) {
    return this.promisifyQuery(`DELETE FROM books WHERE id = ${mysql.escape(id)}`);
  };
}