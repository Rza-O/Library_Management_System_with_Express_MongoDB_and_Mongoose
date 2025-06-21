import { Model, model, Schema } from "mongoose";
import { IBook, IDeductCopies } from "../interfaces/book.interfaces";

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

// if copy is zero while inserting the book, this falsify the availability
bookSchema.pre("save", function (next) {
	if (this.copies === 0) {
		this.available = false;
	}
	next();
});

// instance method for reducing copies or setting availability to false
bookSchema.method("deductCopies", async function deductCopies(quantity: number): Promise<void> {
	this.copies -= quantity;
	if (this.copies === 0) this.available = false;
	await this.save();
});

export const Book = model("Book", bookSchema);
