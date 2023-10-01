"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const handlers_1 = require("./handlers");
exports.routes = [
    {
        method: 'GET',
        path: '/books',
        handler: handlers_1.getAllBookshelfHandler,
    },
    {
        method: 'POST',
        path: '/books',
        handler: handlers_1.createBookshelfHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: handlers_1.getBookshelfByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: handlers_1.updateBookshelfHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: handlers_1.deleteBookshelfHandler,
    },
];
//# sourceMappingURL=routes.js.map