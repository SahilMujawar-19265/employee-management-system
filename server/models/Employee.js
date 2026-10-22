const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // department: {
    //   type: String,
    //   required: true,
    // },

    department: {
    type: String,
    required: true,
    enum: [
        "IT",
        "HR",
        "Finance",
        "Marketing",
        "Sales",
        "Operations",
        "Administration",
        "Customer Support",
        "QA / Testing",
        "Engineering",
    ],
},

    position: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;