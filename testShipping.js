const url = 'POST /oauth/token HTTP/1.1';

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', '654277486');
data.append('client_secret', '82a6581654d645a7831489e531766e7b');

fetch(url, {
  method: 'POST',
  body: data,
})
  .then(response => response.json())
  .then(data => {
    console.log('Access Token:', data.access_token);
    console.log('Token Type:', data.token_type);
    console.log('Expires In:', data.expires_in);
  })
  .catch(error => {
    console.error('Error:', error);
  });
