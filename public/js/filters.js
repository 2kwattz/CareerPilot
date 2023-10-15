// Filter to allow users to sort results based on stripend

// For eg
let stripend = document.querySelector(".refined-value").value;
stripend = parseInt(stripend, 10); // 10 as the base decimal number
console.log(stripend);
let priceWithoutSpecialCharacters = priceWithSpecialCharacters.replace(/[₹,]/g, ''); // Removes ₹ and commas
