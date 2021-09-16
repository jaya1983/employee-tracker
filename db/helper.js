const { prompt } = require("inquirer");
const { exit } = require("process");
const connection = require("./connection");

class fetchEmployeeData {
  constructor(connection) {
    this.connection = connection;
  }
  viewDepartments() {
    return connection
      .promise()
      .query("SELECT * FROM department;")
      .then(([result]) => {
        console.table(result);
      });
  }

  viewRoles() {
    return connection
      .promise()
      .query("SELECT * FROM role;")
      .then(([result]) => {
        console.table(result);
      });
  }

  viewEmployees() {
    return connection
      .promise()
      .query("SELECT * from employee")
      .then(([result]) => {
        console.table(result);
      });
  }

  addEmployee(employee) {
    return connection
      .promise()
      .query("INSERT INTO employee SET ? ;", employee)
      .then(() => {});
  }

  addRole(Role) {
    return connection
      .promise()
      .query("INSERT INTO role SET ?;", Role)
      .then(() => {});
  }

  addDepartment(department) {
    return connection
    .promise()
    .query("INSERT INTO department SET ?;", department)
    .then(() => {});
  }
}
module.exports = new fetchEmployeeData(connection);
