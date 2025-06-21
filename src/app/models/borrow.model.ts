import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
	{
		book: {
			type: Schema.Types.ObjectId,
			ref: "Book",
			required: [true, "Pleaser provide valid book before proceeding"],
		},
		quantity: { type: Number, required: [true, "Quantity has to be specified"], min: [1, "Borrowed Quantity cannot be less than 1"] },
		dueDate: { type: Date, required: [true, "Returned Date has to be specified before borrowing"] },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export const Borrow = model("Borrow", borrowSchema);
