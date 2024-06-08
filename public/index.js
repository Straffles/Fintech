

// function createTable() {
//     // Get user input elements
//     const dateInput = document.getElementById("dateInput");
//     const amountInput = document.getElementById("amountInput");
//     const categoryInput = document.getElementById("categoryInput");
//     const taxRateInput = document.getElementById("taxRateInput");
//     const pictureInput = document.getElementById("pictureInput");
//     const tableBody = document.getElementById("tableBody");
  
//     // Check if any input is empty
//     if (
//       !dateInput.value ||
//       !amountInput.value ||
//       !categoryInput.value ||
//       !taxRateInput.value
//     ) {
//       alert("Please fill in all fields!");
//       return;
//     }
  
//     // Create a new table row
//     const newRow = document.createElement("tr");
  
//     // Create table cells for each column
//     const dateCell = document.createElement("td");
//     dateCell.textContent = dateInput.value;
//     const amountCell = document.createElement("td");
//     amountCell.textContent = amountInput.value;
//     const categoryCell = document.createElement("td");
//     categoryCell.textContent = categoryInput.value;
//     const taxRateCell = document.createElement("td");
//     taxRateCell.textContent = taxRateInput.value + "%"; // Add "%" symbol
  
//     // Calculate taxable amount
//     const taxableAmount = parseFloat(amountInput.value) / (1 + parseFloat(taxRateInput.value) / 100);
//     const taxableAmountCell = document.createElement("td");
//     taxableAmountCell.textContent = taxableAmount.toFixed(2); // Format to 2 decimal places

//     // Get the uploaded picture filename
//     const pictureCell = document.createElement("td");
//     const selectedFile = pictureInput.files[0];
    

//     if (selectedFile) {
//       const image = document.createElement('img');
//       image.src = selectedFile.name;
//       pictureCell.appendChild(image); // Add picture to cell
//     } else {
//       const input = document.createElement("input");
//       input.type = "file";
//       input.accept = "image/*";
//       pictureCell.appendChild(input); // Add an upload section if user didn't upload a picture initially
//     }
  
//     // Append cells to the row
//     newRow.appendChild(dateCell);
//     newRow.appendChild(amountCell);
//     newRow.appendChild(categoryCell);
//     newRow.appendChild(taxRateCell);
//     newRow.appendChild(taxableAmountCell);
//     newRow.appendChild(pictureCell);
  
//     // Append the row to the table body
//     tableBody.appendChild(newRow);



//     database.ref("tableRows").push({
//       date: dateInput.value,
//       amount: amountInput.value,
//       category: categoryInput.value,
//       taxRate: taxRateInput.value,
//       taxableAmount: taxableAmount.toFixed(2)
//   })
//   .then(() => {
//       console.log("Data successfully saved to Firebase.");
//   })
//   .catch((error) => {
//       console.error("Error saving data to Firebase: ", error);
//   });

  
//     // Clear user input fields (except picture)
//     dateInput.value = "";
//     amountInput.value = "";
//     categoryInput.value = "";
//     taxRateInput.value = "";
//   }


//   function populateTableFromFirebase() {
//     const database = firebase.database();
//     const tableBody = document.getElementById("tableBody");
//     tableBody.innerHTML = "";

//     database.ref("tableRows").once("value")
//     .then((snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             const rowData = childSnapshot.val();
//             const newRow = document.createElement("tr");
//             const dateCell = document.createElement("td");
//             dateCell.textContent = rowData.date;
//             const amountCell = document.createElement("td");
//             amountCell.textContent = rowData.amount;
//             const categoryCell = document.createElement("td");
//             categoryCell.textContent = rowData.category;
//             const taxRateCell = document.createElement("td");
//             taxRateCell.textContent = rowData.taxRate + "%";
//             const taxableAmountCell = document.createElement("td");
//             taxableAmountCell.textContent = rowData.taxableAmount;
//             newRow.appendChild(dateCell);
//             newRow.appendChild(amountCell);
//             newRow.appendChild(categoryCell);
//             newRow.appendChild(taxRateCell);
//             newRow.appendChild(taxableAmountCell);
//             tableBody.appendChild(newRow);
//         });
//     })
//     .catch((error) => {
//         console.error("Error fetching data from Firebase: ", error);
//     });
// }

// window.addEventListener("load", populateTableFromFirebase);





//Scan document section
const vision = require('@google-cloud/vision')

const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "noted-span-425715-e6",
    "private_key_id": "5351af5c778cb036a68962c60b99a3457f900d8c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCq9fsG4kNQIk15\nDbEi2Wg8V3pfmp/zQJqYTp/AYqQWeUNIqzY2Zp/7coDffgj8atvf2tWT3Gq5tp/Z\ndfYlxldWjkm7kDUPCHh7ygH6XKU8WBmv0Zj7FEASWlUVDQ2Ttb7y3l9Na9gpCD+i\n4lFuwQkj5sDXX40KG8Ick+kjsvtQkC4NAsyYQfbeoe+WEFMLtum5PnUafQXAVTox\nqW+y5G0/URJaBg6hNLMBETEkosuQSVcZIGe0S6RT62eEM+AhhHtvw9drSzPCnI2K\n1uxKb2Vo5bd51arnDPNQMT9XZaW7y6bHYeOY69qsABthJ47uz4MQioFg+5PM++YM\nCCbax2fjAgMBAAECggEAEdIdTizkxmQk/kLinZbbCjs2KuQT20f3NXwwo93EbAFM\n9bS/LHGLKKtZarKZHjLHY7DMhaK6z0wNop3swChKL2AaqH4SQdRotsKqbR4eLUmj\nt9OZ5kZInYEkEFMxgJ2331o1xfzBZhmRhJmh0nE10jO6E1lG+vBEzjTO3yVHlDCf\ngn9Ta6pwRF35RWgRrK2bprK7zQaPNuHCmwDAzePKKqKD53rlu/+9QIzcF2WiAdBM\ngebiJQLvubUEjUYbHhvyO9eIBIkuvTV0do+2oEfYodfKa0Ign5xNU/Aju6j+KhE+\niMhz1gaN3Uj7KpQKOMixcohfygpWCvLWEFOpJuigaQKBgQDmeEZj8o6UmM0DQMgF\nwjwFzMLPx3DwqDHe2kE+FS5IP5RnNgwONoGxKmw3AU/AAZ9e4MvZonJnu25Wvfxr\nLW6+qgHoDkccFNpp7TkHcHvPh5kNOakTDaaIkixOOZmajpPy5KpV9twKNdUuc/fQ\nV5Dx0w0rwElnmr263+J+kVp7eQKBgQC95iJu8XCb0hExrqmi3f7cCvjTccymSZXW\ntoUcoCTNM5MgseouBqCZKgmWiulRPb9MeLuHwmbb2j7P+MMuRTs3fL/SsZE+p7yR\nX/dfoieQftwMJfWy7wGdmn7kkf5qIdQ+iVMVGbf7CZgWaExAJKdabUGW90YTylVd\nP+frriTLOwKBgQCz0dgqF5DDxE0BYsQuKhSm+dJuR9CJFNKEbIpHJEOOP31M4lCZ\nrlGWp+DzMeTFjP6KCp9C2YqmAQngSC/wd+xWe1MteiZldKfNyjea5FrV25jBRuHy\nac4r9ND439xHSUOKWnvEwu2AUexZaEZMmmYPKHq4Tjl3yraKXjDcTBDrEQKBgQCK\n6/j0wJxo4dzCQ8zF4TG5OC2gQfg9DkgXs57duioyFDDmEkIHOcHzStWI1EarsEhq\nYUiPoKAu5hJdgtcG2o7foNuT/2MKOxuwHkySIcZf5u6D1KFSLZc4/PUnscY1Tlo/\nBadKIG5/sB0bB2IA6s+jT5pUHsGdaL/aYA4CVHuGUQKBgAPNi2DWaZaJIhPZTLjr\ncoPTj8yI2ojHwrsis1VY1Aqwq1xbhNinRUrRbcLwx5K3IIAEdl8DtgRGliDBhKzW\nxADEIlCjfW3oyfI3CJdnRaiUIT+WAxR0H44xnd4Cq5Q3JqbZApw3rxdbmvhf4nNX\npWE82ijY9L9VehV2pfo/faTM\n-----END PRIVATE KEY-----\n",
    "client_email": "vietnamese-ocr@noted-span-425715-e6.iam.gserviceaccount.com",
    "client_id": "107742849102061432293",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/vietnamese-ocr%40noted-span-425715-e6.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  ));

const CONFIG =  {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
}

const client = new vision.ImageAnnotatorClient(CONFIG);

const image = "hoadondo2.jpg";

const detectText = async(file_path) => {
    let [result] = await client.textDetection(image);

    //convert and split text to an array
    const text = result.fullTextAnnotation.text.toLowerCase();
    words = text.split(/[\s\n]+/);
    console.dir(words, {'maxArrayLength': null});

   //  words = [
   //    'hóa',       'đơn',           'giá',        'trị',
   //    'gia',       'tăng',          'liên',       '2:',
   //    'giao',      'cho',           'người',      'mua',
   //    'ngày',      '16',            'tháng',      '01',
   //    'năm',       'đơn',           'vị',         'bán',
   //    'hàng',      ':',             'công',       'ty',
   //    'cổ',        'phần',          'abc',        'mã',
   //    'số',        'thuế:',         'địa',        'chỉ:',
   //    'số',        '1258',          'đội',        'cẩn,',
   //    'ba',        'đình,',         'hà',         'nội',
   //    'điện',      'thoại:',        'họ',         'tên',
   //    'người',     'mua',           'hàng.',      'tên',
   //    'đơn',       'vị',            '.',          'công',
   //    'ty',        'tnhh',          'bảo',        'oanh',
   //    'mã',        'số',            'thuế:',      'địa',
   //    'chỉ:',      'số',            '4157',       'nguyễn',
   //    'trãi,',     'thanh',         'xuân,',      'hà',
   //    'nội',       'hình',          'thức',       'thanh',
   //    'toán:',     'tmck',          'số',         'tài',
   //    'khoản',     '2017',          'masó:',      '01gtkt3/001',
   //    'ký',        'hiệu',          'ab/17',      'só:',
   //    '0000007',   'số',            'tài',        'khoản',
   //    'stt',       'mã',            'hàng',       'tên',
   //    'hãng',      'hóa,',          'dịch',       'vụ',
   //    'đơn',       'vị',            'tính',       'số',
   //    'lượng',     'đơn',           'giá',        'a',
   //    'b',         'c',             'd',          '1',
   //    '2',         'thành',         'tiền',       '3=1x2',
   //    '1',         'dell',          'xps',        '13',
   //    'máy',       'tnh',           'xách',       'tay',
   //    'dell',      'xps',           '13',         'chiếc',
   //    '200',       '15.899.000,00', '31.798.000', 'thuế',
   //    'suất',      'gtgt:',         '10%',        'số',
   //    'tiền',      'viết',          'bằng',       'chữ',
   //    'người',     'mua',           'hàng',       '(ký,',
   //    'ghi',       'rõ',            'họ,',        'tên)',
   //    'cộng',      'tiền',          'hàng:',      '31',
   //    '798.000',   'tiền',          'thuế',       'gtgt:',
   //    '3.178.800', 'tổng',          'tiền',       'thanh',
   //    'toán:',     '34.977.800',    'ba',         'mươi',
   //    'bốn',       'triệu',         'chín',       'trăm',
   //    'bảy',       'mươi',          'bảy',        'nghìn',
   //    'tâm',       'trăm',          'đồng',       'chẵn.',
   //    'người',     'bán',           'hàng',       '(ký,',
   //    'ghi',       'rõ',            'họ,',        'tên)',
   //    'thủ',       'trưởng',        'đơn',        'vị',
   //    '(ký,',      'đóng',          'dấu,',       'ghi',
   //    'rõ',        'họ',            'tên)',       '(cần',
   //    'kiểm',      'tra,',          'đối',        'chiếu',
   //    'trước',     'khi',           'lập,',       'giao,',
   //    'nhận',      'hóa',           'đơn)'
   //  ]

    //Check for date
    if (words.includes('ngày')){
        dayIndex = words.indexOf('ngày') + 1;
        day = words[dayIndex];
        console.log('Date:', date);
    };

    //Check for month
    if (words.includes('tháng')){
        monthIndex = words.indexOf('tháng') + 1;
        month = words[monthIndex];
        console.log('Month:', month);
    };

    //Check for year
    if (words.includes('năm')){
        yearIndex = words.indexOf('năm') + 1;
        year = words[yearIndex];
        console.log('Year:', year);
    };

    date = day + '/' + month + '/' + year;



    if (words.includes('cộng')){
        amountIndex = words.indexOf('cộng') + 3;
        amount = words[amountIndex] + '.' + words[amountIndex + 1];
        amount = amount.replace(/[.]/g, '')
        amount = parseInt(amount)
        console.log('Amount:', amount);

        
    };

    if (words.includes('suất')){
      taxRateIndex = words.indexOf('suất') + 2;
      taxRate = parseInt(words[taxRateIndex].replace("%", ""));
      console.log('Tax Rate:', taxRate);
  };

    taxable = amount * (taxRate / 100);
    console.log('Taxable:', taxable);
}

detectText();