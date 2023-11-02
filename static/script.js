// Function to fetch currency data from the OpenExchangeRates API
async function fetchCurrencies(id) {
    const apiKey = 'bf69802c79904002ba1d2b435771995f';
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
