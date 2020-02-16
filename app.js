import routes from './api/routes';
import bodyParser from 'body-parser';

const express = require('express')
const app = express()
const port = 3000;

app.use(bodyParser.json());

// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'library',
//   });
// connection.connect((err) => {
//     if(err){
//       console.log('Error connecting to Db');
//       return;
//     }
//     console.log('Connection established');
// });

// const routes = require('./api/routes')(app);
routes(app);

// app.use(routes(app))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))