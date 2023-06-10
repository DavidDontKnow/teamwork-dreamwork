const inquire = require('inquirer');
const fs = require('fs');
const generateTeam = require('./src/generateTeam');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const newTeamMemberInfo = [];

const questions = async () => {
    const answers = await inquire.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the team member?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the team member?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the team member?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the team member?',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
    ])

    if (answers.role === 'Manager') {
        const manager = await inquire.prompt([
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the office number of the manager?',
            },
        ])
        const newManager = new Manager(answers.name, answers.id, answers.email, manager.officeNumber);
        newTeamMemberInfo.push(newManager);
    }
    else if (answers.role === 'Engineer') {
        const engineer = await inquire.prompt([
            {
                type: 'input',
                name: 'github',
                message: 'What is the github username of the engineer?',
            },
        ])
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, engineer.github);
        newTeamMemberInfo.push(newEngineer);
    }
    else if (answers.role === 'Intern') {
        const intern = await inquire.prompt([
            {
                type: 'input',
                name: 'school',
                message: 'What is the school of the intern?',
            },
        ])
        const newIntern = new Intern(answers.name, answers.id, answers.email, intern.school);
        newTeamMemberInfo.push(newIntern);
    }
};

async function init() {
    await questions();
    const addNewMember = await inquire.prompt([
        {
            type: 'confirm',
            name: 'addNewMember',
            message: 'Would you like to add a new team member?',
        },
    ])
    if (addNewMember.addNewMember) {
        init();
    }
    else {
        const html = generateTeam(newTeamMemberInfo);
        fs.writeFile('./dist/index.html', html, (err) =>
            err ? console.log(err) : console.log('Successfully created index.html!')
        );
    }
}

init();

