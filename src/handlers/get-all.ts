import books from '../books'
import { Request, ResponseToolkit } from '@hapi/hapi'

interface QueryParams {
  reading?: '1' | '0'
  finished?: '1' | '0'
  name?: string
}

export const getAllBookshelfHandler = (
  request: Request,
  h: ResponseToolkit,
) => {
  const params = request.query as QueryParams

  const mappedBooks = books
    .filter((book) => {
      if (params.reading) {
        const isReading = !!Number(params.reading)
        if (isReading) {
          return book.reading
        }

        return !book.reading
      }

      if (params.finished) {
        const isFinished = !!Number(params.finished)
        if (isFinished) {
          return book.finished
        }

        return !book.finished
      }

      return true
    })
    .map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }))

  let booksData = mappedBooks

  if (params.name) {
    booksData = mappedBooks.filter((book) =>
      book.name.toLowerCase().includes(params.name.toLowerCase()),
    )
  }

  return {
    status: 'success',
    data: {
      books: booksData,
    },
  }
}
