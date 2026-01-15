let noOfButtons = document.querySelectorAll(".btn").length;
let display = document.getElementById("display-tab");

let expression="";
let counter = 0;

for(let i=0; i<noOfButtons; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        let clickedValue =this.innerHTML;
        let lastChar = expression[expression.length-1];
        let operators = ["+","-","*","/",")","("];
        let numbers =["0","1","2","3","4","5","6","7","8","9"];
        if(expression === "" && clickedValue === "0"){
            expression="";
            return;
        }
        else if (expression === "0"){
            expression = "";
        }
        
        // AC
        if (clickedValue === "AC"){
            display.value = "0";
            expression = "";
            counter = 0;
            return;
        }
        else if(clickedValue === "DEL"){
            expression = deleteLastValue(expression);
            if(expression === ""){
                display.value = "0";
                return;
            }
            else{
                display.value = expression;
            }
            return;
        }
        else if(clickedValue === "="){
            while (counter > 0) {
                expression += ")";
                counter--;
            }

            display.value = expression;
            result(expression);
            counter = 0;
            return;
        }
        else if (clickedValue === "."){
            expression = decimalHandle(expression);
        }
        else if(clickedValue === "( )"){
            expression = handleBrackets(expression);
            
        }
        else{
            if (operators.includes(clickedValue)){
                if(numbers.includes(lastChar) || lastChar === ")"){
                    expression += clickedValue;
                }
                else if(lastChar === "(" && clickedValue === "-"){
                    expression += clickedValue;
                }
                else{
                    return;
                }
            }
            else if(lastChar === ")" && numbers.includes(clickedValue)){
                expression+="*"+clickedValue;
            }
            else{
                expression+=clickedValue;
            }
            
        }
        display.value = expression;
    });
}

function deleteLastValue(expression){
    let lastChar = expression[expression.length-1];
    if (expression !== "" && lastChar === "("){
        counter--;
    }
    else if(lastChar === ")"){
        counter++;
    }
    expression = expression.slice(0,-1);
    return expression;
}

function result(answer){
    try{
        expression = eval(answer).toString();
        display.value = expression;
    }
    catch(error){
        display.value = "invalid syntax";
    }
    return expression;
}

function decimalHandle(expression){
    if (expression === ""){
        expression="0.";
        display.value="0.";
    }
    else{
        let lastChar =  expression[expression.length-1];
        let operators = ["+","-","*","/",")","("];
        for(let i = 0; i<operators.length;i++){
            if (lastChar === operators[i]){
                expression+="0.";
                return expression;
            }
        }
        let parts = expression.split(/[+\-*/]/);
        let currentNumber = parts[parts.length-1];
        if (!currentNumber.includes(".")){{
            expression+=".";
        }}
    }
    return expression;
}

// function handleBrackets(expression){
//     let lastChar = expression[expression.length-1];
//     let operators = ["+","-","*","/","("];
//     let numbers =["0","1","2","3","4","5","6","7","8","9"];
//     if(expression === "" || counter === 0 || operators.includes(lastChar)){
//         if(lastChar === ")" || numbers.includes(lastChar)){
//             expression +="*("
//         }
//         else{
//             expression+="(";
//         }
//         counter++;
//     }
//     else if(!operators.includes(lastChar)){
//         expression+=")";
//         counter--;
//     }
    
//     return expression;
// }

function handleBrackets(expression) {
    let lastChar = expression[expression.length - 1];
    let operators = ["+", "-", "*", "/", "("];
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];

    // 1️⃣try to CLOSE if possible
    if (
        counter > 0 &&
        (numbers.includes(lastChar) || lastChar === ")")
    ) {
        expression += ")";
        counter--;
        return expression;
    }

    // 2️⃣ OTHERWISE: OPEN
    if (expression === "") {
        expression += "(";
    }
    else if (numbers.includes(lastChar) || lastChar === ")") {
        // implicit multiplication
        expression += "*(";
    }
    else {

        expression += "(";
    }

    counter++;
    return expression;
}


