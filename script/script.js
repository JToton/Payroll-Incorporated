// Get a reference to the #add-employees-btn element.
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data / Create array here to make accessible to other funcs.
var employeesArray = [];

// Control While Loop
let keepAdding = true;

// Data Collection Function:
const collectEmployees = function (event) {
  console.log(event);

  while (keepAdding) {
    // Prompt user in windows for the first name, last name, and salary.
    for (var i = 0; i < 3; i++) {

      let firstName, lastName, salary;

      // add data validation to avoid errors
      // nested while loop to keep asking until true
      while(true){
        firstName = window.prompt("Enter a First Name.");
        lastName = window.prompt("Enter a Last Name.");
        salary = window.prompt("Enter a salary.");

        // check if string
        if(typeof firstName === `string` && typeof lastName === `string` && !isNaN(parseFloat(salary))){
          
          // Capitalize the first letter of first name and last name
          // before adding to array
          firstName = capitalizeFirstLetter(firstName);
          lastName = capitalizeFirstLetter(lastName);

          // Convert to number input is a string not a number
          salary = parseFloat(salary);
          break; // Exit the loop if input is valid
        } else {
          // Re-ask prompt with proper error message
          alert("First and last names should be letters, and salary should be a number.");
        }
        }
      }

      // continue? While loop exit.
      keepAdding = window.confirm("Would you like to continue?");

      // check for loop exit
      if (!keepAdding) {
        // Sort employeesArray by last name
        // Compare two array objects one at at time by last names ( letter => next letter)
        // Information Sourced from https://w3schools.com/
        employeesArray.sort((a, b) => a.lastName.localeCompare(b.lastName));
        return employeesArray;
      }

      // Create Object that contains employee data.
      var employee = {
        firstName: firstName,
        lastName: lastName,
        sal: salary,
      };

      // add employee data to array.
      employeesArray.push(employee);
    }
  }
};

// Function to capitalize the first letter in both firstName & lastName
// Cap character zero (first) , then slice to retain the rest and add together.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Average Salary Function:
const displayAverageSalary = function (employeesArray) {
  // Create var / loop / iterate array
  // Convert salary to integer
  var totalSalary = 0;
  for (let i = 0; i < employeesArray.length; i++) {
    totalSalary += parseInt(employeesArray[i].sal);
  }

  // Average Calculation
  var averageSalary = totalSalary / employeesArray.length;

  console.log(
    `The average employee salary between our ${employeesArray.length} employee(s) is ${averageSalary}`
  );
};

// Random Employee Selection Function:
const getRandomEmployee = function (employeesArray) {
  // create index variable randomly
  var arrayIndex = Math.floor(Math.random() * employeesArray.length);

  // create variable for employee chosen
  var chosenEmployee = employeesArray[arrayIndex];

  // return acceptance criteria string with variable
  console.log(
    `Congratulations to ${chosenEmployee.firstName} ${chosenEmployee.lastName}, our random drawing winner!`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.sal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener(`click`, trackEmployeeData);
