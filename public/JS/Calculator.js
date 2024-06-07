function createTable() {
    // Get user input elements
    const dateInput = document.getElementById("dateInput");
    const amountInput = document.getElementById("amountInput");
    const categoryInput = document.getElementById("categoryInput");
    const taxRateInput = document.getElementById("taxRateInput");
    const tableBody = document.getElementById("tableBody");
  
    // Check if any input is empty
    if (
      !dateInput.value ||
      !amountInput.value ||
      !categoryInput.value ||
      !taxRateInput.value
    ) {
      alert("Please fill in all fields!");
      return;
    }
  
    // Create a new table row
    const newRow = document.createElement("tr");
  
    // Create table cells for each column
    const dateCell = document.createElement("td");
    dateCell.textContent = dateInput.value;
    const amountCell = document.createElement("td");
    amountCell.textContent = amountInput.value;
    const categoryCell = document.createElement("td");
    categoryCell.textContent = categoryInput.value;
    const taxRateCell = document.createElement("td");
    taxRateCell.textContent = taxRateInput.value + "%"; // Add "%" symbol
  
    // Calculate taxable amount
    const taxableAmount = parseFloat(amountInput.value) / (1 + parseFloat(taxRateInput.value) / 100);
    const taxableAmountCell = document.createElement("td");
    taxableAmountCell.textContent = taxableAmount.toFixed(2); // Format to 2 decimal places
  
    // Append cells to the row
    newRow.appendChild(dateCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(taxRateCell);
    newRow.appendChild(taxableAmountCell);
  
    // Append the row to the table body
    tableBody.appendChild(newRow);
  
    // Clear user input fields
    dateInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
    taxRateInput.value = "";
  }