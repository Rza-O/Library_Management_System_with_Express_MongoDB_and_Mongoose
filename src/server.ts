import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
	try {
		await mongoose.connect(process.env.MONGODB_URL as string);
		console.log("🥭 DB is up and running");
		app.listen(PORT, () => {
			console.log(`🚀Library Launched at port ${PORT}🚀`);
		});
	} catch (error) {
		console.log("❌🪸 Launch Failed", error);
	}
}
main();
