
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables.");
    }

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD must be configured."
      );
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("An admin account already exists.");
      console.log("No new admin account was created.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const user = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Admin email:", user.email);

  } catch (error) {

    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;

  } finally {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
      } catch (closeError) {
        console.error(
          "Failed to close MongoDB connection:",
          closeError.message
        );
        process.exitCode = 1;
      }
    }
  }

}

createAdmin();



// finally {
//   if (mongoose.connection.readyState !== 0) {
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed.");
//   }
// }



// require("dotenv").config();

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const User = require("./models/User");

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("MongoDB connected successfully!");

//     const hashedPassword = await bcrypt.hash(
//       process.env.ADMIN_PASSWORD,
//       10
//     );

//     const user = await User.create({
//       email: process.env.ADMIN_EMAIL,
//       password: hashedPassword,
//       role: "admin",
//     });

//     console.log("Admin user created successfully!");
//     console.log("Admin email:", user.email);

//     await mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error("Failed to create admin user:", error.message);
//   });