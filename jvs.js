
document.getElementById('product').addEventListener('change', handleSelectChange);
document.getElementById('management-type').addEventListener('change', handleSelectChange);


document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
  radio.addEventListener('change', handleSelectChange);
});

// --------------------------------------------------------------------------------------------
function handleSelectChange() {
    let optButton = document.getElementById("optButton");
    optButton.value = ""; // Assign value
    optButton.textContent = ""; // Assign text

    let muzarSelect = document.getElementById('product');
    let nihulSelect = document.getElementById('management-type');

    let value1 = muzarSelect.value;
    let value2 = nihulSelect.value === "ללא העדפה" ? muzarSelect.value : nihulSelect.value;

    // Only call the function if both values are selected (non-empty)
    if (value1 !== "" && value2 !== "") {
        getMaslul(value1, value2);
    }
}   
// --------------------------------------------------------------------------------------------
function getMaslul(x, y) {
    // Check if either of the select fields is empty
    if (x === "" || y === "") {
        return;
    } else {
        document.getElementById('maslul-type').innerHTML = '';
        const act1="מתמחים בניהול אקטיבי"; const act2="כללי";const act3 = "אג\"ח";
        const act4="מניות";const act5="שיקלי"; const act6="מתמחים באפיקי השקעה סחירים"; 
        const act11="מודל חכ\"מ אחר";
        const act7="עוקבי מדדים"; const act8="מדד";

        const act9="קיימות"; 
        const act10="הלכתי";      

// בודק בחירת חשיפות ----------------------------------------------------------------------------
        const selectedExposure1 = document.querySelector('input[name="exposure1"]:checked');
        const selectedExposure2 = document.querySelector('input[name="exposure2"]:checked');
        const selectedExposure3 = document.querySelector('input[name="exposure3"]:checked');
        const selectedExposure4 = document.querySelector('input[name="exposure4"]:checked');
        


switch (selectedExposure1) {
  case "אין העדפה": const safDown1 = 0; const safUp1 = 1.1;  break;
  case "מוגבר": const safDown1 = 0.6; const safUp1 = 1.1;    break;
  case "בינוני": const safDown1 = 0.3; const safUp1 = 0.6;    break;
  case "מועט": const safDown1 = 0;   const safUp1 = 0.3;    break;
}
switch (selectedExposure2) {
  case "אין העדפה": const safDown2 = 0; const safUp2 = 1.1;  break;
  case "מוגבר": const safDown2 = 0.6; const safUp2 = 1.1;    break;
  case "בינוני": const safDown2 = 0.3; const safUp2 = 0.6;    break;
  case "מועט": const safDown2 = 0;   const safUp2 = 0.3;    break;
}
switch (selectedExposure3) {
  case "אין העדפה": const safDown3 = 0; const safUp3 = 1.1;  break;
  case "מוגבר": const safDown3 = 0.6; const safUp3 = 1.1;    break;
  case "בינוני": const safDown3 = 0.3; const safUp3 = 0.6;    break;
  case "מועט": const safDown3 = 0;   const safUp3 = 0.3;    break;
}
switch (selectedExposure4) {
  case "אין העדפה": const safDown4 = 0; const safUp4 = 1.1;  break;
  case "מוגבר": const safDown4 = 0.6; const safUp4 = 1.1;    break;
  case "בינוני": const safDown4 = 0.3; const safUp4 = 0.6;    break;
  case "מועט": const safDown4 = 0;   const safUp4 = 0.3;    break;
}
        
        
        console.log( safDown1 , safUp1);
        console.log(safDown2 , safUp2);
        console.log(safDown3 , safUp3);
        console.log(safDown4 , safUp4);
// --------------------------------------------------------------------------------------------

     
 // קורא נתונים מקובץ    
       fetch('data.txt')
          .then(response => response.text())
          .then(data => {
            
          let fieldRashi = data.split('maslulend'); 
          fieldRashi.forEach(function(item) {
          let fields = item.split(',');              
           if (y===x){
            if (fields[3] && fields[5]){
                  if (fields[3].includes(x) && item.includes(y)) {
                  addOption(fields[1], fields[2]);
                 } 
            }
           }   
          if (y === "אקטיבי") {
    
            const actionsA = [act1, act2, act3, act4, act5, act6,act11];
            if (fields[3] && fields[5]){
                if (fields[3].includes(x) && actionsA.some(action => fields[5].includes(action))) {
                addOption(fields[1], fields[2]);
                }
            }
        }  

          if (y==="פאסיבי"){ 
               const actionsP = [act7, act8];
              if (fields[3] && fields[5]){
                  if (fields[3].includes(x) && actionsP.some(action => fields[5].includes(action))) {
                addOption(fields[1], fields[2]);
                 }  
               }
          }
          if (y==="קיימות"){
              if (fields[3] && fields[5]){
                  if (fields[3].includes(x) && fields[5].includes(act9) ) {
                  addOption(fields[1], fields[2]);
                 }  
               }
          }

          if (y==="הלכתי"){
              if (fields[3] && fields[5]){
                  if (fields[3].includes(x) && fields[5].includes(act10) ) {
                  addOption(fields[1], fields[2]);
                 }  
               }
          }
    
    }); 
    });
    }
} 
// --------------------------------------------------------------------------------------------
// add a new option
function addOption(value, text) {
    // Get the select element
    var select = document.getElementById('maslul-type');
    
    // Create a new option element
    var newOption = document.createElement('option');
    newOption.value = value;
    newOption.textContent = value+ "-" +text;

    // Append the new option to the select element
    select.appendChild(newOption);
}
// --------------------------------------------------------------------------------------------
document.getElementById('maslul-type').addEventListener('change', function() {
    let muzarSelect = document.getElementById('maslul-type');
    let value1 = muzarSelect.options[muzarSelect.selectedIndex].value;
    console.log(value1);
    let varsplit = value1.split('-');
    console.log(varsplit[0]);

    // Correctly set the value and text of the option with id "optButton"
    let optButton = document.getElementById("optButton");
    optButton.value = varsplit[0]; // Assign value
    optButton.textContent = varsplit[0]; // Assign text
    console.log(parseInt(document.getElementsByName("txt1")[0]?.value));
    });


// --------------------------------------------------------------------------------------------
// אירוע הצג נתונים
document.getElementById('mybutton').addEventListener('click', () => {
    let kupaID = parseInt(document.getElementsByName("txt1")[0]?.value);
    
    // ניקוי פלטים קודמים
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`output${i}`).textContent = '';
        if (i <= 7) {
            document.getElementById(`schom${i}`).textContent = '';
            document.getElementById(`ahuz${i}`).textContent = '';
        }
    }


   if (isNaN(kupaID)) { return;}

 // קורא נתונים מקובץ    
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            let searchString=`<${kupaID}>,`;



// Add your logic to check if `searchString` is found
if (!data.includes(searchString)) {
    return; // Exit the function if searchString is not found in the content
}

            const startIndex = data.indexOf(searchString)+ searchString.length;

            if (startIndex === -1) return;

            let allString = data.substring(startIndex); 

            let fields = allString.split(',');
            
// ממלא שדות נתונים בטבלאות
            document.getElementById('output1').textContent = fields[0] || '';
            document.getElementById('output2').textContent = fields[1] || '';
            document.getElementById('output3').textContent = fields[2] || '';
            document.getElementById('output4').textContent = fields[3] || '';
            document.getElementById('output5').textContent = fields[4] || '';
            document.getElementById('output6').textContent = Number(fields[6] || 0).toLocaleString() + " מלשח";
            document.getElementById('output7').textContent = fields[7] + '%';
            document.getElementById('output8').textContent = fields[8] + '%';
            document.getElementById('output9').textContent = fields[9] + '%';
            document.getElementById('output10').textContent = fields[11];

            document.getElementById('schom1').textContent = Number(fields[31] || 0).toLocaleString() + " אשח";
            document.getElementById('schom2').textContent = Number(fields[33] || 0).toLocaleString() + " אשח";
            document.getElementById('schom3').textContent = Number(fields[35] || 0).toLocaleString() + " אשח";
            document.getElementById('schom4').textContent = Number(fields[37] || 0).toLocaleString() + " אשח";
            document.getElementById('schom5').textContent = Number(fields[39] || 0).toLocaleString() + " אשח";
            document.getElementById('schom6').textContent = Number(fields[41] || 0).toLocaleString() + " אשח";
            document.getElementById('schom7').textContent = Number(fields[43] || 0).toLocaleString() + " אשח";

            document.getElementById('ahuz1').textContent = (Number(fields[32] || 0) * 100).toLocaleString() + '%';
            document.getElementById('ahuz2').textContent = (Number(fields[34] || 0) * 100).toLocaleString() + '%';
            document.getElementById('ahuz3').textContent = (Number(fields[36] || 0) * 100).toLocaleString() + '%';
            document.getElementById('ahuz4').textContent = (Number(fields[38] || 0) * 100).toLocaleString() + '%';
            document.getElementById('ahuz5').textContent = (Number(fields[40] || 0) * 100).toLocaleString() + '%';
            document.getElementById('ahuz6').textContent = (Number(fields[42] || 0) * 100).toLocaleString() + '%';
            document.getElementById('ahuz7').textContent = (Number(fields[44] || 0) * 100).toLocaleString() + '%';
        })
        .catch(error => console.error('Error fetching the file:', error));
});



