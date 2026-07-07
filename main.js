const calculator = document.getElementById("calculator");
const displayLabel = document.getElementById("display-label");
const historyLabel = document.getElementById("history-label");
const statusChip = document.querySelector(".status-chip");
const buttons = document.querySelectorAll(".btn");

const MAX = 64;
const EPSILON = 1e-12;
const OPS = "+-*/";

const state = {
  on: false,
  exp: "",
  justResult: false,
};

const keys = {
  Enter: "calculate",
  "=": "calculate",
  Backspace: "backspace",
  Delete: "backspace",
  Escape: "onoff",
  c: "clear",
  C: "clear",
  ",": ".",
  ".": ".",
  "+": "+",
  "-": "-",
  "*": "*",
  x: "*",
  X: "*",
  "/": "/",
  "(": "(",
  ")": ")",
};

buttons.forEach((button) => {
  button.addEventListener("click", () => press(button.dataset.token));
});

document.addEventListener("keydown", (event) => {
  const token = /^\d$/.test(event.key) ? event.key : keys[event.key];
  if (!token) return;

  event.preventDefault();
  press(token);
});

render();

function press(token) {
  if (!token) return;
  if (token === "onoff") return togglePower();
  if (!state.on) return;

  if (/^\d$/.test(token)) return addDigit(token);
  if (OPS.includes(token)) return addOperator(token);

  const actions = {
    backspace,
    calculate,
    clear: clearExpression,
    "()": smartParenthesis,
    "(": openParenthesis,
    ")": closeParenthesis,
    ".": addDecimal,
  };

  actions[token]?.();
}

function togglePower() {
  state.on = !state.on;
  clearExpression(false);
  calculator.classList.toggle("on", state.on);
  calculator.classList.toggle("off", !state.on);
  if (statusChip) statusChip.textContent = state.on ? "ONLINE" : "OFFLINE";
  render();
}

function addDigit(digit) {
  if (state.justResult) clearExpression(false);

  if (last() === ")") return add("*" + digit);

  const number = currentNumber();
  if (number === "0" && digit === "0") return;
  if (number === "0") {
    state.exp = state.exp.slice(0, -1) + digit;
    return render();
  }

  add(digit);
}

function addDecimal() {
  if (state.justResult) clearExpression(false);
  if (currentNumber().includes(".")) return;

  const end = last();
  if (!state.exp || OPS.includes(end) || end === "(") return add("0.");
  if (end === ")") return add("*0.");

  add(".");
}

function addOperator(operator) {
  state.justResult = false;

  if (!state.exp) {
    if (operator === "-") add("-");
    return;
  }

  if (last() === ".") state.exp = state.exp.slice(0, -1);

  const end = last();
  const previous = state.exp.at(-2) || "";

  if (end === "(") {
    if (operator === "-") add("-");
    return;
  }

  if (operator === "-" && (end === "*" || end === "/")) return add("-");

  if (OPS.includes(end)) {
    state.exp =
      end === "-" && OPS.includes(previous)
        ? state.exp.slice(0, -2) + operator
        : state.exp.slice(0, -1) + operator;
    return render();
  }

  add(operator);
}

function smartParenthesis() {
  canCloseParenthesis() ? closeParenthesis() : openParenthesis();
}

function openParenthesis() {
  if (state.justResult) state.justResult = false;

  const end = last();
  add(!state.exp || OPS.includes(end) || end === "(" ? "(" : "*(");
}

function closeParenthesis() {
  if (canCloseParenthesis()) add(")");
}

function canCloseParenthesis() {
  return openParentheses() > 0 && /[\d)]/.test(last());
}

function backspace() {
  if (state.justResult) return clearExpression();

  state.exp = state.exp.slice(0, -1);
  render();
}

function clearExpression(redraw = true) {
  state.exp = "";
  state.justResult = false;
  historyLabel.textContent = "";
  if (redraw) render();
}

function calculate() {
  if (!state.exp) return;

  try {
    const expression = normalize(state.exp);
    const result = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(result)) throw new Error("zero");

    historyLabel.textContent = `${formatExpression(expression)} =`;
    state.exp = formatNumber(result);
    state.justResult = true;
    render();
  } catch {
    alert("Não foi possível calcular essa operação.");
  }
}

function normalize(expression) {
  const clean = expression.trim();

  if (!clean || /[+*/.(\-]$/.test(clean) || !/^[\d+\-*/().]+$/.test(clean)) {
    throw new Error("invalid");
  }

  const missingClosings = openParentheses(clean);
  if (missingClosings < 0) throw new Error("invalid");

  return clean + ")".repeat(missingClosings);
}

function add(value) {
  if (state.exp.length + value.length > MAX) {
    alert("Limite máximo atingido.");
    return;
  }

  state.exp += value;
  render();
}

function render() {
  if (!state.on) {
    displayLabel.textContent = "";
    historyLabel.textContent = "";
    return setDisplaySize("");
  }

  const value = state.exp ? formatExpression(state.exp) : "0";
  displayLabel.textContent = value;
  setDisplaySize(value);
}

function setDisplaySize(value) {
  displayLabel.classList.toggle("is-long", value.length > 12);
  displayLabel.classList.toggle("is-extra-long", value.length > 20);
}

function formatExpression(expression) {
  return expression
    .replaceAll("*", "×")
    .replaceAll("/", "÷")
    .replaceAll("-", "−");
}

function formatNumber(value) {
  const number = Math.abs(value) < EPSILON ? 0 : value;
  if (Number.isInteger(number)) return String(number);

  const compact = Number(number.toPrecision(13)).toString();
  return compact.length > 18 ? number.toExponential(9) : compact;
}

function currentNumber() {
  return state.exp.split(/[+\-*/()]/).at(-1) || "";
}

function openParentheses(text = state.exp) {
  return (
    [...text].filter((char) => char === "(").length -
    [...text].filter((char) => char === ")").length
  );
}

function last() {
  return state.exp.at(-1) || "";
}
