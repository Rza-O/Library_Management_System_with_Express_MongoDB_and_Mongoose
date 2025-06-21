"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({ success: true, message: "Book created successfully", data: book });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Validation failed", error });
    }
}));
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const filterCondition = filter ? { genre: filter } : {};
        const limitCondition = limit ? parseInt(limit) : 10;
        let query = book_model_1.Book.find(filterCondition).limit(limitCondition);
        if (sortBy)
            query = query.sort({ [sortBy]: sort === "desc" ? -1 : 1 });
        const books = yield query;
        res.status(200).json({ success: true, message: "Books retrieved successfully", data: books });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Operation failed", success: false, error });
    }
}));
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const books = yield book_model_1.Book.findById(bookId);
        res.status(200).json({ success: true, message: "Books retrieved successfully", data: books });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Fetching book failed", success: false, error });
    }
}));
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updateBody = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updateBody, { new: true });
        res.status(200).json({ success: true, message: "Book updated successfully", data: book });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Updating Operation failed", success: false, error });
    }
}));
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.Book.findByIdAndDelete(bookId, { new: true });
        res.status(200).json({ success: true, message: "Book deleted successfully", data: null });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Deleting Operation failed", success: false, error });
    }
}));
