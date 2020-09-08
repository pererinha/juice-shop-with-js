const fetch = require('node-fetch');
const authorization = require('./auth');

const author = 'bender@juice-sh.op';
const message = 'i love that juice!!!';
const productId = 1;

const reviewUrl = `http://localhost:3000/rest/products/${productId}/reviews`;

async function postReview() {
  const body = JSON.stringify({message, author});
  const method = 'put';
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': body.length,
    Authorization: authorization,
  };

  const response = await fetch(reviewUrl, {
    method,
    body,
    headers,
  });

  const status = await response.statusText;
  console.log(status);
}

(function () {
  postReview();
})();
