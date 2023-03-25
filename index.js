document
  .querySelector("#ewallet-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.querySelector(".add__type").value;
    const description = document.querySelector(".add__description").value;
    const value = document.querySelector(".add__value").value;

  if (description && value) {
  resetValue();
  addItems(type, description, value);
  }
  });

showItems();

function showItems() {
  let items = getItemsFromLS();
  const collection = document.querySelector(".collection");

  for (let item of items) {
    const newHtml = `<div class="item">
<div class="item-description-time">
<div class="item-description">
 <p>${item.description}</p>
 </div>
  <div class="item-time">
 <p>${item.time}</p>
  </div>
  </div>
  <div class="item-amount ${
    item.type === "+" ? "income-amount" : "expense-amount"
  }">
  <p>${item.type}$${item.value}</p>
  </div>
  </div>`;


collection.insertAdjacentHTML("afterbegin", newHtml);
}
}
function addItems(type, description, value) {
  const newHtml = `<div class="item">
    <div class="item-description-time">
      <div class="item-description">
       <p>${description}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${
      type === "+" ? "income-amount" : "expense-amount"
    }">
      <p>${type}$${value}</p>
    </div>
    </div>`;

  const collection = document.querySelector(".collection");

  collection.insertAdjacentHTML("afterbegin", newHtml);

  addItemsToLS(type, description, value, time);

showExpense();
showIncome();
totalBalance();
}

function getItemsFromLS() {
  let items = localStorage.getItem("items");

  // return items ? JSON.parse(items) : [];
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  return items;
}

function addItemsToLS(type, description, value, time) {
  let items = getItemsFromLS();
  items.push({ type, description, value, time });

  localStorage.setItem("items", JSON.stringify(items));
}
// ****** caluculation****
showIncome();

function showIncome() {
  let items = getItemsFromLS();
  totalIncome = 0;
  for (let item of items) {
    if (item.type === "+") {
      totalIncome += parseInt(item.value);

 document.querySelector(".income__amount p").innerText = `$${totalIncome}`;
}
}
}
showExpense();

function showExpense() {
  let items = getItemsFromLS();
  totalexpense = 0;
  for (let item of items) {
  if (item.type === "-") {
totalexpense += parseInt(item.value);

 document.querySelector(".expense__amount p").innerText = `$${totalexpense}`;
    }
  }
}
  totalBalance();

  function totalBalance(){
let items=getItemsFromLS();
balance=0;

for(let item of items){
  if(item.type==='+'){
balance+= parseInt(item.value);
}else{balance-=parseInt(item.value);
}
}

document.querySelector('.balance__amount p').innerText=balance;

document.querySelector('header').className=(balance>=0)? 'green':'red';

  }
//******* reset data *****/

function resetValue() {
  document.querySelector(".add__type").value = "+";

  document.querySelector(".add__description").value = "";

  document.querySelector(".add__value").value = "";
}

//****** time fix//*********/

const now = new Date().toLocaleTimeString("en-us", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const date = now.split(" ,")[0].split(" ");
const time = date[0] + " " + date[1] + date[2] + date[3];
// document.querySelector("expense__amount p").innertext =`${totalIncome}`
