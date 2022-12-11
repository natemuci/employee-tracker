const inquirer = require("inquirer");

function startPrompt(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
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
    ])
};
function addEmp(){
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the employee's first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "Please enter the employee's last name?",
            name: 'lastName'
        }
    ])
};
function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the role title",
            name: 'role'
        }
    ])
};
function addDep(){
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter the department name?",
            name: 'department'
        },
    ])
};