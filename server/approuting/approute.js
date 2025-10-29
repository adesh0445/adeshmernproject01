const express = require("express");
const myapp = express.Router();

// ✅ Default routes
myapp.get('/', (req, res) => {
  res.send("this is express default response");
});

myapp.get('/about', (req, res) => {
  res.send(`About Page default <input/>`);
});

// ✅ App Menu List
const appmenu = require('../schemas/appmenu');
myapp.get('/applist', async (req, res) => {
  const appdata = await appmenu.find();
  res.send({ applist: appdata, status: 250, msg: "APP MENU LIST" });
});

// ✅ User Register
const User = require('../schemas/user');
myapp.post('/createUser', async (req, res) => {
  const { username, password, email, phone, gender } = req.body;

  if (username === "" || email === "" || password === "") {
    res.send({ status: 451, message: "Required All Field" });
  } else {
    const myfilds = await User.findOne({ "username": username });

    if (myfilds) {
      res.send({ status: 450, message: "Username Already Use", existingField: myfilds });
    } else {
      const postdata = await User({ username, email, password, phone, gender }).save();
      res.send({ status: 251, message: "Register Success", existingField: postdata });
    }
  }
});

// ✅ User Login
myapp.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.send({ status: 450, message: "Required All Field" });
  } else {
    const mydata = await User.findOne({ "username": username, "password": password });
    if (mydata) {
      res.send({ status: 250, message: "Login Successfull" });
    } else {
      res.send({ status: 451, message: "Wrong User And Password" });
    }
  }
});

// ✅ Employee Section
const Employees = require('../schemas/Employee');

// Get All Employees
myapp.get('/Employees', async (req, res) => {
  const AllEmployees = await Employees.find();
  res.send({ AllEmployees, status: 251 });
});

// Add Employee
myapp.post('/AddEmployee', async (req, res) => {
  const { fullName, email, phone, gender } = req.body;

  if (fullName === "" || phone === "") {
    res.send({ status: 450, message: "Full Name And Phone Required" });
  } else {
    const postData = await Employees({ fullName, email, phone, gender });
    postData.save();
    res.send({ status: 251, message: "Employee Added Successfully ✅" });
  }
});

// Update Employee
myapp.put('/updateworker/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, phone, email, gender } = req.body;

  try {
    const Data = { fullName, phone, email, gender };
    const updatedWorker = await Employees.findByIdAndUpdate(id, Data, { new: true });

    if (!updatedWorker) {
      return res.send({ status: 404, message: "Worker not found" });
    }

    res.send({ status: 250, message: "Worker updated successfully", data: updatedWorker });
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal server error" });
  }
});

// Delete Employee
myapp.delete('/Employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employees.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.send({ status: 404, message: "Employee not found ❌" });
    }
    res.send({ status: 250, message: "Employee deleted successfully ✅" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.send({ status: 500, message: "Internal server error" });
  }
});

module.exports = myapp;
