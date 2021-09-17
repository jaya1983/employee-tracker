// const { prompt } = require("inquirer");
// const { exit } = require("process");
const connection = require("./connection");

class fetchEmployeeData {
  constructor(connection) {
    this.connection = connection;
  }
  viewDepartments() {
    return connection.promise().query("SELECT * FROM department;");
  }

  viewRoles() {
    return connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      ) 
  }

  viewEmployees() {
    return connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }
  // Show all managers
  allManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }
  addEmployee(employee) {
    return connection.promise().query("INSERT INTO employee SET ? ;", employee);
  }

  addRole(Role) {
    return connection.promise().query("INSERT INTO role SET ?;", Role);
  }

  addDepartment(department) {
    return connection
      .promise()
      .query("INSERT INTO department SET ?;", department)
      .then(() => {})
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }
}
module.exports = new fetchEmployeeData(connection);
