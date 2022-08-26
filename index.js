const inquirer = require("inquirer");

// Setting up inquirer
 const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["View all departments", "Add a department", "View all roles", "Add a role", "View all employees", "Add an employee", "Update an employee role", "Quit"],
  }
]

const promptQuestions = (questions) => {
  inquirer
  .prompt(questions)
  .then((answers) => {
    if(answers === "Quit") {
      prompt.complete();
    }
    userAnswerAction(answers);
    // Handles user action (.then call prompt(questions))
  })
  .catch((error) => {
    console.log(error);
  });
}

const userAnswerAction = (answers) => {
  switch(answers.options) {
    case "View all departments":
      getAllDepartments();
      // promptQuestions(questions);
    break;
    case "Add a department":
      addDepartment();
    break;
    case "View all roles":
      getAllRoles();
    break;
    case "Add a role":
      addRole();
    break;
    case "View all employees":
      getAllEmployees();
    break;
    case "Add an employee":
      addEmployee();
    break;
    case "Update an employee role":
    break;
    case "Quit":
    break;
  }
}

const getAllDepartments = (() => {
  // Retrieve all departments from table
  const mysql = require("mysql2");

  // Setting up database
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker"
    },
  );
  db.query(
    'SELECT * FROM department', 
    function(err, results, fields) {
      console.table(results);
      promptQuestions(questions);
  });
});

const getAllRoles = (() => {
  // Retrieve all roles from table
  const mysql = require("mysql2");

  // Setting up database
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker"
    },
  );
  db.query(
    'SELECT * FROM role', 
    function(err, results, fields) {
      console.table(results);
  });
  promptQuestions(questions);
});

const addRole = (() => {
  const mysql = require("mysql2");
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker"
    },
  );
  inquirer
  .prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is the new role you would like to add?",
  }])
  .then((answers) => {
    console.log(answers);
    db.query(
      "INSERT INTO role (name) VALUES(?)",
      [answers.newRole],
      (err, result, fields) => {
        console.log(answers);
      }
    );
  });
  promptQuestions();
})

const getAllEmployees = (() => {
  // Retrieve all employees from table
  const mysql = require("mysql2");

  // Setting up database
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker"
    },
  );
  db.query(
    'SELECT * FROM employee', 
    function(err, results, fields) {
      console.table(results);
  });

  promptQuestions(questions);
});

const addEmployee = (() => {
  const mysql = require("mysql2");
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker"
    },
  );
  inquirer
  .prompt([
    {
    type: "input",
    name: "newEmployee",
    message: "What is the name of the employee you would like to add?",
  }])
  .then((answers) => {
    console.log(answers);
    db.query(
      "INSERT INTO employee (first_name, last_name) VALUES(?)",
      [answers.newEmployee],
      (err, result, fields) => {
        console.log(answers);
      }
    );
  });
  promptQuestions();
})

const addDepartment = (() => {
  const mysql = require("mysql2");
  let departmentCount = 0;

  // Setting up database
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker"
    },
  );
  db.query(
    'SELECT * FROM department', 
    function(err, results, fields) {
      if (err) throw err;
      departmentCount = results.length;
      console.table(results);
  });
  inquirer
  .prompt([
    {
    type: "input",
    name: "newDepartment",
    message: "What is the name of the department you would like to add?",
  }])
  .then((answers) => {
    console.log(answers);
    const departmentName = answers.newDepartment;
    db.query(
      "INSERT INTO department (id, name) VALUES(?,?)",
      [departmentCount + 1, departmentName],
      function (err) {
        if (err) throw (err);
        promptQuestions(questions);
        console.log(answers);
      }
    );
  });
})


promptQuestions(questions);
