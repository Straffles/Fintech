 // Your web app's Firebase configuration
         const firebaseConfig = {
                apiKey: "AIzaSyD8RLQ5hS3r7809eJQIhaCTQP2slDvNJh4",
                authDomain: "fintech-f6a7d.firebaseapp.com",
                projectId: "fintech-f6a7d",
                storageBucket: "fintech-f6a7d.appspot.com",
                messagingSenderId: "703004071046",
                appId: "1:703004071046:web:148a4d2cb17edc23bf2d07"
            };
    
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            const database = firebase.database();
            let ref = Database.database("https://fintech-f6a7d-default-rtdb.firebaseio.com/")
    
            const taxRates = {
                'Category 1': 5,
                'Category 2': 20,
                'Category 3': 8
            };
    
            document.addEventListener('DOMContentLoaded', loadTable);
    
            function addRow() {
                // Get form elements
                const dateElem = document.getElementById('dateInput');
                const amountElem = document.getElementById('amount');
                const categoryElem = document.getElementById('category');
                const pictureInput = document.getElementById('pictureInput');
    
                // Validate form
                if (!dateElem.value) {
                    alert('Please enter a valid date.');
                    return;
                }
                if (!amountElem.value || parseFloat(amountElem.value) <= 0) {
                    alert('Please enter a valid amount greater than 0.');
                    return;
                }
                if (!categoryElem.value) {
                    alert('Please select a category.');
                    return;
                }
    
                // Get form values
                const date = dateElem.value;
                const amount = parseFloat(amountElem.value);
                const category = categoryElem.value;
                const taxRate = taxRates[category];
    
                // Calculate taxable amount
                const taxableAmount = (amount * (taxRate / 100)).toFixed(2);
    
                // Create a new row
                const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
                const newRow = table.insertRow();
    
                // Insert cells and add values
                newRow.insertCell(0).innerText = date;
                newRow.insertCell(1).innerText = amount.toFixed(2);
                newRow.insertCell(2).innerText = category;
                newRow.insertCell(3).innerText = taxRate.toFixed(2);
                newRow.insertCell(4).innerText = taxableAmount;
    
                // Handle picture input
                const pictureCell = newRow.insertCell(5);
                const selectedFile = pictureInput.files[0];
                if (selectedFile) {
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(selectedFile);
                    image.style.maxWidth = "100px"; // Set a maximum width for the image
                    pictureCell.appendChild(image);
                } else {
                    const uploadInput = document.createElement('input');
                    uploadInput.type = 'file';
                    uploadInput.accept = 'image/*';
                    uploadInput.onchange = function () {
                        const file = this.files[0];
                        const image = document.createElement('img');
                        image.src = URL.createObjectURL(file);
                        image.style.maxWidth = "100px";
                        pictureCell.innerHTML = '';
                        pictureCell.appendChild(image);
                        saveTable(); // Save table after image upload
                    };
                    pictureCell.appendChild(uploadInput);
                }
    
                // Save the updated table to Firebase
                saveTable();
    
                // Clear the form inputs
                document.getElementById('inputForm').reset();
            }
    
            function saveTable() {
                const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
                const rows = Array.from(table.rows);
                const data = rows.map(row => {
                    const imageCell = row.cells[5].getElementsByTagName('img')[0];
                    return {
                        date: row.cells[0].innerText,
                        amount: row.cells[1].innerText,
                        category: row.cells[2].innerText,
                        taxRate: row.cells[3].innerText,
                        taxableAmount: row.cells[4].innerText,
                        picture: imageCell ? imageCell.src : null // Save the image URL
                    };
                });
                database.ref('tableData').set(data);
            }
    
            function loadTable() {
                database.ref('tableData').once('value', snapshot => {
                    const data = snapshot.val() || [];
                    const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
                    table.innerHTML = ''; // Clear the table before adding rows
                    data.forEach(item => {
                        const newRow = table.insertRow();
                        newRow.insertCell(0).innerText = item.date;
                        newRow.insertCell(1).innerText = item.amount;
                        newRow.insertCell(2).innerText = item.category;
                        newRow.insertCell(3).innerText = item.taxRate;
                        newRow.insertCell(4).innerText = item.taxableAmount;
    
                        // Handle picture loading
                        const pictureCell = newRow.insertCell(5);
                        if (item.picture) {
                            const image = document.createElement('img');
                            image.src = item.picture;
                            image.style.maxWidth = "100px";
                            pictureCell.appendChild(image);
                        } else {
                            const uploadInput = document.createElement('input');
                            uploadInput.type = 'file';
                            uploadInput.accept = 'image/*';
                            uploadInput.onchange = function () {
                                const file = this.files[0];
                                const image = document.createElement('img');
                                image.src = URL.createObjectURL(file);
                                image.style.maxWidth = "100px";
                                pictureCell.innerHTML = '';
                                pictureCell.appendChild(image);
                                saveTable(); // Save table after image upload
                            };
                            pictureCell.appendChild(uploadInput);
                        }
                    });
                });
            }
    
            function confirmClear() {
                if (confirm('Are you sure you want to clear the table?')) {
                    clearTable();
                }
            }
    
            function clearTable() {
                const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
                table.innerHTML = '';
                database.ref('tableData').remove();
            }