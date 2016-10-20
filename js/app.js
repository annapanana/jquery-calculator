
"use strict";
// add event handlers
$(function() {
  // mouse input
  $(".buttons").on("click", function() {
    if (event.target.nodeName === "SPAN")
      evaluate($(event.target).text());
  });
});
function evaluate(key) {
  if (key === "x") key = "*";
  if (key === "÷") key = "/";
  switch (key) {
    case "=":
      // doMath($("#screen").text());
      overWriteDisplay(doMath($("#screen").text()));
      break;
    case "C":
      overWriteDisplay("");
      break;
    default:
      updateDisplay(key);
  }
}

function updateDisplay(newText) {
  var currentText = $("#screen").text();
  $("#screen").text(currentText+=newText);
}

function overWriteDisplay(newText) {
  $("#screen").text(newText);
}

function doMath(equation) {
  var equationBody = [];
  var result = 0;
  var subString = "";
  for (var i = 0; i < equation.length; i++) {
    // if the char is not a number, it is an operator
    if (isNaN(equation[i])) {
      equationBody.push(subString);
      equationBody.push(equation[i]);
      subString = "";
    }
    else {
      subString+=equation[i];
    }
  }
  // the last part of the equation is the substring, add it
  equationBody.push(subString);

  // check for errors
  equationBody = checkForErrors(equationBody);
  if (equationBody === "Error") {
    return "Error";
  };

  // execute equation with order of operations
  equationBody = firstOrderOfOperations(equationBody);
  equationBody = secondOrderOfOperations(equationBody);

  // perform multiplication and division operations
  function firstOrderOfOperations(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "*") {
        arr[i] = arr[i-1] * arr[i+1];
        // remove the numbers that were used in the multiplaction and call this function again to check for additional * or / operators
        firstOrderOfOperations(removeExtraNums(arr, i));
      } else if (arr[i] === "/") {
        arr[i] = arr[i-1] / arr[i+1];
        firstOrderOfOperations(removeExtraNums(arr, i));
      }
    }
    return arr;
  }

  function secondOrderOfOperations(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "+") {
        arr[i] = Number(arr[i-1]) + Number(arr[i+1]);
        secondOrderOfOperations(removeExtraNums(arr, i));
      } else if (arr[i] === "-") {
        arr[i] = arr[i-1] - arr[i+1];
        secondOrderOfOperations(removeExtraNums(arr, i));
      }
    }
    return arr;
  }

  function removeExtraNums(arr, i) {
    // remove the left side of the operator
    arr.splice(i-1, 1);
    // the array was modified such that i is now the right side of the former * operator
    arr.splice(i, 1);
    return arr;
  }
  return equationBody;
}

function checkForErrors(str) {

  console.log(isNaN(Number(str[0])));
  if (!Number(str[0])) {
    return "Error";
  }

  if (str.length > 1) {
    if (!Number([str.length-1])) {
      return "Error";
    }

    for (var i = 0; i < str.length; i++) {
      if (!Number(str[i])) {
        if (!Number(str[i+1])) {
          return "Error";
        }
      }
    }
  }

  return str;
}
