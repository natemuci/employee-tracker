require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
);

const startOptions =
    
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View employees',
                'Add employee',
                'View departments',
                'Add department',
                'View roles',
                'Add role',
                'Update role',
                'Quit'
            ]
        }
function mainMenu(){
    inquirer.prompt(startOptions).then((res) => {
        switch(res.choice) {
            case 'View employees':
                viewEmp();
                break;
            case 'Add employee':
                addEmp();
                break;
            case 'View departments':
                viewDep();
                break;
            case 'Add department':
                addDep();
                break;
            case 'View roles':
                viewRole();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update role':
                updateRole();
                break;
        }
    })
}        

function viewEmp(){
    db.query(
        `
        SELECT
        employee.id AS "Employee",
        employee.first_name AS "First Name",
        employee.last_name AS "Last Name",
        roles.title AS "Job Title",
        department.department_name AS "Department Name",
        roles.salary AS "Salary",
        employee.manager_id AS "Manager"
        FROM employee
        LEFT JOIN roles
            ON roles.id = employee.role_id
        LEFT JOIN department
            ON department.id = roles.department_id
        `,
            function (err, results){
                console.table(results);
                mainMenu();
            }
    )
};
function addEmp(){
    db.query(`SELECT * FROM roles`, function (err, results){
        db.query(`SELECT * FROM employees`, function (err, empResults){
            let roleList = results.map((roles) => {
                return {name: roles.title, value: roles.id};
            });
        inquirer.prompt([
            {
                type: 'input',
                message: "Please enter the employee's first name?",
                name: 'newFirstName'
            },
            {
                type: 'input',
                message: "Please enter the employee's last name?",
                name: 'newLastName'
            },
            {
                type: 'list',
                name: 'newEmpRole',
                message: 'What is their role?',
                choices: roleList,
            },
        ])
        .then((responses) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id)
            VALUES ('${responses.newFirstName}','${responses.newLastName}', '${responses.newEmpRole}')`);
            mainMenu();
        })
    })
    })};
    
function viewRole(){
    db.query(
        `
        SELECT
        roles.title AS "Job Title",
        roles.id AS "Role ID",
        department.department_name AS "Department Name",
        roles.salary AS "Salary"
        FROM roles
        LEFT JOIN department
            ON roles.department_id = department.id
        `,
            function (err, results){
                console.table(results);
                mainMenu();
            }
    )
};
function addRole(){
    db.query(`SELECT * FROM department`, function (err, results) {
        let departmentList = results.map((departments) => {
          return { name: departments.name, value: departments.id };
        });
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the role title",
            name: 'addNewRole'
        },
        {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'addNewSalary'
        },
        {
            type: 'list',
            name:'addRollDep',
            message: 'What department does this role belong in?',
            choices: departmentList
        }
    ])
    .then((responses) => {
        db.query(`INSERT INTO roles (title, salary, department_id)
        VALUES ('${responses.addNewRole}', '${responses.addNewSalary}', '${responses.addRollDep}')`);
        mainMenu();
      });
    })
};
function viewDep(){
    db.query(
        `
        SELECT 
        department.id AS "ID",
        department.department_name AS "Department Name"
         FROM department
        `,
            function (err, results){
                console.table(results);
                mainMenu();
            }
    )
};
function addDep(){
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the department name?",
            name: 'newDepartmentName'
        },
    ])
    .then((depChoice) =>{
        db.query(`INSERT INTO department (department_name)
        VALUES ('${depChoice.newDepartmentName}')`);
        mainMenu();
    })
};

mainMenu();
