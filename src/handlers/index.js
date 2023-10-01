const createBookshelfHandler = require('./create')
const deleteBookshelfHandler = require('./delete')
const getAllBookshelfHandler = require('./get-all')
const getBookshelfByIdHandler = require('./get-by-id')
const updateBookshelfHandler = require('./update')

module.exports = {
  createBookshelfHandler,
  deleteBookshelfHandler,
  getAllBookshelfHandler,
  getBookshelfByIdHandler,
  updateBookshelfHandler,
}
