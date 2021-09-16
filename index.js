const { prompt } = require("inquirer");
const { exit } = require("process");
const connection = require("./db/connection");
// const { addEmployee } = require("./db/helper");
const helper = require("./db/helper");

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
  helper.viewDepartments().then(() => {
    showPrompts();
  });
}

function viewAllRoles() {
  helper.viewRoles().then(() => {
    showPrompts();
  });
}

function viewAllEmployees() {
  helper.viewEmployees().then(() => {
    showPrompts();
  });
}

function createDepartment() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "what is the name of the department you would like to add? ",
    },
  ]).then((response) => {
    console.log("department name", response);
    let department = response;
    helper.addDepartment(department).then((result) => {
      showPrompts();
    });
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
  ]).then((response) => {
    let firstName = response.first_name;
    let lastName = response.last_name;
    helper.viewRoles().then((result) => {
      prompt({
        type: "input",
        name: "role_id",
        message: "what role will this employee work for? ",
        choices: result,
      }).then((role) => {
        helper.viewEmployees().then((result) => {
          prompt({
            type: "input",
            name: "manager_id",
            message: "what manager will this employee work for? ",
            choices: result,
          }).then((res) => {
            let newEmployee = {
              first_name: firstName,
              last_name: lastName,
              role_id: role.role_id,
              manager_id: res.manager_id,
            };
            helper.addEmployee(newEmployee).then((result) => {
              console.log(`Added " ${firstName} ${lastName} " to the database`);
              showPrompts();
            });
          });
        });
      });
    });
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
    let newRole = {
      title: response.title,
      salary: response.salary,
      department_id: response.department_id,
    };
    helper.addRole(newRole).then(() => {
      console.log(`Added " ${newRole.title}  " to the database`);
      showPrompts();
    });
  });
}

function updateEmployeeRole() {
    
}

function quit() {
  exit();
}
