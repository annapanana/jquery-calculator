
"use strict";
// add event handlers
$(function() {
  $(".buttons").on("click", function() {
    if (event.target.nodeName === "SPAN")
      evaluate($(event.target).text());
  });
});
function evaluate(key) {
  if (key === "x") key = "*";
  if (key === "÷") key = "/";
  console.log(key);
  switch (key) {
    case "=":
      doMath($("#screen").text());
      overWriteDisplay(eval($("#screen").text()));
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



  // reorganize equation to follow order of operations
  // for (var i = 0; i < equationBody.length; i++) {
  //   if (equationBody[i] === "/" || equationBody[i] === "*") {
  //     var equationBody.splice(i-1, i+1);
  //
  //   }
  // }
  console.log(equationBody);
  // return result;
}
