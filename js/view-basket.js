const fetch = require('node-fetch');
const authorization = require('./auth');

const hackedBasketId = 7;

const basketUrl = `http://localhost:3000/rest/basket/${hackedBasketId}`;

async function viewBasket() {
  const method = 'get';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: authorization,
  };

  const response = await fetch(basketUrl, {
    method,
    headers,
  });

  const basket = await response.json();
  console.log(JSON.stringify(basket, null, 2));
}

(function () {
  viewBasket();
})();
