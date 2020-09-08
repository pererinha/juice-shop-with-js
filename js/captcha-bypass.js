const fetch = require('node-fetch');
const authorization = require('./auth');

const UserId = 18;
const captchaId = 0;
const captcha = "83";
const comment = 'captcha fails!';
const rating = 5;
const numberOfFeedbacks = 10;

const feedbackUrl = `http://localhost:3000/api/Feedbacks/`;

async function feedback() {
  const body = JSON.stringify({UserId, captchaId, captcha, comment, rating});
  const method = 'post';
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': body.length,
    Authorization: authorization,
  };

  const response = await fetch(feedbackUrl, {
    method,
    body,
    headers,
  });

  const status = await response.statusText;
  console.log(status);
}

(function () {
  for (let i = 1; i <= numberOfFeedbacks; i++) {
    feedback();
  }
})();
