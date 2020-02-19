const { check, validationResult, body } = require('express-validator');

const Books = require('../models/books').Books;

// TODO: Finish input validators and add descriptive messages
// TODO: Extract repeated validator error logic
export default (app) => {
  app.get('/books', async (req, res) => {
    const db = req.app.get('db');
    return res.json({ books: await new Books(db).findAll() }).status(200);
  });

  app.get('/books/:id', [
    check('id').isInt(),
  ], async (req, res) => {
    const db = req.app.get('db');
    return res.json({ books: await new Books(db).findById({ id: req.params.id }) }).status(200);
  });

  app.post('/books/new', [
    body(['book.title']).isString(),
    body(['book.author']).optional().isString(),
    body(['book.isbn']).optional().isISBN(),
    body(['book.image']).optional().isDataURI(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
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
    return res.json({ books: await new Books(db).edit({ id, book: { status, borrower: borrower ? borrower : null } }) }).status(200);
  }

  app.put('/books/:id/checkin', [
    check('id').isInt()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return checkInOut(req, res, 1);
  });

  app.put('/books/:id/checkout', async (req, res) => {
    return checkInOut(req, res, 0);
  });

  app.delete('/books/:id', async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    return res.json({ books: await new Books(db).delete({ id }) }).status(200);
  });
};