/* 
    Author: leonard verhave
    filename: calculator.js
    date: 10.9.24
*/

document.addEventListener("DOMContentLoaded" , function () {

    const calculateBtn = document.getElementById("calculateBtn");   
    const tipAmountParagraph = document.getElementById("tipAmount");
    const totalAmountParagraph = document.getElementById("totalAmount");
    
    // add event listener to the calculate button 
    calculateBtn.addEventListener('click', function () {
        
        // get the input amount \\
        const billAmount = parseFloat(document.getElementById('billAmount').value);
        const serviceQuality = parseFloat(document.getElementById('serviceQuality').value);

        // check if the bill amount is valid \\
        if (isNaN (billAmount) || billAmount ==="" ) {
             alert ("Enter the bill amount please.");
            return;
        }
    
        // check if the bill has a valid number that is greater than 0 \\
        if (billAmount <= 0 ) {
            alert ( "Enter a bill amount greater than 0.");
            return;
        }
        
        // check if a service quality is selected, if not display the alert \\
        if(!serviceQuality){
            alert ("Please select a service quality.");
            return;
        }
    
        // calculate the tip and the total amount \\
        const tip = (billAmount * serviceQuality) / 100
        const totalAmount = billAmount + tip;
    
        // display the total amount spent and display the tip total \\
        tipAmountParagraph.textContent = `Tip is $${tip.toFixed(2)}`;
        totalAmountParagraph.textContent = `Total Amount is $${totalAmount.toFixed(2)}`;
    
    });
});

