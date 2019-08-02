
function mouseUp(element){
  element.blur();

  let pressed=element.innerHTML;
  let textbox = document.getElementById('textbox');
  let lastChar = "";
  if(textbox.value != ""){
    lastChar = textbox.value.substring(textbox.value.length-1, textbox.value.length);
  }

  if(pressed === "clear"){
    textboxClear();
  } else if(pressed === "bksp"){
    removeLastChar();
  }else if(pressed==="."){
    if(!isNaN(lastChar)&&textbox.value!=""){
      if(!decimalsSinceLastOperand()){
        textbox.value = textbox.value + pressed;
      }
      }
  }else if(pressed==="-/+" && textbox.value != "" && !isNaN(lastChar)){
    let fullNumber = textbox.value.substring(textbox.value.length-1, textbox.value.length);
    removeLastChar();
    while(textbox.value != "" && !isNaN(textbox.value.substring(textbox.value.length-1, textbox.value.length))){
      fullNumber = textbox.value.substring(textbox.value.length-1, textbox.value.length) + String(fullNumber);
      removeLastChar();
    }

    if(textbox.value != ""){
      if(textbox.value.substring(textbox.value.length-1, textbox.value.length) === "+"){
        removeLastChar();
        textbox.value = textbox.value + "-";
      } else if (textbox.value.substring(textbox.value.length-1, textbox.value.length) === "-"){
        removeLastChar();
        textbox.value = textbox.value + "+";
      } else{
        textbox.value = textbox.value + "-";
      }
    } else {
      textbox.value = textbox.value + "-";
    }

    textbox.value = textbox.value + fullNumber;
    
  }else if(element.className==="button number"){
    textbox.value = textbox.value + element.innerHTML;
  }else if(element.className==="button operand" && textbox.value != ""){
    if("+-×÷.".includes(lastChar)){
      removeLastChar();
    }

    if("+-×÷".includes(pressed)){
      textbox.value = textbox.value + pressed;
    }else{
      if("+-÷×.".includes(getLastChar())){
        removeLastChar();
      }
      if(!textboxEmpty()){
        submit();
      }
    }
    
  }


}

  function textboxClear(){
    document.getElementById("textbox").value = "";
  }

  function removeLastChar(){
    let lastCharRemoved = null;
    let textbox = document.getElementById('textbox');

    if(!textboxEmpty()){
      lastCharRemoved = getLastChar();
      textbox.value = textbox.value.substring(0, textbox.value.length-1);
    }

    return lastCharRemoved;
  }

  function submit(){
    document.getElementById('textbox').value = document.getElementById('textbox').value.trim();
    let numberStack = [];
    let operandStack = [];
    
    while(getLastChar()!= null){
      if("+-÷×".includes(getLastChar())){
        operandStack.push(removeLastChar());
      }else{
        let tempNum = "";
        while("1234567890.".includes(getLastChar())){
          tempNum = String(removeLastChar())+ String(tempNum);
        }
  
        if(getLastChar()==="-"){
          if("+-÷×".includes(getSecondToLastChar())){
            tempNum = String(removeLastChar())+ String(tempNum);
          }
        }
  
        numberStack.push(parseFloat(tempNum));
      }
    }



    calculate(numberStack, operandStack);
    

  }

  function textboxEmpty(){
    let textbox = document.getElementById('textbox');
    if(textbox.value === ""){
      return true;
    }else{
      return false;
    }
  }

  function getLastChar(){
    let textboxValue = document.getElementById('textbox').value; 
    return (textboxValue === '' ? null : textboxValue.substring(textboxValue.length-1, textboxValue.length));
  }

  function getSecondToLastChar(){
    let textboxValue = document.getElementById('textbox').value; 
    return (textboxValue.length > 1 ? textboxValue.substring(textboxValue.length-2, textboxValue.length-1) : '');
  }

  function calculate(numberStack, operandStack){

    while(numberStack.length > 1){
      //multiply or divide "+-÷×"
        for(i = 0 ; i < operandStack.length ; i++){
          if(operandStack[i]==="×" || operandStack[i]==="÷"){
            if(operandStack[i]==="×"){numberStack[i] = numberStack[i+1]*numberStack[i];}
            if(operandStack[i]==="÷") {numberStack[i] = numberStack[i+1]/numberStack[i];}
            numberStack.splice(i+1, 1);
            operandStack.splice(i, 1);
            i--;
          }
        }

      //add or subtract

      for(i = 0 ; i < operandStack.length ; i++){
        if(operandStack[i]==="+" || operandStack[i]==="-"){
          if(operandStack[i]==="+"){numberStack[i] = numberStack[i+1]+numberStack[i];}
          if(operandStack[i]==="-") {numberStack[i] = numberStack[i+1]-numberStack[i];}
          numberStack.splice(i+1, 1);
          operandStack.splice(i, 1);
          i--;
        }
      }
    }
    
    document.getElementById('textbox').value = numberStack[0];
  }

  function decimalsSinceLastOperand(){
    let textboxValue = document.getElementById('textbox').value; 
    let hasDecimal = false;
    let currentChar;
    while(textboxValue != ""){
      currentChar = textboxValue.substring(textboxValue.length-1, textboxValue.length);
      if(currentChar === "."){
        return true;
      }else if("+-÷×".includes(currentChar)){
        return false;
      }
      textboxValue = textboxValue.substring(0, textboxValue.length-1)
    }
  }

  function checkFontSize(){
    console.log("bitch");
  }

  function isOverflowing(element){
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
