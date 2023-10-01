import type { ServerRoute } from '@hapi/hapi'
import {
  createBookshelfHandler,
  deleteBookshelfHandler,
  getAllBookshelfHandler,
  getBookshelfByIdHandler,
  updateBookshelfHandler,
} from './handlers'

export const routes: ServerRoute[] = [
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
