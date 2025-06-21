"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Pleaser provide valid book before proceeding"],
    },
    quantity: { type: Number, required: [true, "Quantity has to be specified"], min: [1, "Borrowed Quantity cannot be less than 1"] },
    dueDate: { type: Date, required: [true, "Returned Date has to be specified before borrowing"] },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
