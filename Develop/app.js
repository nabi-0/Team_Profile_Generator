const Employee = require("./lib/Employee.js")
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { AsyncResource } = require("async_hooks");
const { promisify } = require("util");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


let employees = [];

init();


function init()
{
  // Explain the purpose of the program here.. 

  AddEmployees();
}

function AddEmployees() {
  inquirer.prompt(
    [
        {
          type: "confirm",
          message: "Add new employee?",
          name: "confirmAddNewEmployee"
        }
    ])
    .then(function(answers) {
      if (answers.confirmAddNewEmployee === true) {
        promptUserAndAddEmployee();
      } else {
        const htmlRender = render(employees)
        fs.writeFile("./output/team.html", htmlRender, "utf8", (error) => {
          if (error) 
          {
            console.log(error);
          }
          console.log("Team has been successfully created and is located in the output folder of this application.")
        });
      }
    });  
}

  function promptUserAndAddEmployee() {
   inquirer.prompt(
      [
         {
            type: "list",
            message: "Select your Role:",
            choices:
             [
                "Engineer",
                "Intern",
                "Manager" 
              ],
            name: "role"
          },
          {
            type: "input",
            message: "Enter your name:",
            name: "username"
          },
          {
            type: "input",
            message: "Enter your ID number:",
            name: "employeeID"
          }, 
          {
            type: "input",
            message: "Enter your email:",
            name: "email"
          }
      ]
    )
  .then(function(answers) {
    if (answers.role === "Engineer") {
      inquirer.prompt(
        [ 
          {
            type: "input",
            message: "Enter GitHub username:",
            name: "github"
          }
        ])
          .then(function (answer) 
            {
              addEmployeeToArrayAndContinue(new Engineer(answers.username, answers.employeeID, answers.email, answer.github));
            });
    }

    if (answers.role === "Intern") {
      inquirer.prompt([ {
        type: "input",
        message: "Enter School name:",
        name: "schoolName"
      }])
      .then(function (answer) 
      {
        addEmployeeToArrayAndContinue(new Intern(answers.username, answers.employeeID, answers.email, answer.schoolName));
      });
    }

    if (answers.role === "Manager") {
      inquirer.prompt([ {
        type: "input",
        message: "Enter Office Number:",
        name: "officeNumber"
      }])
      .then(function (answer) 
      {
        addEmployeeToArrayAndContinue(new Manager(answers.username, answers.employeeID, answers.email, answer.officeNumber));
      });
    }
  });
}

function addEmployeeToArrayAndContinue(newEmployee) {
  if (newEmployee !== null)
  {
    employees.push(newEmployee);
  }
  AddEmployees();
}


  // inqPromise = questions();
  // inqPromise.then(data => {
  //   let name = data.name;
  //   let email = data.email;
  //   let id = data.number;
  // }).catch(error => {
  //   console.log("error");
  // })

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
