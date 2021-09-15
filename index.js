const { prompt } = require("inquirer");
const { exit } = require("process");
const connection = require("./db/connection");

function init() {
  showPrompts();
}
init();

function showPrompts() {
  prompt([
    {
      // Load these prompts on NPM start
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },

        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // Call the functions from what the user selects
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        viewAllDepartments();
        break;
      case "VIEW_ROLES":
        viewAllRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewAllEmployees();
        break;
      case "ADD_DEPARTMENT":
        createDepartment();
        break;
      case "ADD_ROLE":
        createRole();
        break;
      case "ADD_EMPLOYEE":
        createEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

function viewAllDepartments() {
  return connection
    .promise()
    .query("SELECT * FROM department;")
    .then(([result]) => {
      console.log("\n");
      console.table(result);
    })
    .then(() => showPrompts());
}

function viewAllRoles() {
  return connection
    .promise()
    .query("SELECT * FROM role;")
    .then(([result]) => {
      console.log("\n");
      console.table(result);
    })
    .then(() => showPrompts());
}

function viewAllEmployees() {
  return connection
    .promise()
    .query("select * from employee")
    .then(([result]) => {
      console.log("\n");
      console.table(result);
    })
    .then(() => showPrompts());
}

function createDepartment() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "what is the name of the department you would like to add? ",
    },
  ]).then((response) => {
    return connection
      .promise()
      .query("INSERT INTO department SET ?;", response)
      .then(() => {
        console.log(
          `Department with name`,
          response.name,
          `added to the database `
        );
      })
      .then(() => showPrompts());
  });
}

/* create a new Employee */
function createEmployee() {

    prompt([
    {
      type: "input",
      name: "first_name",
      message: "what is the first name of the employee? ",
    },
    {
      type: "input",
      name: "last_name",
      message: "what is the last name of the employee? ",
    },
    {
      type: "input",
      name: "role_id",
      message: "what role id will this employee work for? ",
    },
    {
      type: "input",
      name: "manager_id",
      message: "who is the manager for this employee? ",
     
    },
  ]).then((response) => {
    return connection
      .promise()
      .query("INSERT INTO employee SET ?;", response)
      .then(() => {
        console.log(
          `Employee with name "`,
          response.first_name, response.last_name,
          `" added to the database `
        );
      })
      .then(() => showPrompts());
  });
}

/* create a new Role */
function createRole() {
  prompt([
    {
      type: "input",
      name: "title",
      message: "what is the title of the role you would like to add? ",
    },
    {
      type: "input",
      name: "salary",
      message: "what is the expected salary for this role? ",
    },
    {
      type: "input",
      name: "department_id",
      message: "what department id will this role come under? ",
    },
  ]).then((response) => {
    return connection
      .promise()
      .query("INSERT INTO role SET ?;", response)
      .then(() => {
        console.log(
          `Role with name "`,
          response.title,
          `" added to the database `
        );
      })
      .then(() => showPrompts());
  });
}

function quit() {
  exit();
}
