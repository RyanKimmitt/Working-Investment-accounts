// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");

// Global Variable
let accounts = [];
let maxAmount = 5000; // account values should be b/t 0 and max

// Display Data
drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    addAccount();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}
spawnAccounts();
drawArray();
// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************

function spawnAccounts() {
  for (let i = 0; i < 200; i++) {

    accounts.push(randINT(1, maxAmount));
  }


}



function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  let pimps = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] >= 2000 && 4000 <= accounts[i]) {

      pimps++;
    }
  }

  outputEl.innerHTML = `Count Range ${pimps}`;
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  let donated = 0;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 2000) {
      accounts[i] = accounts[i] + 2000;
      donated = donated + 500;
    }
  }


  outputEl.innerHTML = `Generous Donor dontaed $${donated}`;
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  let moneyStolen = 0;
  for (let i = 0; i < accounts.length; i++) {
    moneyStolen = moneyStolen + accounts[i] * 0.95;
    accounts[i] = accounts[i] * 0.95;

  }


  outputEl.innerHTML = "Hacker Attack";
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.

  let accountLow = minArray(accounts);
  let accountMax = maxArray(accounts);
  let accountAVG = 0;

  for (let i = 0; i < accounts.length; i++) {

    accountAVG += accounts[i];
  }



  outputEl.innerHTML = `Investment Stats Min:${accountLow.toFixed(2)} Max:${accountMax.toFixed(2)} AVG:${accountAVG.toFixed(2)}`;
}

function minArray(array) {
  return Math.min.apply(Math, array);
};

function maxArray(array) {
  return Math.max.apply(null, array);
}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.

  let newAccount = prompt("How much would you like to put into this acount?")
  
  if (newAccount > 5000 || newAccount < 1) {
    alert("Adding invalid imount, try again with a value between 1 and 5000")
    addAccount();
    return;
  }
  accounts.push(newAccount);
  outputEl.innerHTML = "Add Account";
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  let revAccount = 0;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 500) {
      accounts.splice(i, 1);
      revAccount++;
    }
  }


  outputEl.innerHTML = `Remove Low Accounts ${revAccount}'s removed`;
}

function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.
  let pimpMoney = 0;
  let poorpeeps = 0;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] > 4000) {
      accounts[i] = accounts[i] - 400;
      pimpMoney = pimpMoney + 400;
    }
    if(accounts[i]<1000){
      poorpeeps++;
    }
  }

let AvgRes = pimpMoney/poorpeeps;
for(let n=0;n<accounts.length;n++){
  if(accounts[n]<1000){
    accounts[n] = accounts[n] + (AvgRes);
  }
}

  outputEl.innerHTML = `Robin Hood ${poorpeeps} people recived money, each account reviced $${AvgRes.toFixed(2)}`;
}



function randINT(min, max) {
  return ((Math.random() * (max - min)) + min).toFixed(2);
}