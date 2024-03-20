// Get a reference to the #add-employees-btn element.
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data / Create array here to make accessible to other funcs.
var employeesArray = [];

//Control While Loop
let keepAdding = true;

// TODO: Get user input to create and return an array of employee objects.
const collectEmployees = function (event) {
  console.log(event);
  while (keepAdding) {
    //Prompt user in windows for the first name, last name, and salary.
    for (var i = 0; i < 3; i++) {
      let firstName = window.prompt("Enter a First Name.");
      let lastName = window.prompt("Enter a Last Name.");
      let salary = window.prompt("Enter a salary.");

      //continue?
      keepAdding = window.confirm("Would you like to continue?");

      //Create Object that contains employee data.
      var employee = {
        fName: firstName,
        lName: lastName,
        sal: salary,
      };

      //add employee data to array.
      employeesArray.push(employee);
    }
    //Where I call to add employees on screen
    if (!keepAdding) {
      return employeesArray;

      //Having this nested is incorrect and one of the reasons it would not run.
      trackEmployeeData();
    }
  }

  // Display the average salary
  const displayAverageSalary = function (employeesArray) {
    // TODO: Calculate and display the average salary

    var totalSalary = 0;
    for (let i = 0; i < employeesArray.length; i++) {
      totalSalary += employeesArray[1].sal;
    }

    var averageSalary = totalSalary / employeesArray.length;

    return `The average employee salary between our ${employeesArray.length} employee(s) is ${averageSalary}`;
  };

  // Select a random employee
  const getRandomEmployee = function (employeesArray) {
    // TODO: Select and display a random employee

    //create inital variable for index
    var arrayIndex = Math.floor(Math.random() * employeesArray.length);

    //create inital variable for employee chosen
    var chosenEmployee = employeesArray[arrayIndex];

    //return acceptance criteria string with variable
    return `Congraduations to ${chosenEmployee.fName} ${chosenEmployee.lName}, our random drawing winner!`;
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
      salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
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
};
