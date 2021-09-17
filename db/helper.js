const connection = require("./connection");

class fetchEmployeeData {
  constructor(connection) {
    this.connection = connection;
  }
  // View All Departments
  viewDepartments() {
    return connection.promise().query("SELECT * FROM department;");
  }
  // View All Roles
  viewRoles() {
    return connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }
  //View All Employees
  viewEmployees() {
    return connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }
  //View All Managers
  allManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  //Add an employee to the database
  addEmployee(employee) {
    return connection.promise().query("INSERT INTO employee SET ? ;", employee);
  }

  //Add a role to the data base
  addRole(Role) {
    return connection.promise().query("INSERT INTO role SET ?;", Role);
  }

  //Add a department to the database
  addDepartment(department) {
    return connection
      .promise()
      .query("INSERT INTO department SET ?;", department)
      .then(() => {});
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
