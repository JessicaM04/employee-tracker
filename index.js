const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

// Setting up database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_tracker"
  },
  console.log("Connected to the employee-tracker database.")
);
// Setting up inquirer
const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["View all departments", "Add a department", "View all roles", "Add a role", "View all employees", "Add an employee", "Update an employee role", "Quit"],
  }
]

inquirer
  .prompt(questions)
  .then((answers) => {
    switch(answers.options) {
      case "View all departments":
        getAllDepartments();
      break;
      case "Add a department":
      break;
      case "View all roles":
      break;
      case "Add a role":
      break;
      case "View all employees":
      break;
      case "Add an employee":
      break;
      case "Update an employee role":
      break;
      case "Quit":
      break;
    }
    console.log(answers);
  })
  .catch((error) => {
    console.log(error);
  });

  const getAllDepartments = (() => {
    // Retrieve all dept from table
    console.log("retrieving all departments from the table");
  }); 