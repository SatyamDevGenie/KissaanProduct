import dotenv from "dotenv";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Delete existing users to avoid duplication
    await User.deleteMany();

    // Insert users into the database
    await User.insertMany(users);

    console.log("Users imported successfully!");
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all users
    await User.deleteMany();

    console.log("Users data destroyed!");
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

// Check command line argument
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
