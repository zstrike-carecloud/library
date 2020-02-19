// import { Router, Request, Response } from 'express';
// import middlewares from '../middlewares';
// import { Books } from '../models/books';
// const route = Router();

const Books = require('../models/books').Books;

export default (app) => {
  app.get('/books', async (req, res) => {
    const db = req.app.get('db');
    return res.json({ books: await new Books(db).findAll() }).status(200);
  });

  app.get('/books/:id', async (req, res) => {
    const db = req.app.get('db');
    return res.json({ books: await new Books(db).findById({ id: req.params.id }) }).status(200);
  });

  app.post('/books/new', async (req, res) => {
    const db = req.app.get('db');
    const { book } = req.body;
    return res.json({ books: await new Books(db).add({ book }) }).status(200);
  });

  app.put('/books/:id', async (req, res) => {
    const db = req.app.get('db');
    const { book } = req.body;
    return res.json({ books: await new Books(db).edit({ id: req.params.id, book }) }).status(200);
  });

  const checkInOut = async (req, res, status) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { book: { borrower } } = req.body;
    console.log('BORROWER', borrower, req.body);
    return res.json({ books: await new Books(db).edit({ id, book: { status, borrower: borrower ? borrower : null } }) }).status(200);
  }

  app.put('/books/:id/checkin', async (req, res) => {
    return checkInOut(req, res, 1);
  });

  app.put('/books/:id/checkout', async (req, res) => {
    return checkInOut(req, res, 0);
  });

  app.delete('/books/:id', async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    console.log('ID', id);
    return res.json({ books: await new Books(db).delete({ id }) }).status(200);
  });
};