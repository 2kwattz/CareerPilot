function convertToCtext(text){

    const k = 6;
    const alphabetsCount = 26;
    let characterPos;
    let cipherText;
    text = text.toLowerCase();

    // Eg : Text is " hello "

    const alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    let outputText = [];

    let encryptedString = [];

    let cipherTextArray = [];

    let enc = [];

    
    // Loop for alphabets and its numbers

    for(let i=0;i<text.length;i++){

        characterPos = text.charAt(i);  // It will get the current alphabet at pos i

        outputText.push(alphabets.indexOf(characterPos));
        
        let cipherTextFormula = outputText[i] + k;
        cipherText = cipherTextFormula>=alphabetsCount?alphabetsCount%cipherTextFormula:cipherTextFormula;
        encryptedString.push(cipherText);
        
        cipherTextArray.push(alphabets.indexOf(encryptedString[i]));
        
 
        // console.log(cipherTextArray[i]);
        // return cipherTextArray;
        
    } 
    console.log(` Encrypted String Array ${encryptedString}`);
    console.log(cipherTextArray);
    console.log(`Output Text : ${outputText}`);
    console.log(`Actual cipher text ${cipherTextArray}`)
};

convertToCtext("hello");
