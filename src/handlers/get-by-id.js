const books = require('../books')

module.exports = (request, h) => {
  const { bookId } = request.params
  const book = books.find((b) => b.id === bookId)

  if (book) {
    return {
      status: 'success',
      data: {
        book,
      },
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  })
  response.code(404)
  return response
}
