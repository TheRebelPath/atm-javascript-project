//This project was based on a challenge exercise originally meant to be written on Java.
//I aproached it with a set time limit in mind of 3 days.
//The basic requirements of the challenge were met on time, but the code needs revision to make it cleaner.

//Account Information
const account = {
  savings: 10000,
  creditCard: 0,
  transactions: { date: "No recent transaction", transaction: "", quantity: 0 },
  dailyWithdrawal: 0,
};
// ATM configuration
const billType = 50;
const donationQuantity = 200;
const dailyWithdrawalLimit = 6000;
const screenDisplay = document.querySelector(".main-screen");
let errorCount = 0;
let quantityString = "";
let quantityInterger;

//Side button configuration
const buttonOne = document.getElementById("option-one-button");
const buttonTwo = document.getElementById("option-two-button");
const buttonThree = document.getElementById("option-three-button");
const buttonFour = document.getElementById("option-four-button");
const buttonFive = document.getElementById("option-five-button");
const buttonSix = document.getElementById("option-six-button");
const buttons = [
  {
    name: "main menu",
    button_functions: [
      withdrawMenu,
      depositMenu,
      accountMenu,
      complainsMenu,
      transactionMenu,
      endSession,
    ],
  },
  {
    name: "default exit",
    button_functions: [
      voidMenu,
      voidMenu,
      voidMenu,
      voidMenu,
      voidMenu,
      exitMenu,
    ],
  },
  {
    name: "donation menu",
    button_functions: [
      voidMenu,
      voidMenu,
      voidMenu,
      voidMenu,
      exitMenu,
      donateMoney,
    ],
  },
  {
    name: "disable buttons",
    button_functions: [null, null, null, null, null, null],
  },
  {
    name: "deposit buttons",
    button_functions: [
      depositSavings,
      voidMenu,
      depositCreditCard,
      voidMenu,
      voidMenu,
      exitMenu,
    ],
  },
];

// Initialize Side Buttons
buttonOne.onclick = withdrawMenu;
buttonTwo.onclick = depositMenu;
buttonThree.onclick = accountMenu;
buttonFour.onclick = complainsMenu;
buttonFive.onclick = voidMenu;
buttonSix.onclick = endSession;

// Starts ATM
startSession();
//Side Button Updater Function
function update(button) {
  buttonOne.onclick = button.button_functions[0];
  buttonTwo.onclick = button.button_functions[1];
  buttonThree.onclick = button.button_functions[2];
  buttonFour.onclick = button.button_functions[3];
  buttonFive.onclick = button.button_functions[4];
  buttonSix.onclick = button.button_functions[5];
}
//Implementing keyPad
function numPad(value, mode) {
  const inputButtons = document.querySelectorAll(".number-button");
  const clearButton = document.querySelector(".js-clear");
  const enterButton = document.querySelector(".js-enter");
  let active = value;
  if (active && mode === "withdraw") {
    clearButton.onclick = () => {
      quantityString = "";
      displayInput();
    };

    enterButton.onclick = () => {
      quantityInterger = eval(quantityString);
      withdrawMoney(quantityInterger);
      quantityString = "";
    };
    inputButtons.forEach((button) => {
      button.onclick = () => {
        const inputValue = button.value;
        inputQuantity(inputValue);
      };
    });
  } else if (active && mode === "savings") {
    clearButton.onclick = () => {
      quantityString = "";
      displayInput();
    };

    enterButton.onclick = () => {
      quantityInterger = eval(quantityString);
      depositMoney("savings", quantityInterger);
      quantityString = "";
      displayInput();
    };
    inputButtons.forEach((button) => {
      button.onclick = () => {
        const inputValue = button.value;
        inputQuantity(inputValue);
      };
    });
  } else if (active && mode === "cc") {
    clearButton.onclick = () => {
      quantityString = "";
      displayInput();
    };

    enterButton.onclick = () => {
      quantityInterger = eval(quantityString);
      depositMoney("cc", quantityInterger);
      quantityString = "";
      displayInput();
    };
    inputButtons.forEach((button) => {
      button.onclick = () => {
        const inputValue = button.value;
        inputQuantity(inputValue);
      };
    });
  } else {
    clearButton.onclick = null;
    enterButton.onclick = null;
    inputButtons.forEach((button) => {
      button.onclick = null;
    });
  }
}
//Keypad Amount tracker and Display
function inputQuantity(value) {
  quantityString += value;
  displayInput();
}
function displayInput() {
  document.querySelector(".quantity-display").innerHTML = `$${quantityString}`;
}

// Menu Interface Functions
function mainMenu() {
  update(buttons[0]);
  errorCount = 0;
  numPad(false, null);
  screenDisplay.innerHTML = `
 <p class="option-one">Withdraw Money</p>
 <p class="option-three">Account Balance</p>
 <p class="option-five">Last Transaction</p>
 <p class="option-two">Deposit</p>
 <p class="option-four">Complains</p>
 <p class="option-six">Exit</p>
 `;
}

function withdrawMenu() {
  update(buttons[1]);
  numPad(true, "withdraw");
  errorCount = 0;
  screenDisplay.innerHTML = `
  <p class="amount-display">You currently have : $${account.savings} in your account</p>
  <p>Plase input the amount you want to withdraw</p>
  <p class="quantity-display">$0</p>
  <p class="option-six">Exit</p>
  `;
}
function accountMenu() {
  update(buttons[1]);
  errorCount = 0;
  screenDisplay.innerHTML = `
  <p>Your current account balance is:</p>
  <table>
    <tr>
      <td>Savings Account:</td>
      <td>$${account.savings}</td>
    </tr>
    <tr>
      <td>Credit Card:</td>
      <td>$${account.creditCard}</td>
    </tr>
  </table>
  <p class="option-six">Exit</p>
  `;
}
function donateMenu() {
  update(buttons[2]);
  screenDisplay.innerHTML = `
  <p>Would You like to donate $200 to charity.</p>
  <p class="option-five">No</p>
  <p class="option-six">Yes</p>
  `;
}
function depositMenu() {
  update(buttons[4]);
  errorCount = 0;
  screenDisplay.innerHTML = `
  <p class="option-one">Deposit to Savings account.</p>
  <p class="option-three">Deposit to Credit Card account.</p>
  <p class="option-six">Exit</p>
  `;
}
function transactionMenu() {
  update(buttons[1]);
  errorCount = 0;
  screenDisplay.innerHTML = `
  <p>Your last transaction was:</p>
  <table class="placeholder">
  <tr>
    <th>Date</th>
    <th>Transaction Type</th>
    <th>Amount</th>
  </tr>
  <tr>
    <td>${account.transactions.date.toLocaleString("en-US")}</td>
    <td>${account.transactions.transaction}</td>
    <td>$${account.transactions.quantity}</td>
  </tr>
</table>
<p class="option-six">Exit</p>
  `;
}
function exitMenu() {
  errorCount = 0;
  quantityString = "";
  mainMenu();
}
function complainsMenu() {
  update(buttons[3]);
  errorCount = 0;
  screenDisplay.innerHTML = `
  <p>Not available at the moment.</p>
  `;
  setTimeout(() => mainMenu(), 2000);
}
function voidMenu() {
  errorCount++;
  const errorMessage = document.querySelector(".error-message");
  errorMessage.setAttribute("style", "visibility: visible");
  setTimeout(
    () => errorMessage.setAttribute("style", "visibility: hidden"),
    2000
  );
  if (errorCount < 3) {
    return console.log(errorCount);
  }
  errorCount = 0;
  endSession();
}
function startSession() {
  update(buttons[3]);
  errorCount = 0;
  screenDisplay.innerHTML = `<p>Welcome!</p>`;
  return setTimeout(() => mainMenu(), 2000);
}

function endSession() {
  update(buttons[3]);
  numPad(false, null);
  errorCount = 0;
  screenDisplay.innerHTML = `<p>Goodbye, Have a nice day.</p>`;
}

//ATM Operation Functions: Withdrawal, Donation, Transaction and Deposit.

//Savings withdrawal function
function withdrawMoney(value) {
  numPad(false, null);
  if (
    value > 0 &&
    value % billType === 0 &&
    account.savings >= value &&
    account.dailyWithdrawal + value <= dailyWithdrawalLimit
  ) {
    account.savings -= value;
    account.dailyWithdrawal += value;
    updateLastTransaction("Withdrawal", value);
    return donateMenu();
  } else if (account.dailyWithdrawal === dailyWithdrawalLimit) {
    quantityString = "";
    screenDisplay.innerHTML = `
    <p>You've reached the daily withdrawal limit.</p>
    `;
    return setTimeout(() => mainMenu(), 2000);
  }
  quantityString = "";
  screenDisplay.innerHTML = `
  <p>Invalid quantity or not enough money in savings.</p>
  `;
  return setTimeout(() => withdrawMenu(), 2000);
}

//Donation Function
function donateMoney() {
  if (account.savings >= donationQuantity) {
    account.savings -= donationQuantity;
    screenDisplay.innerHTML = `
   <p>Thanks for your donation.</p>
   `;
    return setTimeout(() => mainMenu(), 2000);
  }
  screenDisplay.innerHTML = `
   <p>You can't donate at the moment.</p>
   `;
  return setTimeout(() => mainMenu(), 2000);
}

//Transaction Update Function
function updateLastTransaction(type, amount) {
  account.transactions.date = new Date();
  account.transactions.transaction = type;
  account.transactions.quantity = amount;
}

//Deposit Functions
function depositMoney(accountType, quantity) {
  if (accountType === "savings" && quantity % billType === 0 && quantity > 0) {
    account.savings += quantity;
    updateLastTransaction("Deposit Savings", quantity);
    return console.log(account.savings);
  } else if (accountType === "cc" && account.savings >= quantity) {
    account.savings -= quantity;
    account.creditCard += quantity;
    updateLastTransaction("Deposit Credit Card", quantity);
    return console.log(
      `CC Balance:(${account.creditCard}) Savings Balance:(${account.savings})`
    );
  }
  numPad(false, null);
  quantityString = "";
  screenDisplay.innerHTML = `
<p>Invalid quantity or not enough money in savings.</p>
`;
  return setTimeout(() => depositMenu(), 2000);
}

function depositSavings() {
  update(buttons[1]);
  numPad(true, "savings");
  errorCount = 0;
  console.log(`deposit to savings`);
  screenDisplay.innerHTML = `
  <p>Plase input the amount you want to deposit.</p>
  <p class="quantity-display">$0</p>
  <p class="option-six">Exit</p>
  `;
}

function depositCreditCard() {
  update(buttons[1]);
  numPad(true, "cc");
  errorCount = 0;
  console.log(`deposit to cc`);
  screenDisplay.innerHTML = `
  <p>Plase input the amount you want to deposit.</p>
  <p class="quantity-display">$0</p>
  <p class="option-six">Exit</p>
  `;
}
