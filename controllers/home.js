const router = require('express').Router();
const mysql = require("mysql");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root',
        database: 'company_db'
    },
    console.log(`Connection to the company_db database is successful!`)
);

import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your name?"
    }
];

inquirer.prompt(questions)
    .then(answers => {
        console.log(`Hi ${answers['name']}!`);
    }).catch(err => {
        console.log(err);
    });

module.exports = router;