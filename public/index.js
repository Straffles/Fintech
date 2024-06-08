//setup and init for GCV API
const vision = require("@google-cloud/vision");

const CREDENTIALS = JSON.parse(
   JSON.stringify({
      type: "service_account",
      project_id: "noted-span-425715-e6",
      private_key_id: "5351af5c778cb036a68962c60b99a3457f900d8c",
      private_key:
         "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCq9fsG4kNQIk15\nDbEi2Wg8V3pfmp/zQJqYTp/AYqQWeUNIqzY2Zp/7coDffgj8atvf2tWT3Gq5tp/Z\ndfYlxldWjkm7kDUPCHh7ygH6XKU8WBmv0Zj7FEASWlUVDQ2Ttb7y3l9Na9gpCD+i\n4lFuwQkj5sDXX40KG8Ick+kjsvtQkC4NAsyYQfbeoe+WEFMLtum5PnUafQXAVTox\nqW+y5G0/URJaBg6hNLMBETEkosuQSVcZIGe0S6RT62eEM+AhhHtvw9drSzPCnI2K\n1uxKb2Vo5bd51arnDPNQMT9XZaW7y6bHYeOY69qsABthJ47uz4MQioFg+5PM++YM\nCCbax2fjAgMBAAECggEAEdIdTizkxmQk/kLinZbbCjs2KuQT20f3NXwwo93EbAFM\n9bS/LHGLKKtZarKZHjLHY7DMhaK6z0wNop3swChKL2AaqH4SQdRotsKqbR4eLUmj\nt9OZ5kZInYEkEFMxgJ2331o1xfzBZhmRhJmh0nE10jO6E1lG+vBEzjTO3yVHlDCf\ngn9Ta6pwRF35RWgRrK2bprK7zQaPNuHCmwDAzePKKqKD53rlu/+9QIzcF2WiAdBM\ngebiJQLvubUEjUYbHhvyO9eIBIkuvTV0do+2oEfYodfKa0Ign5xNU/Aju6j+KhE+\niMhz1gaN3Uj7KpQKOMixcohfygpWCvLWEFOpJuigaQKBgQDmeEZj8o6UmM0DQMgF\nwjwFzMLPx3DwqDHe2kE+FS5IP5RnNgwONoGxKmw3AU/AAZ9e4MvZonJnu25Wvfxr\nLW6+qgHoDkccFNpp7TkHcHvPh5kNOakTDaaIkixOOZmajpPy5KpV9twKNdUuc/fQ\nV5Dx0w0rwElnmr263+J+kVp7eQKBgQC95iJu8XCb0hExrqmi3f7cCvjTccymSZXW\ntoUcoCTNM5MgseouBqCZKgmWiulRPb9MeLuHwmbb2j7P+MMuRTs3fL/SsZE+p7yR\nX/dfoieQftwMJfWy7wGdmn7kkf5qIdQ+iVMVGbf7CZgWaExAJKdabUGW90YTylVd\nP+frriTLOwKBgQCz0dgqF5DDxE0BYsQuKhSm+dJuR9CJFNKEbIpHJEOOP31M4lCZ\nrlGWp+DzMeTFjP6KCp9C2YqmAQngSC/wd+xWe1MteiZldKfNyjea5FrV25jBRuHy\nac4r9ND439xHSUOKWnvEwu2AUexZaEZMmmYPKHq4Tjl3yraKXjDcTBDrEQKBgQCK\n6/j0wJxo4dzCQ8zF4TG5OC2gQfg9DkgXs57duioyFDDmEkIHOcHzStWI1EarsEhq\nYUiPoKAu5hJdgtcG2o7foNuT/2MKOxuwHkySIcZf5u6D1KFSLZc4/PUnscY1Tlo/\nBadKIG5/sB0bB2IA6s+jT5pUHsGdaL/aYA4CVHuGUQKBgAPNi2DWaZaJIhPZTLjr\ncoPTj8yI2ojHwrsis1VY1Aqwq1xbhNinRUrRbcLwx5K3IIAEdl8DtgRGliDBhKzW\nxADEIlCjfW3oyfI3CJdnRaiUIT+WAxR0H44xnd4Cq5Q3JqbZApw3rxdbmvhf4nNX\npWE82ijY9L9VehV2pfo/faTM\n-----END PRIVATE KEY-----\n",
      client_email: "vietnamese-ocr@noted-span-425715-e6.iam.gserviceaccount.com",
      client_id: "107742849102061432293",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
         "https://www.googleapis.com/robot/v1/metadata/x509/vietnamese-ocr%40noted-span-425715-e6.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
   })
);

const CONFIG = {
   credentials: {
      private_key: CREDENTIALS.private_key,
      client_email: CREDENTIALS.client_email,
   },
};

const client = new vision.ImageAnnotatorClient(CONFIG);

//Scan document when file is uploaded
window.addEventListener("fileUploadSuccess", function (e) {
   const image = this.value;

   const detectText = async (file_path) => {
      let [result] = await client.textDetection(image);

      //convert and split text to an array
      const text = result.fullTextAnnotation.text.toLowerCase();
      words = text.split(/[\s\n]+/);
      console.dir(words, { maxArrayLength: null });

      //Check for date
      if (words.includes("ngày")) {
         dayIndex = words.indexOf("ngày") + 1;
         day = words[dayIndex];
         console.log("Date:", day);
      }

      //Check for month
      if (words.includes("tháng")) {
         monthIndex = words.indexOf("tháng") + 1;
         month = words[monthIndex];
         console.log("Month:", month);
      }

      //Check for year
      if (words.includes("năm")) {
         yearIndex = words.indexOf("năm") + 1;
         year = words[yearIndex];
         console.log("Year:", year);
      }

      // OUTPUT RELESH

      //Update date value
      date = day + "/" + month + "/" + year;
      const dateElem = date;

      //Check for amount
      if (words.includes("cộng")) {
         amountIndex = words.indexOf("cộng") + 3;
         amount = words[amountIndex] + "." + words[amountIndex + 1];
         amount = amount.replace(/[.]/g, "");
         amount = parseInt(amount);
         const amountElem = amount;
         console.log("Amount:", amount);
      }

      //Check for tax rate
      if (words.includes("suất")) {
         taxRateIndex = words.indexOf("suất") + 2;
         taxRateScan = parseInt(words[taxRateIndex].replace("%", ""));
         const taxRate = taxRateScan;
         console.log("Tax Rate:", taxRate);
      }

      //Calculate taxable amount
      // taxable = amount * (taxRate / 100);
      // console.log('Taxable:', taxable);
   };
   detectText();
});
