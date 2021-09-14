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
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },

        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
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
    }).then(() => showPrompts());    
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
    .query("SELECT * FROM employee;")
    .then(([result]) => {
      console.log("\n");
      console.table(result);
    })
    .then(() => showPrompts());
  }
function quit() {
    exit();
}
