const dropList = document.querySelectorAll("select");
const getButton = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const exchangeIcon = document.querySelector(".icon");
let apiKey = "af1bd00f1371c4c6040f7820";

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in countries) {
    // creating option tag with passing currency code as a text and value
    let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (code in countries) {
    if (code === element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://www.countryflags.io/${countries[code]}/flat/64.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault(); //Preventing form from submitiing
  getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal === 0) {
    amount.value = 1;
  }

  async function birnima() {
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    exchangeRateTxt.innerText = "Getting Exchange Rate...";
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/af1bd00f1371c4c6040f7820/latest/${fromCurrency.value}`
    );
    const data = await res.json();
    const exchangeRate = data.conversion_rates[toCurrency.value];
    const totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `;
  }
  birnima();
}

// console.log(fromCurrency);
