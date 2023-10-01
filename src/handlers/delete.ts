import { Request, ResponseToolkit } from '@hapi/hapi'
import books from '../books'

export const deleteBookshelfHandler = (
  request: Request,
  h: ResponseToolkit,
) => {
  const { bookId } = request.params as { bookId: string }
  const bookIndex = books.findIndex((b) => b.id === bookId)

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  })
  response.code(404)
  return response
}
