import books from '../books'
import { Request, ResponseToolkit } from '@hapi/hapi'

export const getBookshelfByIdHandler = (
  request: Request,
  h: ResponseToolkit,
) => {
  const { bookId } = request.params as { bookId: string }
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
