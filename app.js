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

//  {
//     base: 'EUR',
//     date: "2020-02-14",
//     rates: [{
//         EUR: 1,
//         AED: 3.994271,
//         USD: 1.0808,
//         TRY: 6.56098
//     }]
// }


async function getCurrencyRates(currencyToGet = "EUR") {
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyToGet}`)
        let data = await response.json()
        return data;
 
    } catch (err) {
        console.log('Fetch Error - ', err);

    }
}

// get all the currencies and populate the options of the select element
const populateSelect = () => {
    getCurrencyRates("EUR")
    .then(data => {
        let vals;
        for (const [key, value] of Object.entries(data.rates)) {
            console.log(key, value);
            vals = value;
        }
        vals = Object.keys(vals);
        let options = vals.map(val => {
            return `<option value=${val}>${val}</option>`
        })
        console.log(data);
        console.log(vals);

        convertFrom.innerHTML = options;
        convertTo.innerHTML = options;
    

    })
    .catch(err => console.log(err.message));
 
        
    }

const handleConversion = (base = "EUR", to = "USD", amount = 1) => {
    // convert to fetch later **

    // for testing
    let convertedAmount;
    for (let [key, value] of Object.entries(currencies.rates)) {
        convertedAmount = value[to].toFixed(2) * amount;
    }

    return convertedAmount;

}


const createResultElement = (from, to, amount, convertedAmount) => {
    let currencyElement = `
    <div class="card bg-light mb-3" style="max-width: 18rem;">
     <div class="card-header">Exchange From ${from} to ${to}</div>
        <div class="card-body">
            <h5 class="card-title">${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    `

    return currencyElement;
}

const handleSubmit = (e) => {
    e.preventDefault();
    let amount = convertAmount.value !== "" ? convertAmount.value : alert('please enter valid amount');
    let from = convertFrom.value;
    let to = convertTo.value;

    let convertedAmount = handleConversion("EUR", to, amount)
    let element = createResultElement(from, to, amount, convertedAmount);
    document.querySelector('#result').innerHTML = element;
}

form.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', populateSelect);
