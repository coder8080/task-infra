const axios = require('axios');
const process = require('process');

const main = async () => {
  const authorization_key = process.env.TRACKER_AUTHORIZATION_KEY;
  const actor = process.env.ACTOR;
  const text = JSON.stringify(actor);
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
