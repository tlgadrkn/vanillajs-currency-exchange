// add settimeout -> every x mins ****
// const currencies = getCurrencyRates("EUR").then(data => console.log(data));
// async function getCurrencyRates(currencyToGet) {
//     let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyToGet}`)
//        let data =  await response.json();
// return data
// }

let form = document.querySelector('form');
let convertFrom = document.querySelector('#convertFrom');
let convertTo = document.querySelector('#convertTo');
let convertAmount = document.querySelector('#convertAmount');

const currencies = {
    base: 'EUR',
    date: "2020-02-14",
    rates: [{
        EUR: 1,
        AED: 3.994271,
        USD: 1.0808,
        TRY: 6.56098
    }]
}

// get all the currencies and populate the options of the select element
const populateSelect = () => {
    let vals;
    for (const [key, value] of Object.entries(currencies.rates)) {
        console.log(key, value);
        vals = value;
    }
    vals = Object.keys(vals);
    let options = vals.map( val => {return `<option value=${val}>${val}</option>`})    
    convertFrom.innerHTML = options;
    convertTo.innerHTML = options;

}

const handleConversion = (base = "EUR", to = "USD", amount = 1) => {
    // convert to fetch later **

    // for testing
    
}




const handleSubmit = (e) => {
    e.preventDefault();
    let amount = convertAmount.value !== "" ? convertAmount.value : alert('please enter valid amount');
    let from = convertFrom.value;
    let to = convertTo.value;
    
handleConversion("EUR", to, amount)
    
    
    
}



document.addEventListener('DOMContentLoaded', populateSelect);


form.addEventListener('submit', handleSubmit);