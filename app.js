import routes from './api/routes';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { db, initTable } from './db';

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json({ limit: '50MB' }));

initTable();

app.set('db', db);

routes(app);

app.listen(port, () => console.log(`Books app listening on port ${port}!`))