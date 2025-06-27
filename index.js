const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Step 4: Dummy array to store books
let books = [
    { id: 1, title: 'Book One', author: 'Author A' },
    { id: 2, title: 'Book Two', author: 'Author B' },
];

// Step 5: GET /books - return all books
app.get('/books', (req, res) => {
    res.json(books);
});
 app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});
// Step 6: POST /books - add a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
});

// Step 7: PUT /books/:id - update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    let bookFound = false;

    books = books.map(book => {
        if (book.id === bookId) {
            bookFound = true;
            return { ...book, ...updatedBook, id: bookId };
        }
        return book;
    });

    if (bookFound) {
        res.json({ message: 'Book updated successfully.' });
    } else {
        res.status(404).json({ message: 'Book not found.' });
    }
});

// Step 8: DELETE /books/:id - remove a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(book => book.id !== bookId);

    if (books.length < initialLength) {
        res.json({ message: 'Book deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Book not found.' });
    }
});

// Step 9: Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
