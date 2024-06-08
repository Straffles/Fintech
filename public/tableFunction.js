        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyD8RLQ5hS3r7809eJQIhaCTQP2slDvNJh4",
            authDomain: "fintech-f6a7d.firebaseapp.com",
            databaseURL: "https://fintech-f6a7d-default-rtdb.asia-southeast1.firebasedatabase.app/",
            projectId: "fintech-f6a7d",
            storageBucket: "fintech-f6a7d.appspot.com",
            messagingSenderId: "703004071046",
            appId: "1:703004071046:web:148a4d2cb17edc23bf2d07"
        };

        document.addEventListener("DOMContentLoaded", function() {
            // Get today's date
            const today = new Date().toISOString().split('T')[0];

            // Initialize Flatpickr
            flatpickr("#dateInput", {
                maxDate: today
            });
        });

        
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        var database = firebase.database();
        var storage = firebase.storage();

        const taxRates = {
            'food': 0.08,
            'accommodation': 0.08,
            'transportation': 0.08,
            'gasoline': 0.08,
            'taxFree': 0
        };

        // Load saved data from Firebase
        document.addEventListener('DOMContentLoaded', loadTable);

        function addRow() {
            // Get form elements
            const dateElem = document.getElementById('dateInput');
            const amountElem = document.getElementById('amount');
            const categoryElem = document.getElementById('category');
            const pictureInput = document.getElementById('pictureInput');

            // Validate form
            if (!dateElem.value || !amountElem.value || parseInt(amountElem.value) <= 0 || !categoryElem.value) {
                alert('Please fill all fields correctly.');
                return;
            }

            // Get form values
            const date = new Date(dateElem.value).toLocaleDateString('en-GB');
            const amount = parseInt(amountElem.value);
            const category = categoryElem.value;
            const taxRate = taxRates[category];
            const taxableAmount = (amount * taxRate).toFixed(2);
            const formattedAmount = amount.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' VND';
            const formattedTaxableAmount = parseFloat(taxableAmount).toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' VND';

            // Handle picture input
            const selectedFile = pictureInput.files[0];
            if (selectedFile) {
                // Create a storage reference
                const storageRef = firebase.storage().ref();
                // Create an upload task
                const uploadTask = storageRef.child('images/' + selectedFile.name).put(selectedFile);

                // Monitor the upload process
                uploadTask.on('state_changed', function(snapshot) {
                    // Optional: Handle progress updates
                }, function(error) {
                    alert('Failed to upload image: ' + error.message);
                }, function() {
                    // Get the uploaded file's download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        // Add the row with the download URL
                        addTableRow(date, formattedAmount, category, taxRate * 100 + "%", formattedTaxableAmount, downloadURL);
                    });
                });
            } else {
                // No image selected, just add the row without image
                addTableRow(date, formattedAmount, category, taxRate * 100 + "%", formattedTaxableAmount, null);
            }
            
        }

        function addTableRow(date, amount, category, taxRate, taxableAmount, imageURL) {
            const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            // Insert cells and add values
            newRow.insertCell(0).innerText = date;
            newRow.insertCell(1).innerText = amount;
            newRow.insertCell(2).innerText = category;
            newRow.insertCell(3).innerText = taxRate;
            newRow.insertCell(4).innerText = taxableAmount;

            const pictureCell = newRow.insertCell(5);
            if (imageURL) {
                const image = document.createElement('img');
                image.src = imageURL;
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

            // Save the updated table to Firebase
            saveTable();

            // Clear the form inputs
            document.getElementById('inputForm').reset();
            window.location.reload();
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

        // function loadTable() {
        //     database.ref('tableData').once('value', snapshot => {
        //         const data = snapshot.val() || [];
        //         const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
        //         table.innerHTML = ''; // Clear the table before adding rows
        //         data.forEach(item => {
        //             const newRow = table.insertRow();
        //             newRow.insertCell(0).innerText = item.date;
        //             newRow.insertCell(1).innerText = item.amount;
        //             newRow.insertCell(2).innerText = item.category;
        //             newRow.insertCell(3).innerText = item.taxRate;
        //             newRow.insertCell(4).innerText = item.taxableAmount;

        //             // Handle picture loading
        //             const pictureCell = newRow.insertCell(5);
        //             if (item.picture) {
        //                 const image = document.createElement('img');
        //                 image.src = item.picture;
        //                 image.style.maxWidth = "100px";
        //                 pictureCell.appendChild(image);
        //             } else {
        //                 const uploadInput = document.createElement('input');
        //                 uploadInput.type = 'file';
        //                 uploadInput.accept = 'image/*';
        //                 uploadInput.onchange = function () {
        //                     const file = this.files[0];
        //                     const image = document.createElement('img');
        //                     image.src = URL.createObjectURL(file);
        //                     image.style.maxWidth = "100px";
        //                     pictureCell.innerHTML = '';
        //                     pictureCell.appendChild(image);
        //                     saveTable(); // Save table after image upload
        //                 };
        //                 pictureCell.appendChild(uploadInput);
        //             }
        //         });
        //     });
        // }



        function loadTable() {
            database.ref('tableData').once('value', snapshot => {
                const data = snapshot.val() || [];
                const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
                table.innerHTML = ''; // Clear the table before adding rows
        
                // Convert date strings to Date objects and sort in descending order
                data.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
        
                // Populate the table with sorted data
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



