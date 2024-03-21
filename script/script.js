// Get a reference to the #add-employees-btn element.
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data / Create array here to make accessible to other funcs.
var employeesArray = [];

// Control While Loop
let keepAdding = true;

// Collect Employees Function-
const collectEmployees = function (event) {
  console.log(event);

  while (true) {
    let firstName = window.prompt("Enter a First Name.");
    let lastName = window.prompt("Enter a Last Name.");
    let salary;

    // Loop until valid salary input.
    while (true) {
      salary = window.prompt("Enter a salary.");

      // Check if salary is a number or can be converted to a number.
      // Convert salary to a number.
      if (!isNaN(parseFloat(salary))) {
        salary = parseFloat(salary);
        break;
      } else {
        // Make zero
        salary = 0;
        break;
      }
    }

    // Capitalize the first letter of first name and last name.
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);

    // Create Object that contains employee data.
    var employee = {
      firstName: firstName,
      lastName: lastName,
      sal: salary,
    };

    // Add employee data to array.
    employeesArray.push(employee);

    // Prompt to continue
    keepAdding = window.confirm("Would you like to add another employee?");

    // If user does not want to continue, break the loop
    if (!keepAdding) {
      break;
    }
  }

  // Sort employeesArray by last name.
  employeesArray.sort((a, b) => a.lastName.localeCompare(b.lastName));

  return employeesArray;
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

  // Average Calculation rounded to 2 decimals
  var averageSalary = (totalSalary / employeesArray.length).toFixed(2);

  //USD Conversion
  averageSalary =
    "$" + averageSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
