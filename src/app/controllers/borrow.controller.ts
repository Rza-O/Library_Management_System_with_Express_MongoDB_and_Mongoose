import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const { book, quantity } = body;
		// check if book is available
		const availableBook = await Book.findOne({ _id: book, available: true, copies: { $gte: quantity } });
		if (availableBook) {
			// instance method to change copies and availability
			await availableBook.deductCopies(quantity);
			// save borrowed book info
			const bookBorrowed = await Borrow.create(body);
			res.status(201).json({ success: true, message: "Book borrowed successfully", data: bookBorrowed });
		} else {
			res.status(200).json({ success: false, message: "Please check books availability or quantity", data: availableBook });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Borrowing failed", success: false, error });
	}
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
	try {
		const booksBorrowed = await Borrow.aggregate([
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
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "Operation failed", success: false, error });
	}
});
