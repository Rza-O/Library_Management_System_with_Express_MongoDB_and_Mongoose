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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { book, quantity } = body;
        // check if book is available
        const availableBook = yield book_model_1.Book.findOne({ _id: book, available: true, copies: { $gte: quantity } });
        if (availableBook) {
            // instance method to change copies and availability
            yield availableBook.deductCopies(quantity);
            // save borrowed book info
            const bookBorrowed = yield borrow_model_1.Borrow.create(body);
            res.status(201).json({ success: true, message: "Book borrowed successfully", data: bookBorrowed });
        }
        else {
            res.status(200).json({ success: false, message: "Please check books availability or quantity", data: availableBook });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Borrowing failed", success: false, error });
    }
}));
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksBorrowed = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({ success: true, message: "Borrowed books summary retrieved successfully", data: booksBorrowed });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Operation failed", success: false, error });
    }
}));
