"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookshelfHandler = void 0;
const books_1 = require("../books");
const getAllBookshelfHandler = () => ({
    status: 'success',
    data: {
        books: books_1.default.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        })),
    },
});
exports.getAllBookshelfHandler = getAllBookshelfHandler;
//# sourceMappingURL=get-all.js.map