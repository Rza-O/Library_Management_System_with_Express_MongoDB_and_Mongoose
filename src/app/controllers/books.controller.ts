import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRoutes = express.Router();

/**
 * POST /api/books
 * GET /api/books
 * GET /api/books/:bookId
 * PUT /api/books/:bookId
 * DELETE /api/books/:bookId
 */

booksRoutes.post("/", async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const book = await Book.create(body);
		res.status(201).json({ message: "Book created successfully", success: true, book });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Validation failed", success: false, error });
	}
});

booksRoutes.get("/", async (req: Request, res: Response) => {
	try {
		const { filter, sortBy, sort, limit } = req.query;

		const filterCondition = filter ? { genre: filter } : {};
		let query = Book.find(filterCondition);
		const limitCondition = limit ? parseInt(limit as string) : 10;

		if (sortBy) query = query.sort({ [sortBy as string]: sort === "desc" ? -1 : 1 });
		if (limit) query = query.limit(limitCondition);

		const books = await query;
		res.status(200).json({ message: "Books retrieved successfully", success: true, data: books });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "Operation failed", success: false, error });
	}
});

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const books = await Book.findById(bookId);
		res.status(200).json({ message: "Books retrieved successfully", success: true, data: books });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "Fetching book failed", success: false, error });
	}
});

booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const updateBody = req.body;
		const book = await Book.findByIdAndUpdate(bookId, updateBody, { new: true });
		res.status(200).json({ message: "Book updated successfully", success: true, data: book });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "Updating Operation failed", success: false, error });
	}
});

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		await Book.findByIdAndDelete(bookId, { new: true });
		res.status(200).json({ message: "Book deleted successfully", success: true, data: null });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "Deleting Operation failed", success: false, error });
	}
});
