"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookshelfByIdHandler = void 0;
const books_1 = require("../books");
const getBookshelfByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books_1.default.find((b) => b.id === bookId);
    if (book) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};
exports.getBookshelfByIdHandler = getBookshelfByIdHandler;
//# sourceMappingURL=get-by-id.js.map