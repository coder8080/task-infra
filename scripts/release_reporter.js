const axios = require('axios');
const process = require('process');

const main = async () => {
  console.log(process.env);
  const authorization_key = process.env.secrets.TRACKER_AUTHORIZATION_KEY;
  const text = JSON.stringify(process.github);
  console.log(authorization_key);
  const result = await axios.post(
    'https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-169/comments',
    {
      text,
    },
    {
      headers: {
        Authorization: 'OAuth ' + authorization_key,
        'X-Org-ID': '7526988',
      },
    }
  );
};

main();
