const filterButton = document.getElementById('salaryFilter');

filterButton.addEventListener('click', function () {
    const minSalaryInput = document.getElementById('minSalary').value;
    const maxSalaryInput = document.getElementById('maxSalary').value;

    // Check if input values are valid numbers
    const minSalary = parseFloat(minSalaryInput);
    const maxSalary = parseFloat(maxSalaryInput);

    // Check if the parsed values are valid numbers
    if (!isNaN(minSalary) && !isNaN(maxSalary)) {
        // Get all result boxes
        const resultBoxes = document.querySelectorAll('.result-box');

        // Loop through each result box
        resultBoxes.forEach(function (box) {
            // Parse the salary from the box's content
            const salaryElement = box.querySelector('.refined-value');
            if (salaryElement) {
                const salary = parseFloat(salaryElement.textContent);

                // Check if salary is within the specified range
                if ((!minSalary || salary >= minSalary) && (!maxSalary || salary <= maxSalary)) {
                    // Show the box if it matches the criteria
                    box.style.display = 'block';
                } else {
                    // Hide the box if it doesn't match
                    box.style.display = 'none';
                }
            }
        });
    } else {
        // Handle invalid input values, e.g., display an error message
        console.log("Invalid input. Please enter valid numbers for min and max salary.");
    }
});
