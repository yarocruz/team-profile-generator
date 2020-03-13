const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require('chalk');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,

// Initial inquirer prompt to determine employee type

let employeeArr = [];

const initialQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What type of employee?',
            name: 'employeeType',
            choices: [Manager, Engineer, Intern]
        },
    ])
        .then(answer => {

            if (answer.employeeType === 'Manager') {
                managerQuestions();
            } else if
                (answer.employeeType === 'Engineer') {
                engineerQuestions();
            } else if
                (answer.employeeType === 'Intern') {
                internQuestions();
            }
            else {
                console.log('Done!');
                return;
            }
        })
}

initialQuestion();

const internQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the interns name?',
            name: 'internName'
        },
        {
            type: 'input',
            message: 'What is the interns employee id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the interns email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the interns school?',
            name: 'school',
        },
        {
            type: 'confirm',
            message: 'Do you need to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
            employeeArr.push(intern);

            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('The file has been saved!'));
                });
            }
        })
}

const engineerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the engineers name?',
            name: 'engineerName'
        },
        {
            type: 'input',
            message: 'What is engineers employee id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the engineers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the engineers github username?',
            name: 'github',
        },
        {
            type: 'confirm',
            message: 'Do you need to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            employeeArr.push(engineer);

            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('The file has been saved!'));
                });
            }
        })
}

const managerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the managers name?',
            name: 'managerName'
        },
        {
            type: 'input',
            message: 'What is the managers id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the managers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the managers office number?',
            name: 'officeNumber',
        },
        {
            type: 'confirm',
            message: 'Do you need to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {

            // and to create objects for each team member (using the correct classes as blueprints!)
            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            employeeArr.push(manager);

            // After the user has input all employees desired, call the `render` function (required
            // above) and pass in an array containing all employee objects; the `render` function will
            // generate and return a block of HTML including templated divs for each employee!

            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('The file has been saved!'));
                });
            }

            // After you have your html, you're now ready to create an HTML file using the HTML
            // returned from the `render` function. Now write it to a file named `team.html` in the
            // `output` folder. You can use the variable `outputPath` above target this location.

        })
}

// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```