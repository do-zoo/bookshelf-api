const { nanoid } = require('nanoid')
const books = require('../books')
const _ = require('lodash')

const validPayloadKeys = [
  'reading',
  'readPage',
  'pageCount',
  'publisher',
  'name',
  'author',
  'summary',
  'year',
]

const REQUIRED_FIELD = [
  {
    key: 'name',
    label: 'nama buku',
  },
  {
    key: 'pageCount',
    label: 'total halaman',
  },
]

module.exports = (request, h) => {
  const payload = request.payload
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
      message: `Gagal menambahkan buku. Mohon isi ${invalidField.label}`,
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
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400)
    return response
  }

  const id = nanoid()
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = Boolean(readPage === payload.pageCount)

  const insertedValues = _.pick(payload, validPayloadKeys)

  const newBookshelf = {
    id,
    ...insertedValues,
    readPage,
    finished,
    insertedAt,
    updatedAt,
  }

  books.push(newBookshelf)

  const isSuccess = books.some((book) => book.id === id)

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Oops, terjadi kesalahan server',
  })
  response.code(500)
  return response
}
