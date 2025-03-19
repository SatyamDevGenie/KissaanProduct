import dotenv from "dotenv";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import colors from "colors";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Delete existing users to avoid duplication
    await User.deleteMany();

    // Insert users into the database
    await User.insertMany(users);

    console.log("Data Imported Successfully!".green);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all users
    await User.deleteMany();

    console.log("Data Destroyed Successfully!".red);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`.red);
    process.exit(1);
  }
};

// Check command line argument
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
