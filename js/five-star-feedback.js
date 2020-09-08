const fetch = require('node-fetch');
const authorization = require('./auth');

const feedbacksUrls = 'http://localhost:3000/api/Feedbacks/';

async function getAllFeedbacks() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(feedbacksUrls, {
    headers,
  });

  return response.json();
}

async function removeFeedback(id) {
  const method = 'delete';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: authorization,
  };

  const response = await fetch(`${feedbacksUrls}${id}`, {
    headers,
    method,
  });

  return response.statusText;
}

async function start() {
  const allFeedbacks = await getAllFeedbacks();
  console.log(`found ${allFeedbacks.data.length} feedbacks`);

  const fiveStartFeedbacks = allFeedbacks.data.filter(
    (feedback) => feedback.rating === 5,
  );
  console.log(`found ${fiveStartFeedbacks.length} five starts feedbacks`);

  for (feedback of fiveStartFeedbacks) {
    await removeFeedback(feedback.id);
    console.log(`removed feedback id ${feedback.id}`);
  }
}

(function () {
  start();
})();
