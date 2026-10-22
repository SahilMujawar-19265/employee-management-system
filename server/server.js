require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require("./models/Employee");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.get("/api/test", (req, res) => {
  res.json({
    message: "Employee Management API is working!",
  });
});

// app.post("/api/employees", async (req, res) => {
app.post("/api/employees", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      message: "Employee created successfully!",
      employee: employee,
    });
    
    // } catch (error) {
    //   res.status(500).json({
    //     message: "Failed to create employee",
    //     error: error.message,
    //   });
    // }

    // } catch (error) {
    //   if (error.code === 11000) {
    //     return res.status(400).json({
    //       message: "Email already exists. Please use a different email.",
    //     });
    //   }

    //   res.status(500).json({
    //     message: "Failed to create employee",
    //     error: error.message,
    //   });
    // }


  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid employee data. Please check the provided fields.",
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    console.error("Failed to create employee:", error.message);

    res.status(500).json({
      message: "Failed to create employee",
    });
  }

    // res.status(500).json({
    //   message: "Failed to create employee",
    //   error: error.message,
    // });

});

// app.get("/api/employees", async (req, res) => {
app.get("/api/employees", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    // const employees = [];

    res.json({
      employees: employees,
    });

    // } catch (error) {
    //   res.status(500).json({
    //     message: "Failed to fetch employees",
    //     error: error.message,
    //   });
    // }

  } catch (error) {
    console.error("Failed to fetch employees:", error.message);

    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }

});

// app.put("/api/employees/:id", async (req, res) => {
app.put("/api/employees/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      // { new: true, runValidators: true }

      { returnDocument: "after", runValidators: true }

    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee updated successfully!",
      employee: employee,
    });

    // } catch (error) {
    //   res.status(500).json({
    //     message: "Failed to update employee",
    //     error: error.message,
    //   });
    // }


  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid employee ID format.",
      });
    }

    if (error.name === "ValidationError") {
      console.error("Employee update validation failed:", error.message);

      return res.status(400).json({
        message: "Invalid employee data. Please check the provided fields.",
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    console.error("Failed to update employee:", error.message);

    res.status(500).json({
      message: "Failed to update employee",
    });

  }
  // res.status(500).json({
  //   message: "Failed to update employee",
  //   error: error.message,
  // });

});

// app.delete("/api/employees/:id", async (req, res) => {
app.delete("/api/employees/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully!",
      employee: employee,
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid employee ID format.",
      });
    }

    console.error("Failed to delete employee:", error.message);

    res.status(500).json({
      message: "Failed to delete employee",
    });
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});