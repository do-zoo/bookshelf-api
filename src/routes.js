const {
  createBookshelfHandler,
  deleteBookshelfHandler,
  getAllBookshelfHandler,
  getBookshelfByIdHandler,
  updateBookshelfHandler,
} = require('./handlers')

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookshelfHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBookshelfHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookshelfByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookshelfHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookshelfHandler,
  },
]

module.exports = routes
