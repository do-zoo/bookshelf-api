"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookshelfHandler = void 0;
const books_1 = require("../books");
const deleteBookshelfHandler = (request, h) => {
    const { bookId } = request.params;
    const bookIndex = books_1.default.findIndex((b) => b.id === bookId);
    if (bookIndex !== -1) {
        books_1.default.splice(bookIndex, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
exports.deleteBookshelfHandler = deleteBookshelfHandler;
//# sourceMappingURL=delete.js.map