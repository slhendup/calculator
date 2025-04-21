const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");

let currentInput = "0";
let previousInput = "0";
let operator = "";
let justEvaluated = false;
//this array is added so we can access the calculator through our keyboard.
const acceptKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "/",
  "*",
  "+",
  ".",
  "%", 
  "Enter",
  "Backspace",
];
for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  button.addEventListener("click", function () {
    const value = button.textContent;
    handleValueEvent(value); //till the button works
  });
}

function handleValueEvent(value) {
  switch (value) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      if (currentInput === "0" || justEvaluated) {
        currentInput = value;
        justEvaluated = false;
      } else {
        currentInput += value;
      }
      updateDisplay();
      break;

    case ".":
      if (!currentInput.includes(".")) {
        currentInput += value;
        updateDisplay();
      }
      break;

    case "%":
      currentInput = String(parseFloat(currentInput / 100));
      updateDisplay();
      break;

    case "+":
    case "-":
    case "÷":
    case "x":
      calculateOrReAssign(value);
      break;

    case "+/-":
      currentInput = String(-parseFloat(currentInput)).toString();
      updateDisplay();
      break;

    case "AC":
      currentInput = "0";
      previousInput = "0";
      operator = "";
      updateDisplay();
      break;

    case "=":
      if (!currentInput || !previousInput || !operator) {
        return;
      }
      calculate();
      updateDisplay();
      previousInput = "";
      operator = "";
      justEvaluated = true;
      break;
  }
}

document.addEventListener("keydown", function (event) {
  let curentPresskey = event.key;
  if (acceptKeys.includes(curentPresskey)) {
    if (curentPresskey === "Enter") {
      curentPresskey = "=";
    }
    if (curentPresskey === "*") {
      curentPresskey = "x";
    }
    if (curentPresskey === "/") {
        curentPresskey= "÷";
    }
    if (curentPresskey === "Backspace") {
        curentPresskey= "AC";
    }
    handleValueEvent(curentPresskey);
  }
});

function calculateOrReAssign(value) {
  if (operator && previousInput) {
    calculate();
  }

  operator = value === "x" ? "*" : value === "÷" ? "/" : value;
  previousInput = currentInput;
  currentInput = "0";
}

function calculate() {
  try {
    const result = eval(
      `${parseFloat(previousInput)} ${operator} ${parseFloat(currentInput)}`
    );
    currentInput = String(Math.round(result * 1e10) / 1e10);
  } catch (e) {
    currentInput = "Error";
  }
}

function updateDisplay() {
  display.value = currentInput;
}
