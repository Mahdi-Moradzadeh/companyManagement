const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connectionObject = {
    host: 'localhost',
    user: 'root',
    password: 'MyRootMM',
    database: 'company_db'
};

const db = mysql.createConnection(connectionObject, console.log(`Connected to the employee_db database.`));
   
function init(){
    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'Add an employee',
            'Remove an employee',
            'Update an employee role',
            'View all roles',
            'Add a role',
            'Remove a role',
            'View all departments', 
            'Add a department',
            'Remove a department',
            'Quit']
        }
        ])
    .then(answers => {
        console.log(answers.action);
        if (answers.action === 'Quit') {
            console.log('Goodbye!');
            process.exit();
        } 
        else {   
            if (answers.action === 'View all employees') {
                db.query('SELECT * FROM employee', (err, result) => {
                    console.log('Viewing all employees:');
                    console.table(result);
                    if (err) {
                        console.log(err);
                    }
                });
                init();
            } else if (answers.action === 'Add an employee') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'What is the employee\'s role id?'
                    },
                    {
                        type: 'input',  
                        name: 'manager_id',
                        message: 'What is the employee\'s manager id?'
                    }
                ])
                .then(answers => {
                    console.log(answers);
                    db.query('INSERT INTO employee SET ?', answers, (err, result) => {
                        db.query('SELECT * FROM employee', (err, result) => {
                            console.log('Updated employees:');
                            console.table(result);}
                        );
                    });
                    init();
                });
            } else if (answers.action === 'Remove an employee') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'What is the employee\'s id?'
                    }
                ])
                .then(answers => {
                    console.log(answers);
                    db.query('DELETE FROM employee WHERE id = ?', answers.id, (err, result) => {
                        db.query('SELECT * FROM employee', (err, result) => {
                            console.log('Updated employees:');
                            console.table(result);}
                        );
                    });
                    init();
                });
            } else if (answers.action === 'Update an employee role') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'What is the employee\'s id?'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'What is the employee\'s new role id?'
                    }
                ])
                .then(answers => {
                    console.log(answers);
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.id], (err, result) => {
                        db.query('SELECT * FROM employee', (err, result) => {
                            console.log('Updated employees:');
                            console.table(result);}
                        );
                    });
                    init();
                });
            } else if (answers.action === 'View all roles') {
                db.query('SELECT * FROM role', (err, result) => {
                    console.log('Viewing all roles:');
                    console.table(result);
                });
                init();
            } else if (answers.action === 'Add a role') {
                db.query('SELECT * FROM department', (err, result) => {
                    db.query('SELECT * FROM department', (err, result) => {
                        console.log('Departments:');
                        console.table(result);
                    });
                })
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the role\'s title?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the role\'s salary?'
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'What is the role\'s department id?'
                    }
                ]).then(answers => {
                    console.log(answers);
                    db.query('INSERT INTO role SET ?', answers, (err, result) => {
                        db.query('SELECT * FROM role', (err, result) => {
                            console.log('Updated roles:');
                            console.table(result);}
                        );
                    });
                    init();
                });
            } else if (answers.action === 'Remove a role') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'What is the role\'s id?'
                    }
                ])
                .then(answers => {
                    console.log(answers);
                    db.query('DELETE FROM role WHERE id = ?', answers.id, (err, result) => {
                        db.query('SELECT * FROM role', (err, result) => {
                            console.log('Updated roles:');
                            console.table(result);})
                    });
                    init();
                });
            } else if (answers.action === 'View all departments') {
                db.query('SELECT * FROM department', (err, result) => {
                    console.log('Viewing all departments:');
                    console.table(result);
                });
                init();
            } else if (answers.action === 'Add a department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the department\'s name?'
                    }
                ])
                .then(answers => {
                    console.log(answers);
                    db.query('INSERT INTO department SET ?', answers, (err, result) => {
                        db.query('SELECT * FROM department', (err, result) => {
                            console.log('Updated Departments:');
                            console.table(result);
                        }
                        );
                    });
                    init();
                });
            } else if (answers.action === 'Remove a department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'What is the department\'s id?'
                    }
                ])
                .then(answers => {
                    console.log(answers);
                    db.query('DELETE FROM department WHERE id = ?', answers.id, (err, result) => {
                        db.query('SELECT * FROM department', (err, result) => {
                            console.log('Updated Departments:');
                            console.table(result);
                        });
                    });
                    init();
                });
            }
        }
    })
    .catch(error => console.log(error));
}

init();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});