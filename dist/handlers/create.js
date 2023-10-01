"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookshelfHandler = void 0;
const uuid_1 = require("uuid");
const books_1 = require("../books");
const _ = require("lodash");
const validPayloadKeys = [
    'reading',
    'readPage',
    'pageCount',
    'publisher',
    'name',
    'author',
    'summary',
    'year',
];
const REQUIRED_FIELD = [
    {
        key: 'name',
        label: 'nama buku',
    },
    {
        key: 'pageCount',
        label: 'total halaman',
    },
];
const createBookshelfHandler = (request, h) => {
    const payload = request.payload;
    const payloadKey = Object.keys(payload);
    const invalidPayload = REQUIRED_FIELD.filter((field) => !payloadKey.includes(field.key));
    // check if the payload is invalid
    if (invalidPayload.length > 0) {
        // get index 0 from invalid payload
        const invalidField = invalidPayload[0];
        const response = h.response({
            status: 'fail',
            message: `Gagal menambahkan buku. Mohon isi ${invalidField.label}`,
        });
        response.code(400);
        return response;
    }
    const readPage = payload.readPage || 0;
    // check if readPage more than pageCount
    if (readPage > payload.pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const id = (0, uuid_1.v4)();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = Boolean(readPage === payload.pageCount);
    const insertedValues = _.pick(payload, validPayloadKeys);
    const newBookshelf = Object.assign(Object.assign({ id }, insertedValues), { readPage,
        finished,
        insertedAt,
        updatedAt });
    books_1.default.push(newBookshelf);
    const isSuccess = books_1.default.some((book) => book.id === id);
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Oops, terjadi kesalahan server',
    });
    response.code(500);
    return response;
};
exports.createBookshelfHandler = createBookshelfHandler;
//# sourceMappingURL=create.js.map