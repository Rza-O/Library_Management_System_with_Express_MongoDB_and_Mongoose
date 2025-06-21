import { Model, model, Schema } from "mongoose";
import { IBook, IDeductCopies } from "../interfaces/book.interfaces";

/**
 * title (string) — Mandatory. The book’s title.
author (string) — Mandatory. The book’s author.
genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
description (string) — Optional. A brief summary or description of the book.
copies (number) — Mandatory. Non-negative integer representing total copies available.
available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.
 */

const bookSchema = new Schema<IBook, Model<IBook>, IDeductCopies>(
	{
		title: { type: String, required: true, trim: true },
		author: { type: String, required: true, trim: true },
		genre: {
			type: String,
			enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
			required: true,
			uppercase: true,
			trim: true,
		},
		isbn: { type: String, required: true, unique: true, trim: true },
		description: { type: String, default: "" },
		copies: { type: Number, required: true, min: [0, "Copies cannot be a negative number"] },
		available: { type: Boolean, default: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

// if copy is zero while inserting the book this falsify the availability
bookSchema.pre("save", function (next) {
	if (this.copies === 0) {
		this.available = false;
	} else if (this.copies > 0) {
		this.available = true;
	}
	next();
});

// Static method for reducing copies or setting availability to false
bookSchema.method("deductCopies", async function deductCopies(quantity: number): Promise<void> {
	this.copies -= quantity;
	if (this.copies === 0) this.available = false;
	await this.save();
});

export const Book = model("Book", bookSchema);
