'use strict'

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

  const { bookId } = request.params
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
