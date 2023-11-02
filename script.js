const apiKey = 'bf69802c79904002ba1d2b435771995f';

//Calls the currencyCalculations function if the enter key is pressed
document.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        event.preventDefault();
        currencyCalculations('currencyA', 'currencyB', 'amount', 'result');
    }
});

// Function to fetch currency data from the OpenExchangeRates API
async function fetchCurrencies(id) {
    const apiUrl = `https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`;

    const response = await fetch(apiUrl);
    const currencies = await response.json();

    const currencySelect = document.getElementById(id);

    for (const currency in currencies) {
        if (currency != "USD") {
            const option = document.createElement('option');
            option.value = currency;
            option.text = `${currency} - ${currencies[currency]}`;
            currencySelect.appendChild(option);
        }
    }
}

//Function to convert currencies
async function currencyCalculations(currencyA, currencyB, amount, display)
{
    const curUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    const curResponse = await fetch(curUrl);
    const currencies = await curResponse.json();

    const curA_name = document.getElementById(currencyA);
    const curB_name = document.getElementById(currencyB);

    var userAmount = document.getElementById(amount).value;

    for (const currency in currencies.rates) {
        if (currency == curA_name.value) {
            var rateA = currencies.rates[currency]; 
        }
        
        if (currency == curB_name.value) {
            var rateB = currencies.rates[currency];
        }
    }

    display = document.getElementById(display);

    var result = userAmount * (rateB / rateA);
    if (result >= 0) {
        if (result > 0.01) {
            result = result.toFixed(2);
        }
        else {
            result = result.toPrecision(2);
        }
        display.innerText = result + " " + curB_name.value;
    }
    else {
        display.innerText = "Invalid amount";
    }
}