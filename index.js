

function createTable() {
    // Get user input elements
    const dateInput = document.getElementById("dateInput");
    const amountInput = document.getElementById("amountInput");
    const categoryInput = document.getElementById("categoryInput");
    const taxRateInput = document.getElementById("taxRateInput");
    const pictureInput = document.getElementById("pictureInput");
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

    // Get the uploaded picture filename
    const pictureCell = document.createElement("td");
    const selectedFile = pictureInput.files[0];
    

    if (selectedFile) {
      const image = document.createElement('img');
      image.src = selectedFile.name;
      pictureCell.appendChild(image); // Add picture to cell
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      pictureCell.appendChild(input); // Add an upload section if user didn't upload a picture initially
    }
  
    // Append cells to the row
    newRow.appendChild(dateCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(taxRateCell);
    newRow.appendChild(taxableAmountCell);
    newRow.appendChild(pictureCell);
  
    // Append the row to the table body
    tableBody.appendChild(newRow);



    database.ref("tableRows").push({
      date: dateInput.value,
      amount: amountInput.value,
      category: categoryInput.value,
      taxRate: taxRateInput.value,
      taxableAmount: taxableAmount.toFixed(2)
  })
  .then(() => {
      console.log("Data successfully saved to Firebase.");
  })
  .catch((error) => {
      console.error("Error saving data to Firebase: ", error);
  });

  
    // Clear user input fields (except picture)
    dateInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
    taxRateInput.value = "";
  }


  function populateTableFromFirebase() {
    const database = firebase.database();
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    database.ref("tableRows").once("value")
    .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const rowData = childSnapshot.val();
            const newRow = document.createElement("tr");
            const dateCell = document.createElement("td");
            dateCell.textContent = rowData.date;
            const amountCell = document.createElement("td");
            amountCell.textContent = rowData.amount;
            const categoryCell = document.createElement("td");
            categoryCell.textContent = rowData.category;
            const taxRateCell = document.createElement("td");
            taxRateCell.textContent = rowData.taxRate + "%";
            const taxableAmountCell = document.createElement("td");
            taxableAmountCell.textContent = rowData.taxableAmount;
            newRow.appendChild(dateCell);
            newRow.appendChild(amountCell);
            newRow.appendChild(categoryCell);
            newRow.appendChild(taxRateCell);
            newRow.appendChild(taxableAmountCell);
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        console.error("Error fetching data from Firebase: ", error);
    });
}

window.addEventListener("load", populateTableFromFirebase);