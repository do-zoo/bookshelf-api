import { Request, ResponseToolkit } from '@hapi/hapi'
import books from '../books'
import * as _ from 'lodash'

interface UpdatePayload {
  name: string
  year?: number
  author?: string
  summary?: string
  publisher?: string
  pageCount?: number
  readPage?: number
  reading?: boolean
}

const validPayloadKeys: Array<keyof UpdatePayload> = [
  'reading',
  'readPage',
  'pageCount',
  'publisher',
  'name',
  'author',
  'summary',
  'year',
]

const REQUIRED_FIELD: Array<{
  key: keyof UpdatePayload
  label: string
}> = [
  {
    key: 'name',
    label: 'nama buku',
  },
]

export const updateBookshelfHandler = (
  request: Request,
  h: ResponseToolkit,
) => {
  const payload = request.payload as UpdatePayload
  const payloadKey = Object.keys(payload)
  const invalidPayload = REQUIRED_FIELD.filter(
    (field) => !payloadKey.includes(field.key),
  )

  // check if the payload is invalid
  if (invalidPayload.length > 0) {
    // get index 0 from invalid payload
    const invalidField = invalidPayload[0]

    const response = h.response({
      status: 'fail',
      message: `Gagal memperbarui buku. Mohon isi ${invalidField.label}`,
    })
    response.code(400)
    return response
  }

  const readPage = payload.readPage || 0

  // check if readPage more than pageCount
  if (readPage > payload.pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400)
    return response
  }

  const { bookId } = request.params as { bookId: string }
  const bookIndex = books.findIndex((b) => b.id === bookId)

  if (bookIndex !== -1) {
    const updatedAt = new Date().toISOString()
    const finished = Boolean(readPage === payload.pageCount)

    const insertedValues = _.pick(payload, validPayloadKeys)

    books[bookIndex] = {
      ...books[bookIndex],
      ...insertedValues,
      finished,
      updatedAt,
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  })
  response.code(404)
  return response
}
