// import { Router, Request, Response } from 'express';
// import middlewares from '../middlewares';
// import { Books } from '../models/books';
// const route = Router();

const Books = require('../models/books').Books;

export default (app) => {
//   app.use('/users', route);

  app.get('/books', async (req, res) => {
    return res.json({ books: await new Books().findAll() }).status(200);
  });

  app.get('/books/:id', async (req, res) => {
    return res.json({ books: await new Books().findById({ id: req.params.id }) }).status(200);
  });

  app.post('/books/new', async (req, res) => {
    const { book } = req.body;
    return res.json({ books: await new Books().add({ book }) }).status(200);
  });

  app.put('/books/:id', async (req, res) => {
    const { book } = req.body;
    return res.json({ books: await new Books().edit({ id: req.params.id, book }) }).status(200);
  });

  app.put('/books/:id/checkin', async (req, res) => {
    const { id } = req.params;
    return res.json({ books: await new Books().edit({ id, book: { status: 1 } }) }).status(200);
  });

  app.put('/books/:id/checkout', async (req, res) => {
    const { id } = req.params;
    return res.json({ books: await new Books().edit({ id, book: { status: 0 } }) }).status(200);
  });
};